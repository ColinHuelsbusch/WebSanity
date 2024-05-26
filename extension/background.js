import { text } from 'stream/consumers';
import dom_parser from './parser.ts';
export { };

console.log("BACKGROUND UP AND RUNNING!");

function handleUrlChange(url) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabId, { action: "getDOM" });
    }
  });
}

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  console.log("URL changed to: " + details.url);
  handleUrlChange(details.url);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log(`URL CHANGED: ${tab.url}`);
    handleUrlChange(tab.url);
  }
});