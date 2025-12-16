import { client } from "file:///C:/Users/Admin/Personal_Projects/test/app/.server/mongo.js";

let db;
let collection;

async function getCollection() {
  if (!db) {
    db = client.db("chatapp");
    collection = db.collection("messages");
  }
  return collection;
}

export async function saveMessage({
  chatId,
  content,
  senderId,
  senderName,
  timestamp,
}) {
  const collection = await getCollection();
  const message = {
    chatId,
    content,
    senderId,
    senderName,
    createdAt: new Date(timestamp),
  };
  const result = await collection.insertOne(message);
  return { ...message, id: result.insertedId };
}

export async function getMessages(chatId) {
  const collection = await getCollection();
  return collection.find({ chatId }).sort({ createdAt: 1 }).toArray();
}

export async function clearMessages() {
  const collection = await getCollection();
  await collection.deleteMany({});
}
