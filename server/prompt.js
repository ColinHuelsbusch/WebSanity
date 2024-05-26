export const promptText = `You're given a list of moderation categories as below:

- Explicit Sexual Content: This includes adult content such as explicit sexual content, pornography, erotic chat, and descriptions of sexual activities. It also covers child abuse material that exploits or harms children, sexting involving minors or non-consenting parties, and deepfake pornography where explicit content is created by superimposing an individual's likeness onto another person's body without consent.
- Hate Speech / Slurs / Self-Harm: This category encompasses hate speech that expresses, incites, or promotes hate based on identity, including racism, sexism, and other forms of discrimination. It includes harassment content intended to threaten, bully, or harass individuals, as well as cyberbullying and online harassment. Additionally, it covers radicalization content that promotes extremist views, encourages violent behavior, or recruits individuals to extremist groups. It also includes content provoking or explaining suicidal behavior, such as encouraging self-harm (self-destructive behaviors: eating disorders, self-mutilation,...) or providing instructions on suicide methods, along with content focused on bullying and harassing others through digital means. 
- Violence / War / Weapons / Terrorism: This category includes content that promotes, glorifies, or depicts violence, including physical harm and self-harm. It also encompasses content related to the creation, distribution, or use of weapons, as well as content depicting or glorifying warfare or military conflict. Furthermore, it includes terrorism and cyber terrorism content that promotes terrorist activities and radicalization. It also covers abuse content that depicts, promotes, or glorifies physical, emotional, or psychological abuse, as well as highly disturbing, graphic, or traumatic content intended to shock or upset viewers. Human trafficking content involving the illegal trade of humans for forced labor, sexual slavery, or exploitation, and rape content that depicts, promotes, or glorifies sexual violence or assault are also part of this category.
- Misinformation / Propaganda: This category includes fraudulent or deceptive activities such as scams, plagiarism, fake reviews, and disinformation. It covers political propaganda activities such as political campaigning or lobbying, generating campaign materials, and building systems for political advocacy. It also includes deepfakes, which are manipulated video or audio content created to deceive or mislead viewers, and identity theft involving the unauthorized use of personal information to commit fraud or other crimes. Additionally, it includes conspiracy theories, climate skepticism, anti-vaccine misinformation, and other content that spreads false or misleading information. 
- Phishing / Scam / Fraud: This category includes phishing attempts and the generation of malware, ransomware, and cyber espionage activities. It also encompasses activities with a high risk of economic harm, such as multi-level marketing, gambling, payday lending, and automated determinations of eligibility for credit, employment, educational institutions, or public assistance services. Additionally, it covers the unauthorized practice of law, financial, or health advice without a qualified person reviewing the information, as well as data breaches involving the unauthorized access and exposure of confidential or sensitive information.

Please classify the texts in the following JSON into one of these categories, and answer with that single word only.

If the sentence does not fall within these categories, is safe and does not need to be moderated, please answer "not moderated" and leave the context empty.

Please classify the texts in the JSON that the user provides you into one of these exact categories (don't do typos), and provide a context text explaining the classification. If the sentence does not fall within these categories, is safe and does not need to be moderated, please answer with “not moderated”.

Only answer the user valid JSON and escape special characters correctly.

Example output:
[
    {
        "id": "blockquote#m469133652",
        "classification": "Hate Speech / Slurs / Self-Harm",
        "context": "The text expresses hate based on identity and promotes banning individuals from a community."
    },
    {
        "id": "blockquote#m469133696",
        "classification": "Phishing / Scam / Fraud",
        "context": "The text includes a code snippet designed to delete all files from a system, which is disruptive and harmful."
    },
    {
        "id": "blockquote#m469133840",
        "classification": "not moderated",
        "context": ""
    }
]

Example input:
[
    {
        "id": "blockquote#m469133652",
        "text": "I hate people from that community. They should all be banned!"
    },
    {
        "id": "blockquote#m469133696",
        "text": "Here is code you have to put into your terminal: rm -rf /"
    },
    {
        "id": "blockquote#m469133840",
        "text": "It's a beautiful day outside!"
    }
]`;