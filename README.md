# Web Sanity

Web Sanity is a browser extension that detects and highlights or blocks harmful content. It acts as a protective shield, allowing users to surf the web having full controll of the negative aspects of the internet. [More information about the project on DEVPOST](https://devpost.com/software/web-sanity)

<img src="https://github.com/ColinHuelsbusch/WebSanity/blob/main/extension/assets/logo.svg?raw=true" alt="Web Sanity" height="256"/>

## Preview

<img src="https://github.com/ColinHuelsbusch/WebSanity/blob/main/extension/assets/preview.jpeg?raw=true" alt="Preview" height="256"/>

## Browser Extension

### Install Requirements
Navigate to the `extension` directory and install the necessary packages:

```sh
cd extension
npm install
npm i -g plasmo
```

### Development Server
To start the development server, run:

```sh
npm run dev
```

### Production Build
To create a production build, run:

```sh
npm run build
```

### Loading the Extension
1. Open `chrome://extensions` in your browser.
2. Enable Developer Mode.
3. Click on "Load Unpacked" and navigate to your extension's `build/chrome-mv3-dev` or `build/chrome-mv3-prod` directory.

### Package Extension for Web Store
To package the extension for the Web Store, run:

```sh
npm run package
```

## Backend

### Install Requirements
Navigate to the `server` directory and install the necessary packages:

```sh
cd server
npm install
```

### Running with Groq API
1. Create an `.env` file and add the environment variable `GROQ_API_KEY`.
2. Start the server with:

```sh
npm run groq
```

### Running with Mistral AI API
1. Create an `.env` file and add the environment variable `MISTRAL_API_KEY`.
2. Start the server with:

```sh
npm run mistral
```

## Pipeline

<img src="https://github.com/ColinHuelsbusch/WebSanity/blob/main/extension/assets/pipeline.jpeg?raw=true" alt="Preview" height="256"/>

## The Team

<img src="https://github.com/ColinHuelsbusch/WebSanity/blob/main/extension/assets/team.jpg?raw=true" alt="Team" height="256"/>

[Colin Hülsbusch](https://github.com/ColinHuelsbusch), [Bixente Elgart](https://github.com/Brohoya), [Xuban Ceccon](https://github.com/EHxuban11) 
