# Web Sanity

<img src="https://github.com/ColinHuelsbusch/WebSanity/blob/main/extension/assets/logo.svg?raw=true" alt="Web Sanity" width="256"/>

The project consists of two main components: the Browser Extension, located in the `extension` folder, and the Backend, located in the `server` folder.

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
