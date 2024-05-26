import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import explicit from "data-base64:~assets/explicit.svg"
import fraud from "data-base64:~assets/fraud.svg"
import hate from "data-base64:~assets/hate.svg"
import propaganda from "data-base64:~assets/propaganda.svg"
import violence from "data-base64:~assets/violence.svg"
import { Storage } from "@plasmohq/storage"
import { io } from "socket.io-client";
export { };

const client = io('http://localhost:2030');

client.on('connect', () => {
    console.log('Connected to server');
});

client.on('chatCompletion', (content) => {
    const parsedContent = JSON.parse(content);
    parsedContent.forEach((sentence) => {
        console.log(`Result: ${sentence.classification}: ${sentence.context}`);
        if (sentence.classification !== "not moderated") {
            highlightElementByPath(sentence.id, sentence.classification, sentence.context);
        }
    });
});

client.on('error', (error) => {
    console.error('Error:', error);
});

client.on('disconnect', () => {
    console.log('Disconnected from server');
});

console.log("CONTENT SCRIPT RUNNING!");

function getDomPath(element) {
    const path = [];
    while (element) {
        let name = element.nodeName.toLowerCase();
        if (element.id) {
            name += `#${element.id}`;
            path.unshift(name);
            break;
        } else {
            let sibling = element, count = 1;
            while (sibling.previousElementSibling) {
                sibling = sibling.previousElementSibling;
                count++;
            }
            name += `[${count}]`;
        }
        path.unshift(name);
        element = element.parentElement;
    }
    return path.join("/");
}

function isVisible(element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

function traverseDom(node) {
    const results = [];
    const tagsToInclude = ['p', 'article', 'section', 'blockquote'];

    if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();
        if (tagsToInclude.includes(tagName) && isVisible(node)) {
            const text = node.innerText.trim();
            if (text) {
                const sentences = text.split(/(?<=[.!?])\s+/);
                sentences.forEach(sentence => {
                    const words = sentence.split(/\s+/);
                    if (words.length > 5) {
                        results.push({
                            id: getDomPath(node),
                            text: sentence.trim()
                        });
                    }
                });
            }
        } else {
            for (let child = node.firstChild; child; child = child.nextSibling) {
                results.push(...traverseDom(child));
            }
        }
    }
    return results;
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    const storage = new Storage()
    if (request.action === "getDOM") {
        const domData = traverseDom(document.body);
        console.log("Traversed DOM Data:", domData);
        const chunkedArr = [];
        for (let i = 0; i < domData.length; i += 10) {
            chunkedArr.push(domData.slice(i, i + 10));
        }
        let enabled = await storage.get("enabled");
        chunkedArr.forEach(chunk => {
            if (Boolean(enabled)) {
                client.emit('new-message', JSON.stringify(chunk));
            }
        });
    }
});

async function highlightElementByPath(path, classification, context) {
    const storage = new Storage()
    const parts = path.split('/');
    let element = document;
    for (const part of parts) {
        const [tag, index] = part.split('[');
        const tagName = tag.includes('#') ? tag.split('#')[0] : tag;
        const id = tag.includes('#') ? tag.split('#')[1] : null;
        if (id) {
            element = element.querySelector(`#${id}`);
        } else if (index) {
            const idx = parseInt(index.replace(']', '')) - 1;
            element = element.querySelectorAll(tagName)[idx];
        } else {
            element = element.querySelector(tagName);
        }
        if (!element) {
            return null;
        }
    }
    if (element && classification && context) {
        element.style.filter = 'blur(5px)';
        element.style.transition = 'filter 0.3s ease';
        const childMode = await storage.get("childMode");
        if (!Boolean(childMode)) {
            element.onmouseover = function () {
                this.style.filter = 'none';
            };
            element.onmouseout = function () {
                this.style.filter = 'blur(5px)';
            };
        }
        const uniqueClass = `blurred-${Math.random().toString(36).substr(2, 9)}`;
        const classList = Array.from(element.classList);
        const hasBlurredClass = classList.some(cls => cls.startsWith('blurred-'));
        if (!hasBlurredClass) {
            element.classList.add(uniqueClass);
        }
        if (context && context.trim() != '') {
            addTippyToElement(`.${uniqueClass}`, classification, context);
        }
    }
}

const style = document.createElement('style');
style.textContent = `
  .closeme {
    cursor: pointer;
    position: absolute;
    top: -5px;
    right: 1px;
    font-weight: bold;
    padding: 5px;
    font-family: sans-serif;
    color: #fff;
  }
  .tippy-content {
    min-height: 60px;
  }
  .tippy-image-container {
    width: 60px;
    height: 100%;
    float: left;
  }
  .tippy-image {
    height: 55px;
    width: 55px;
    padding: 2px 8px;
    padding-left: 0;
  }
  .tippy-content-container {
    margin-left: 64px;
  }
`;

document.head.appendChild(style);

function addTippyToElement(selector, classification, context) {
    let src = "";
    switch (classification.split(' ')[0]) {
        case "Explicit":
            src = explicit;
            break;
        case "Hate":
            src = hate;
            break;
        case "Violence":
            src = violence;
            break;
        case "Misinformation":
            src = propaganda;
            break;
        case "Phishing":
            src = fraud;
            break;
    }
    tippy(selector, {
        content: `<div class="tippy-image-container"><img src="${src}" alt="" class="tippy-image"/></div><div class="tippy-content-container"><strong>${classification}</strong><br>${context}</div><span class="closeme">x</span>`,
        showOnCreate: true,
        sticky: true,
        flip: false,
        placement: "top",
        flipBehavior: "top",
        trigger: "manual",
        hideOnClick: false,
        allowHTML: true,
        interactive: true,
        onShow(instance) {
            instance.popper.querySelector('.closeme').addEventListener('click', () => {
                instance.hide();
            });
        },
        onHide(instance) {
            instance.popper.querySelector('.closeme').removeEventListener('click', () => {
                instance.hide();
            });
        },
    });
}