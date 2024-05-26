import { Server } from "socket.io";
import Groq from 'groq-sdk';
import http from 'http';
import { promptText } from './prompt.js';

const port = 2030;
const apiKeys = [
  process.env.GROQ_API_KEY
];
let currentApiKeyIndex = 0;

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const clients = new Map();
const messages = new Map();
let groq = new Groq({
  apiKey: apiKeys[currentApiKeyIndex]
});

io.on('connection', (client) => {
  console.log(`Client connected: ${client.id}`);
  clients.set(client.id, client);
  messages.set(client.id, []);

  console.log(`[Socket] Client connected: ${client.id}`);
  client.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${client.id}`);
    clients.delete(client.id);
    messages.delete(client.id);
  });

  client.on('new-message', (message) => {
    handleNewMessage(client, message);
  });

  client.on('abort', () => {
    if (client.data.currentChatStream) {
      client.data.currentChatStream.controller.abort();
      client.data.currentChatStream = undefined;
    }
  });
});

async function handleNewMessage(client, message) {
  try {
    console.log(`Processing new message for client`);
    let params = {
      messages: [{ role: 'system', content: promptText }, { role: 'user', content: message }],
      model: "mixtral-8x7b-32768"
    };
    console.log(params);
    const chatCompletion = await groq.chat.completions.create(params);
    const responseString = chatCompletion.choices[0]?.message?.content || "";
    let responseContent;
    try {
      responseContent = JSON.parse(responseString);
    } catch (jsonError) {
      console.log(`[Socket] Invalid JSON received, retrying request`);
      handleNewMessage(client, message);
      return;
    }
    console.log(`Chat completion received for client: ${responseString}`);
    client.emit('chatCompletion', responseString);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.log(`[Socket] Rate limit exceeded, switching API key`);
      switchApiKey();
      handleNewMessage(client, message);
    } else {
      client.emit('error', error);
      console.log(`[Socket] Error processing message: ${error.message}`);
    }
  }
}

function switchApiKey() {
  currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
  groq = new Groq({
    apiKey: apiKeys[currentApiKeyIndex]
  });
  console.log(`[Socket] Switched to API key index: ${currentApiKeyIndex}`);
}

server.listen(port);
console.log(`Listening on port ${port}`);