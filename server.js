import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Chat server is running 🚀");
});

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
  },
  maxHttpBufferSize: 10 * 1024 * 1024, // 10MB - for file uploads
  pingTimeout: 60000,
  pingInterval: 25000,
});

// === In-memory storage for messages ===
const chatMessages = {};
const userNames = {};
const typingUsers = {};

// Helper function to broadcast to all except sender
const broadcastToOthersInRoom = (socket, room, event, data) => {
  socket.to(room).emit(event, data);
};

// Helper function to broadcast to all including sender
const broadcastToAllInRoom = (socket, room, event, data) => {
  io.to(room).emit(event, data);
};

io.on("connection", (socket) => {
  console.log("🔗 A user connected. Socket ID:", socket.id);

  // Set default username
  userNames[socket.id] = "User-" + socket.id.substring(0, 5);
  socket.emit("username_set", { username: userNames[socket.id] });

  // === USER SETS THEIR NAME ===
  socket.on("set_username", (username) => {
    if (!username?.trim()) return;

    const newUsername = username.trim().substring(0, 20);
    const oldUsername = userNames[socket.id];
    userNames[socket.id] = newUsername;

    console.log(`👤 ${oldUsername} → ${newUsername}`);

    // Confirm to user
    socket.emit("username_set", {
      username: newUsername,
      socketId: socket.id,
    });
  });

  // === TYPING INDICATOR ===
  socket.on("typing", ({ chatId, isTyping }) => {
    if (!chatId) return;

    // Initialize typing storage for this chat if needed
    if (!typingUsers[chatId]) {
      typingUsers[chatId] = new Set();
    }

    if (isTyping) {
      // Add user to typing set
      typingUsers[chatId].add(socket.id);
    } else {
      // Remove user from typing set
      typingUsers[chatId].delete(socket.id);
    }

    // Send typing status to everyone ELSE in the chat
    broadcastToOthersInRoom(socket, chatId, "user_typing", {
      chatId,
      userId: socket.id,
      username: userNames[socket.id],
      isTyping,
    });

    console.log(
      `⌨️ ${userNames[socket.id]} ${isTyping ? "started" : "stopped"} typing in ${chatId}`
    );
  });

  // === USER JOINS CHAT ===
  socket.on("join_chat", (chatId) => {
    console.log(`🎯 ${userNames[socket.id]} joined chat: ${chatId}`);
    socket.join(chatId);

    // Get history from memory
    const history = chatMessages[chatId] || [];
    console.log(
      `📜 Sending ${history.length} messages to ${userNames[socket.id]}`
    );
    socket.emit("chat_history", history);
  });

  // === USER SENDS MESSAGE ===
  socket.on("send_message", ({ chatId, content, tempId }) => {
    if (!chatId || !content?.trim()) return;

    console.log(
      `💬 Message from ${userNames[socket.id]}: "${content.substring(0, 50)}${content.length > 50 ? "..." : ""}"`
    );

    const message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      chatId,
      content: content.trim(),
      senderId: socket.id,
      senderName: userNames[socket.id],
      timestamp: new Date().toISOString(),
      tempId,
      status: "sent",
      type: "text",
    };

    // Store in memory
    if (!chatMessages[chatId]) chatMessages[chatId] = [];
    chatMessages[chatId].push(message);

    // Limit chat history
    if (chatMessages[chatId].length > 100) {
      chatMessages[chatId] = chatMessages[chatId].slice(-100);
    }

    // Send to everyone ELSE in the chat (EXCLUDE sender)
    broadcastToOthersInRoom(socket, chatId, "new_message", message);
    console.log(`📤 Sent to others in ${chatId}`);

    // Auto-stop typing when message is sent
    if (typingUsers[chatId]?.has(socket.id)) {
      typingUsers[chatId].delete(socket.id);
      broadcastToOthersInRoom(socket, chatId, "user_typing", {
        chatId,
        userId: socket.id,
        username: userNames[socket.id],
        isTyping: false,
      });
    }

    // Send ACK back ONLY to sender
    socket.emit("message_ack", {
      tempId,
      id: message.id,
      status: "sent",
    });
    console.log(`✅ ACK sent to ${userNames[socket.id]}`);
  });

  // === READ RECEIPTS ===
  socket.on("mark_read", ({ messageId }) => {
    if (!messageId) return;

    console.log(
      `📖 ${userNames[socket.id]} marked message as read: ${messageId}`
    );

    // Find the message in any chat
    for (const chatId in chatMessages) {
      const messages = chatMessages[chatId];
      if (!messages) continue;

      const message = messages.find((m) => m.id === messageId);
      if (message && message.senderId !== socket.id) {
        // Send read receipt to the original sender
        const senderSocket = io.sockets.sockets.get(message.senderId);
        if (senderSocket) {
          senderSocket.emit("message_read", {
            messageId: messageId,
            readerId: socket.id,
            readerName: userNames[socket.id],
            timestamp: Date.now(),
          });
          console.log(`📨 Sent read receipt to ${userNames[message.senderId]}`);
        }
        break;
      }
    }
  });

  // === MESSAGE REACTIONS ===
  socket.on("message_reaction", ({ messageId, reaction, chatId }) => {
    if (!messageId || !reaction || !chatId) return;

    console.log(
      `🎯 ${userNames[socket.id]} reacted ${reaction} to message ${messageId}`
    );

    // Find the message in storage
    const messages = chatMessages[chatId];
    if (!messages) return;

    const messageIndex = messages.findIndex((m) => m.id === messageId);
    if (messageIndex === -1) return;

    const message = messages[messageIndex];

    // Initialize reactions array if it doesn't exist
    if (!message.reactions) {
      message.reactions = [];
    }

    // Check if user already reacted to this message
    const existingReactionIndex = message.reactions.findIndex(
      (r) => r.userId === socket.id && r.reaction === reaction
    );

    if (existingReactionIndex > -1) {
      // Remove the reaction (toggle off)
      message.reactions.splice(existingReactionIndex, 1);
      console.log(`➖ ${userNames[socket.id]} removed reaction ${reaction}`);
    } else {
      // Remove any previous reaction from this user
      const userReactionIndex = message.reactions.findIndex(
        (r) => r.userId === socket.id
      );
      if (userReactionIndex > -1) {
        message.reactions.splice(userReactionIndex, 1);
      }

      // Add new reaction
      message.reactions.push({
        userId: socket.id,
        username: userNames[socket.id],
        reaction: reaction,
        timestamp: Date.now(),
      });
      console.log(`➕ ${userNames[socket.id]} added reaction ${reaction}`);
    }

    // Broadcast the updated reaction to everyone in the chat
    broadcastToAllInRoom(socket, chatId, "message_reaction_update", {
      messageId,
      reactions: message.reactions,
      chatId,
    });
  });

  // === EDIT MESSAGE ===
  socket.on("edit_message", ({ messageId, newContent, chatId }) => {
    if (!messageId || !newContent?.trim() || !chatId) return;

    console.log(`✏️ ${userNames[socket.id]} editing message ${messageId}`);

    // Find the message in storage
    const messages = chatMessages[chatId];
    if (!messages) return;

    const messageIndex = messages.findIndex((m) => m.id === messageId);
    if (messageIndex === -1) return;

    const message = messages[messageIndex];

    // Check if user is the sender
    if (message.senderId !== socket.id) {
      console.log(`❌ ${userNames[socket.id]} not authorized to edit message`);
      socket.emit("edit_error", {
        messageId,
        error: "You can only edit your own messages",
      });
      return;
    }

    // Check if message is within 15-minute edit window (900,000 ms)
    const messageTime = new Date(message.timestamp).getTime();
    const currentTime = Date.now();
    const timeDiff = currentTime - messageTime;

    if (timeDiff > 15 * 60 * 1000) {
      // 15 minutes
      console.log(`⏰ Edit window expired for message ${messageId}`);
      socket.emit("edit_error", {
        messageId,
        error: "Edit window expired (15 minutes)",
      });
      return;
    }

    // Save original content if first edit
    if (!message.editHistory) {
      message.editHistory = [];
    }

    // Add to edit history (limit to last 5 edits)
    message.editHistory.push({
      content: message.content,
      timestamp: message.timestamp,
      editedAt: Date.now(),
    });

    if (message.editHistory.length > 5) {
      message.editHistory = message.editHistory.slice(-5);
    }

    // Update message
    const originalContent = message.content;
    message.content = newContent.trim();
    message.edited = true;
    message.editedAt = Date.now();
    message.lastEditBy = socket.id;

    console.log(
      `✅ Message edited: "${originalContent.substring(0, 50)}..." → "${message.content.substring(0, 50)}..."`
    );

    // Broadcast edit to everyone in the chat
    broadcastToAllInRoom(socket, chatId, "message_edited", {
      messageId,
      newContent: message.content,
      editedAt: message.editedAt,
      chatId,
      editedBy: userNames[socket.id],
    });

    // Send confirmation to editor
    socket.emit("edit_success", {
      messageId,
      newContent: message.content,
      editedAt: message.editedAt,
    });
  });

  // === FILE/UPLOAD MESSAGES ===
  socket.on(
    "file_message",
    ({ chatId, fileName, fileType, fileSize, fileData, tempId }) => {
      if (!chatId || !fileName || !fileData) {
        console.log(
          `❌ Invalid file upload from ${userNames[socket.id]}: missing data`
        );
        socket.emit("file_error", {
          tempId,
          error: "Invalid file data",
        });
        return;
      }

      console.log(
        `📎 ${userNames[socket.id]} sent file: ${fileName} (${fileSize} bytes)`
      );

      // Check file size (2MB limit)
      const MAX_SIZE = 2 * 1024 * 1024; // 2MB in bytes
      if (fileSize > MAX_SIZE) {
        console.log(`❌ File too large: ${fileSize} > ${MAX_SIZE}`);
        socket.emit("file_error", {
          tempId,
          error: "File too large (max 2MB)",
        });
        return;
      }

      // Check if Base64 data is valid (basic check)
      const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
      if (!base64Regex.test(fileData)) {
        console.log(`❌ Invalid Base64 data for file: ${fileName}`);
        socket.emit("file_error", {
          tempId,
          error: "Invalid file data format",
        });
        return;
      }

      const message = {
        id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        chatId,
        content: `📎 ${fileName}`,
        senderId: socket.id,
        senderName: userNames[socket.id],
        timestamp: new Date().toISOString(),
        tempId,
        status: "sent",
        type: "file",
        fileInfo: {
          name: fileName,
          type: fileType || "application/octet-stream",
          size: fileSize,
          data: fileData,
        },
      };

      // Store in memory
      if (!chatMessages[chatId]) chatMessages[chatId] = [];
      chatMessages[chatId].push(message);

      // Limit chat history
      if (chatMessages[chatId].length > 100) {
        chatMessages[chatId] = chatMessages[chatId].slice(-100);
      }

      // Send to everyone ELSE in the chat
      broadcastToOthersInRoom(socket, chatId, "new_message", {
        ...message,
        fileInfo: {
          ...message.fileInfo,
          data: fileData,
        },
      });
      console.log(
        `📤 File sent to others in ${chatId}, data size: ${fileData.length} chars`
      );

      // Also send to sender (so they see it in their own chat)
      socket.emit("new_message", {
        ...message,
        self: true,
      });

      // ACK to sender
      socket.emit("message_ack", {
        tempId,
        id: message.id,
        status: "sent",
      });
      console.log(`✅ File ACK sent to ${userNames[socket.id]}`);
    }
  );

  // === DISCONNECT HANDLER ===
  socket.on("disconnect", (reason) => {
    console.log(`❌ ${userNames[socket.id]} disconnected: ${reason}`);

    // Clean up typing status from all chats
    Object.keys(typingUsers).forEach((chatId) => {
      if (typingUsers[chatId]?.has(socket.id)) {
        typingUsers[chatId].delete(socket.id);
        // Notify others in the chat
        broadcastToOthersInRoom(socket, chatId, "user_typing", {
          chatId,
          userId: socket.id,
          username: userNames[socket.id],
          isTyping: false,
        });
      }
    });

    delete userNames[socket.id];
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
