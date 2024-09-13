import * as SQLite from 'expo-sqlite';

let db;

export const initDB = async () => {
  // If db is already initialized, do nothing
  if (db) {
    return;
  }

  db = await SQLite.openDatabaseAsync('tracekid.db');

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT CHECK(role IN ('customer', 'agent')) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS Chats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL,
      agent_id INTEGER,
      status TEXT CHECK(status IN ('open', 'closed')) NOT NULL DEFAULT 'open',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES Users(id),
      FOREIGN KEY (agent_id) REFERENCES Users(id)
    );
    CREATE TABLE IF NOT EXISTS Messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id INTEGER NOT NULL,
      sender_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (chat_id) REFERENCES Chats(id),
      FOREIGN KEY (sender_id) REFERENCES Users(id)
    );
  `);

  // Initialize the database with a default customer and agent
  await initData();
};

// Function to initialize the database with default users
const initData = async () => {
  const existingUsers = await db.getAllAsync(
    'SELECT * FROM Users WHERE id IN (1, 2)',
  );
  if (existingUsers.length === 0) {
    // Insert default customer (id = 1)
    await db.runAsync(
      "INSERT INTO Users (id, name, role) VALUES (1, 'Default Customer', 'customer')",
    );

    // Insert default agent (id = 2)
    await db.runAsync(
      "INSERT INTO Users (id, name, role) VALUES (2, 'Default Agent', 'agent')",
    );
  }

  const existingChat = await db.getAllAsync(
    'SELECT * FROM Messages WHERE chat_id = ?',
    [1],
  );
  if (existingChat.length === 0) {
    await addMessage(1, 2, 'Hi there, how can I help you?');
  }
};

// Function to add a new chat and initialize it with an agent message
export const addChat = async (customer_id, agent_id = 2) => {
  await initDB();

  // Create the new chat
  const chatResult = await db.runAsync(
    'INSERT INTO Chats (customer_id, agent_id) VALUES (?, ?)',
    customer_id,
    agent_id,
  );
  const chatId = chatResult.lastInsertRowId;
  console.log('New chat ID:', chatId);

  return chatId;
};

// Function to add a new message to the Messages table
export const addMessage = async (chat_id, sender_id, content) => {
  await initDB();
  const result = await db.runAsync(
    'INSERT INTO Messages (chat_id, sender_id, content) VALUES (?, ?, ?)',
    chat_id,
    sender_id,
    content,
  );
  console.log('New message ID:', result.lastInsertRowId);
  return result.lastInsertRowId;
};

// Function to fetch a chat by its ID
export const getChatById = async (chat_id) => {
  await initDB();
  const chat = await db.getFirstAsync(
    'SELECT * FROM Chats WHERE id = ?',
    chat_id,
  );
  console.log('Chat details:', chat);
  return chat;
};

// Function to fetch all chats
export const getAllChats = async () => {
  await initDB();
  const chats = await db.getAllAsync('SELECT * FROM Chats');
  for (const chat of chats) {
    console.log('Chat:', chat);
  }
  return chats;
};

// Function to fetch all messages for a given chat ID
export const getMessagesByChatId = async (chat_id) => {
  await initDB();
  const messages = [];
  for await (const message of db.getEachAsync(
    'SELECT * FROM Messages WHERE chat_id = ?',
    chat_id,
  )) {
    console.log('Message:', message);
    messages.push(message);
  }
  return messages;
};

// Function to delete all messages for a given chat
export const deleteChatMessages = async (chat_id) => {
  await initDB();
  await db.runAsync('DELETE FROM Messages WHERE chat_id = ?', chat_id);
  console.log(`Deleted messages for chat ID: ${chat_id}`);
};
