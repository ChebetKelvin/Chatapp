import { useState, useEffect, useRef, useCallback } from "react";
import { useSocket } from "../context/SocketContext";

export default function ChatWindow({ chatId }) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [showReactionPicker, setShowReactionPicker] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);
  const emojiPickerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Simple emoji list
  const commonEmojis = [
    "😀",
    "😂",
    "🥰",
    "😎",
    "🤔",
    "👋",
    "🎉",
    "🔥",
    "💯",
    "⭐",
    "👍",
    "❤️",
    "🙏",
    "😊",
    "😍",
    "🤣",
    "😭",
    "😅",
    "🤷",
    "👀",
    "😘",
    "🤪",
    "😜",
    "🤗",
    "🤩",
    "🥳",
    "😇",
    "🥺",
    "😡",
    "🤬",
    "💩",
    "👻",
    "💀",
    "👽",
    "🤖",
    "🎃",
    "🙈",
    "🙉",
    "🙊",
    "💋",
    "💔",
    "❤️‍🔥",
    "💖",
    "💗",
    "💓",
    "💞",
    "💕",
    "❣️",
    "💘",
    "💝",
    "💤",
    "💢",
    "💥",
    "💦",
    "💨",
    "💫",
    "🕳️",
    "💣",
    "💬",
    "👁️‍🗨️",
  ];

  useEffect(() => {
    if (!socket || username) return;

    const timer = setTimeout(() => {
      const defaultName = `User-${Math.floor(Math.random() * 1000)}`;
      const name = prompt("Enter your username:", defaultName);
      if (name && name.trim()) {
        socket.emit("set_username", name.trim());
      } else {
        socket.emit("set_username", defaultName);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [socket, username]);

  useEffect(() => {
    if (socket) {
      console.log("🔗 My socket ID:", socket.id);
      console.log("🔗 Socket connected?", socket.connected);
    }
  }, [socket]);

  // Listen for username
  useEffect(() => {
    if (!socket) return;

    const handleUsernameSet = (data) => {
      console.log("👤 Username set:", data.username);
      setUsername(data.username);
    };

    socket.on("username_set", handleUsernameSet);
    return () => socket.off("username_set", handleUsernameSet);
  }, [socket]);

  // Listen for typing indicators
  useEffect(() => {
    if (!socket || !chatId) return;

    const handleUserTyping = (data) => {
      if (data.chatId !== chatId) return;

      setTypingUsers((prev) => {
        if (data.userId === socket.id) return prev;

        if (data.isTyping) {
          if (!prev.find((u) => u.userId === data.userId)) {
            return [...prev, { userId: data.userId, username: data.username }];
          }
          return prev;
        } else {
          return prev.filter((u) => u.userId !== data.userId);
        }
      });
    };

    socket.on("user_typing", handleUserTyping);
    return () => {
      socket.off("user_typing", handleUserTyping);
      setTypingUsers([]);
    };
  }, [socket, chatId]);

  // === RESET MESSAGES WHEN CHAT CHANGES ===
  useEffect(() => {
    setMessages([]);
    setTypingUsers([]);
    setShowReactionPicker(null);
    setShowEmojiPicker(false);
    setUploadingFile(false);
    setUploadProgress(0);
    setEditingMessageId(null);
    setEditContent("");
  }, [chatId]);

  // === JOIN CHAT + LOAD HISTORY ===
  useEffect(() => {
    if (!socket || !chatId) return;

    console.log(`🎯 Joining chat: ${chatId}`);
    socket.emit("join_chat", chatId);

    const handleHistory = (history) => {
      console.log(`📜 Received ${history?.length || 0} messages from history`);
      setMessages(
        (history || []).map((msg) => ({
          ...msg,
          self: msg.senderId === socket.id,
          createdAt: msg.timestamp,
          status: msg.self ? msg.status || "sent" : "delivered",
          reactions: msg.reactions || [],
          edited: msg.edited || false,
          editedAt: msg.editedAt || null,
        }))
      );
    };

    socket.on("chat_history", handleHistory);
    return () => socket.off("chat_history", handleHistory);
  }, [socket, chatId]);

  // === RECEIVE LIVE MESSAGES ===
  useEffect(() => {
    if (!socket || !chatId) return;

    const handleIncoming = (msg) => {
      console.log("📨 New message received:", {
        ...msg,
        type: msg.type,
        hasFileData: !!msg.fileInfo?.data,
      });
      if (msg.chatId !== chatId) return;

      const isSelf = msg.senderId === socket.id;

      setMessages((prev) => {
        const exists = prev.some(
          (m) =>
            (m.tempId && m.tempId === msg.tempId) || (m.id && m.id === msg.id)
        );
        if (exists) {
          console.log("⚠️ Message already exists, updating");
          return prev.map((m) =>
            m.tempId === msg.tempId || m.id === msg.id
              ? {
                  ...msg,
                  self: isSelf,
                  createdAt: msg.timestamp,
                  status: m.status || (isSelf ? "sent" : "delivered"),
                  reactions: msg.reactions || m.reactions || [],
                  edited: msg.edited || m.edited,
                  editedAt: msg.editedAt || m.editedAt,
                  fileInfo: msg.fileInfo || m.fileInfo,
                  type: msg.type || m.type || "text",
                }
              : m
          );
        }
        return [
          ...prev,
          {
            ...msg,
            self: isSelf,
            createdAt: msg.timestamp,
            status: isSelf ? "sent" : "delivered",
            reactions: msg.reactions || [],
            edited: msg.edited || false,
            editedAt: msg.editedAt || null,
            fileInfo: msg.fileInfo || null,
            type: msg.type || "text",
          },
        ];
      });
    };

    const handleMessageAck = (ack) => {
      console.log("✅ Message ACK received:", ack);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === ack.tempId
            ? {
                ...msg,
                id: ack.id || msg.id,
                status: ack.status || "sent",
              }
            : msg
        )
      );
    };

    const handleReadReceipt = (receipt) => {
      console.log("👁️ Read receipt received:", receipt);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === receipt.messageId && msg.self
            ? { ...msg, status: "read" }
            : msg
        )
      );
    };

    const handleReactionUpdate = (data) => {
      console.log("🎯 Reaction update received:", data);
      if (data.chatId !== chatId) return;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === data.messageId
            ? { ...msg, reactions: data.reactions || [] }
            : msg
        )
      );

      if (showReactionPicker === data.messageId) {
        setShowReactionPicker(null);
      }
    };

    const handleMessageEdited = (data) => {
      console.log("✏️ Message edited:", data);
      if (data.chatId !== chatId) return;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === data.messageId
            ? {
                ...msg,
                content: data.newContent,
                edited: true,
                editedAt: data.editedAt,
              }
            : msg
        )
      );
    };

    const handleEditSuccess = (data) => {
      console.log("✅ Edit successful:", data);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === data.messageId
            ? {
                ...msg,
                content: data.newContent,
                edited: true,
                editedAt: data.editedAt,
                status: "sent",
              }
            : msg
        )
      );
      setEditingMessageId(null);
      setEditContent("");
    };

    const handleEditError = (data) => {
      console.log("❌ Edit error:", data);
      alert(`Cannot edit: ${data.error}`);
      setEditingMessageId(null);
      setEditContent("");
    };

    socket.on("new_message", handleIncoming);
    socket.on("message_ack", handleMessageAck);
    socket.on("message_read", handleReadReceipt);
    socket.on("message_reaction_update", handleReactionUpdate);
    socket.on("message_edited", handleMessageEdited);
    socket.on("edit_success", handleEditSuccess);
    socket.on("edit_error", handleEditError);

    return () => {
      socket.off("new_message", handleIncoming);
      socket.off("message_ack", handleMessageAck);
      socket.off("message_read", handleReadReceipt);
      socket.off("message_reaction_update", handleReactionUpdate);
      socket.off("message_edited", handleMessageEdited);
      socket.off("edit_success", handleEditSuccess);
      socket.off("edit_error", handleEditError);
    };
  }, [socket, chatId, showReactionPicker]);

  // Mark received messages as read
  useEffect(() => {
    if (!socket || messages.length === 0) return;

    const timer = setTimeout(() => {
      const unreadMessages = messages.filter(
        (msg) =>
          !msg.self &&
          msg.status !== "read" &&
          (!msg.lastReadAttempt || Date.now() - msg.lastReadAttempt > 1000)
      );

      if (unreadMessages.length === 0) return;

      console.log(`📖 Marking ${unreadMessages.length} messages as read`);

      unreadMessages.forEach((msg) => {
        if (msg.id) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msg.id ? { ...m, lastReadAttempt: Date.now() } : m
            )
          );
          socket.emit("mark_read", { messageId: msg.id });
        }
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [socket, messages]);

  // === SCROLL TO BOTTOM ===
  const scrollToBottom = useCallback(() => {
    const el = messagesEndRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const { scrollTop, scrollHeight, clientHeight } = parent;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    if (isNearBottom) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers, scrollToBottom]);

  // === SEND MESSAGE ===
  const sendMessage = () => {
    if (!input.trim() || !socket) return;

    const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const localMsg = {
      id: `temp_${tempId}`,
      tempId,
      chatId,
      content: input,
      senderId: socket.id,
      senderName: "You",
      self: true,
      createdAt: new Date().toISOString(),
      status: "sending",
      reactions: [],
    };

    console.log("📤 Sending message");
    setMessages((prev) => [...prev, localMsg]);

    if (isTypingRef.current) {
      socket.emit("typing", { chatId, isTyping: false });
      isTypingRef.current = false;
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    socket.emit("send_message", {
      chatId,
      content: input,
      tempId,
    });

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (editingMessageId) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        saveEdit();
      } else if (e.key === "Escape") {
        cancelEdit();
      }
    } else {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!socket || !chatId) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (value.trim()) {
      if (!isTypingRef.current) {
        isTypingRef.current = true;
        socket.emit("typing", { chatId, isTyping: true });
      }
    } else {
      if (isTypingRef.current) {
        isTypingRef.current = false;
        socket.emit("typing", { chatId, isTyping: false });
      }
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (isTypingRef.current) {
        isTypingRef.current = false;
        socket.emit("typing", { chatId, isTyping: false });
      }
      typingTimeoutRef.current = null;
    }, 1000);
  };

  // Handle message reactions
  const handleReaction = (messageId, reaction) => {
    if (!socket || !chatId || !messageId) return;

    console.log(`Reacting ${reaction} to message ${messageId}`);
    socket.emit("message_reaction", {
      messageId,
      reaction,
      chatId,
    });

    setShowReactionPicker(null);
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    if (editingMessageId) {
      setEditContent((prev) => prev + emoji);
    } else {
      setInput((prev) => prev + emoji);
      setShowEmojiPicker(false);

      // Focus back on input
      setTimeout(() => {
        const textarea = document.querySelector("textarea");
        if (textarea) textarea.focus();
      }, 0);
    }
  };

  // === FILE UPLOAD FUNCTIONS ===
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file || !socket || !chatId) return;

    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      alert("File too large! Maximum size is 2MB.");
      return;
    }

    setUploadingFile(true);
    setUploadProgress(0);

    const reader = new FileReader();
    const tempId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    reader.onload = function (e) {
      // Convert file to Base64
      const base64Data = e.target.result.split(",")[1]; // Remove data:image/png;base64,

      // Optimistic render
      const localMsg = {
        id: `temp_${tempId}`,
        tempId,
        chatId,
        content: `📎 ${file.name}`,
        senderId: socket.id,
        senderName: "You",
        self: true,
        createdAt: new Date().toISOString(),
        status: "sending",
        type: "file",
        fileInfo: {
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64Data,
        },
      };

      setMessages((prev) => [...prev, localMsg]);

      // Send to server
      socket.emit("file_message", {
        chatId,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileData: base64Data,
        tempId,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      setTimeout(() => {
        setUploadingFile(false);
        setUploadProgress(0);
      }, 500);
    };

    reader.onerror = function () {
      alert("Error reading file!");
      setUploadingFile(false);
      setUploadProgress(0);
      clearInterval(progressInterval);
    };

    reader.readAsDataURL(file);
    event.target.value = ""; // Reset input
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // === MESSAGE EDITING FUNCTIONS ===
  const startEditing = (messageId, currentContent) => {
    if (!socket || !chatId) return;

    setEditingMessageId(messageId);
    setEditContent(currentContent);

    // Focus on edit input
    setTimeout(() => {
      const editInput = document.querySelector(".edit-textarea");
      if (editInput) {
        editInput.focus();
        editInput.select();
      }
    }, 10);
  };

  const saveEdit = () => {
    if (!socket || !chatId || !editingMessageId || !editContent.trim()) return;

    console.log(`Saving edit for message ${editingMessageId}`);

    // Optimistic update
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === editingMessageId
          ? {
              ...msg,
              content: editContent.trim(),
              edited: true,
              editedAt: Date.now(),
              status: "sending",
            }
          : msg
      )
    );

    // Send to server
    socket.emit("edit_message", {
      messageId: editingMessageId,
      newContent: editContent.trim(),
      chatId,
    });
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditContent("");
  };

  // === FORMATTING ===
  const formatTime = (isoString) => {
    try {
      if (!isoString) return "Just now";
      const date = new Date(isoString);
      const now = new Date();
      const diffMins = Math.floor((now - date) / 60000);
      if (diffMins < 1) return "Just now";
      if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    } catch (err) {
      return "Just now";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      console.log("🧹 Cleaning up component...");

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (socket && chatId && isTypingRef.current) {
        socket.emit("typing", { chatId, isTyping: false });
      }
    };
  }, [socket, chatId]);

  // Close pickers when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close reaction picker
      if (
        showReactionPicker &&
        !e.target.closest(".reaction-picker") &&
        !e.target.closest(".reaction-button")
      ) {
        setShowReactionPicker(null);
      }

      // Close emoji picker
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target) &&
        !e.target.closest("button[data-emoji-button]") &&
        !e.target.closest(".edit-textarea")
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showReactionPicker, showEmojiPicker]);

  // Common reactions
  const commonReactions = ["👍", "❤️", "😂", "😮", "😢", "😡"];

  if (!chatId) {
    return (
      <div className="flex flex-col h-[600px] md:h-[700px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-700">No chat selected</p>
          <p className="text-sm text-gray-500">Choose a chat from the list</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-500 to-purple-600 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div>
            <h2 className="text-white font-semibold text-lg">Group Chat</h2>
            <div className="text-blue-100 text-xs flex items-center gap-2">
              <span>{username || "User-" + socket?.id?.substring(0, 5)}</span>
              <button
                onClick={() => {
                  const newName = prompt("Enter new username:", username);
                  if (newName && newName.trim()) {
                    socket.emit("set_username", newName.trim());
                  }
                }}
                className="text-blue-200 hover:text-white text-xs underline"
              >
                change
              </button>
            </div>
          </div>
        </div>
        <div className="text-blue-100 text-sm flex items-center gap-2">
          {messages.length} messages
          {typingUsers.length > 0 && (
            <span className="text-green-300 animate-pulse">• Typing</span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 bg-linear-to-b from-gray-50 to-blue-50"
        role="log"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isSelf = msg.self;
            const hasUserReaction = msg.reactions?.some(
              (r) => r.userId === socket.id
            );

            return (
              <div
                key={msg.tempId || msg.id || `msg-${index}`}
                className={`flex ${isSelf ? "justify-end" : "justify-start"} group`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl p-4 shadow-sm transition-all duration-200 hover:shadow-md relative ${
                    isSelf
                      ? "bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
                >
                  {/* Sender name */}
                  <div className="text-xs font-semibold mb-1 opacity-80">
                    <span>{isSelf ? "You" : msg.senderName || "User"}</span>
                  </div>

                  {/* Message content - different for files or text */}
                  {msg.type === "file" ? (
                    <div
                      className={`p-3 rounded-lg ${isSelf ? "bg-blue-400/20" : "bg-gray-100"}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`text-2xl ${isSelf ? "text-blue-400" : "text-gray-500"}`}
                        >
                          📎
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {msg.fileInfo?.name || msg.content}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatFileSize(msg.fileInfo?.size || 0)} •{" "}
                            {msg.fileInfo?.type?.split("/")[0] || "File"}
                          </div>
                          {msg.fileInfo?.type?.startsWith("image/") &&
                            msg.fileInfo?.data && (
                              <div className="mt-3">
                                <img
                                  src={`data:${msg.fileInfo.type};base64,${msg.fileInfo.data}`}
                                  alt={msg.fileInfo.name}
                                  className="max-w-full max-h-48 rounded-lg border border-gray-300"
                                  loading="lazy"
                                />
                              </div>
                            )}
                          <button
                            onClick={() => {
                              if (msg.fileInfo?.data) {
                                // Create download link
                                const link = document.createElement("a");
                                link.href = `data:${msg.fileInfo.type};base64,${msg.fileInfo.data}`;
                                link.download = msg.fileInfo.name;
                                link.click();
                              }
                            }}
                            className={`mt-2 text-xs px-3 py-1 rounded ${isSelf ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}`}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : editingMessageId === msg.id ? (
                    <div className="space-y-2">
                      <textarea
                        className="edit-textarea w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-gray-800"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            saveEdit();
                          } else if (e.key === "Escape") {
                            cancelEdit();
                          }
                        }}
                        rows={3}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={saveEdit}
                          disabled={
                            !editContent.trim() || editContent === msg.content
                          }
                          className={`px-3 py-1 text-sm rounded ${
                            !editContent.trim() || editContent === msg.content
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`}
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`text-sm leading-relaxed ${
                        isSelf ? "text-blue-50" : "text-gray-700"
                      }`}
                    >
                      {msg.content}
                    </div>
                  )}

                  {/* Reactions display */}
                  {msg.reactions && msg.reactions.length > 0 && (
                    <div
                      className={`flex flex-wrap gap-1 mt-2 ${isSelf ? "justify-end" : "justify-start"}`}
                    >
                      {Object.entries(
                        msg.reactions.reduce((acc, r) => {
                          acc[r.reaction] = (acc[r.reaction] || 0) + 1;
                          return acc;
                        }, {})
                      ).map(([emoji, count]) => (
                        <button
                          key={emoji}
                          onClick={() => handleReaction(msg.id, emoji)}
                          className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 transition-all ${
                            msg.reactions.some(
                              (r) =>
                                r.userId === socket.id && r.reaction === emoji
                            )
                              ? "bg-blue-100 text-blue-700 border border-blue-300 scale-105"
                              : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                          }`}
                          title={`${count} reaction${count > 1 ? "s" : ""}`}
                        >
                          <span>{emoji}</span>
                          <span>{count}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Timestamp and action buttons */}
                  <div
                    className={`text-xs mt-2 flex items-center justify-between ${
                      isSelf ? "text-blue-200" : "text-gray-500"
                    }`}
                  >
                    <div className="flex items-center">
                      <span>{formatTime(msg.createdAt)}</span>
                      {msg.edited && (
                        <span className="ml-1 text-xs italic opacity-75">
                          (edited)
                        </span>
                      )}
                      {isSelf && (
                        <span className="ml-1">
                          {msg.status === "sending"
                            ? "🕐"
                            : msg.status === "read"
                              ? "✓✓"
                              : "✓"}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center">
                      {/* Edit button (only for self text messages) */}
                      {isSelf &&
                        msg.type === "text" &&
                        !msg.status?.includes("sending") && (
                          <button
                            onClick={() => startEditing(msg.id, msg.content)}
                            className="ml-2 text-xs p-1 rounded transition opacity-0 group-hover:opacity-50 hover:opacity-100 text-gray-500 hover:text-gray-700"
                            title="Edit message (15 minute window)"
                          >
                            ✏️
                          </button>
                        )}

                      {/* Reaction button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowReactionPicker(
                            showReactionPicker === msg.id ? null : msg.id
                          );
                        }}
                        className={`ml-2 text-xs p-1 rounded transition ${
                          hasUserReaction
                            ? "text-blue-500 hover:text-blue-700"
                            : "opacity-0 group-hover:opacity-50 hover:opacity-100 text-gray-500 hover:text-gray-700"
                        } reaction-button`}
                        title="Add reaction"
                      >
                        {hasUserReaction ? "❤️" : "👍"}
                      </button>
                    </div>
                  </div>

                  {/* Reaction picker */}
                  {showReactionPicker === msg.id && (
                    <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-300 rounded-xl shadow-lg p-2 z-10 reaction-picker">
                      <div className="flex gap-1">
                        {commonReactions.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => handleReaction(msg.id, emoji)}
                            className="text-lg hover:scale-125 transition-transform p-1"
                            title={`React ${emoji}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Typing indicator */}
        {typingUsers.length > 0 && (
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl p-4 bg-white border border-gray-200 rounded-bl-none">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {typingUsers.length === 1
                    ? `${typingUsers[0].username} is typing...`
                    : `${typingUsers.length} people are typing...`}
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx,.txt,.zip"
      />

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-4 relative">
        {uploadingFile && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>Uploading file...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {typingUsers.length > 0 && (
          <div className="text-xs text-gray-500 mb-2 animate-pulse">
            {typingUsers.length === 1
              ? `${typingUsers[0].username} is typing...`
              : `${typingUsers.length} people are typing...`}
          </div>
        )}

        <div className="flex items-end gap-3">
          {/* File Upload Button */}
          <button
            onClick={triggerFileInput}
            className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition"
            type="button"
            title="Upload file (max 2MB)"
            disabled={uploadingFile}
          >
            📎
          </button>

          {/* Emoji Button */}
          <button
            data-emoji-button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition"
            type="button"
            title="Add emoji"
          >
            😀
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              rows={1}
              style={{ minHeight: "48px", maxHeight: "120px" }}
              disabled={uploadingFile}
            />

            {/* Simple Emoji Picker */}
            {showEmojiPicker && (
              <div
                ref={emojiPickerRef}
                className="absolute bottom-full left-0 mb-2 bg-white border border-gray-300 rounded-xl shadow-lg p-2 z-50 w-64 max-h-64 overflow-y-auto"
              >
                <div className="grid grid-cols-8 gap-1">
                  {commonEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleEmojiSelect(emoji)}
                      className="text-lg hover:scale-125 transition-transform p-1 hover:bg-gray-100 rounded flex items-center justify-center"
                      type="button"
                      title={`Add ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center border-t pt-2">
                  Click to add emoji
                </div>
              </div>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={sendMessage}
            disabled={!input.trim() || uploadingFile}
            className={`p-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              input.trim() && !uploadingFile
                ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </div>

        {/* Quick Reactions for Last Message */}
        {messages.length > 0 && !showEmojiPicker && !editingMessageId && (
          <div className="flex justify-center gap-2 mt-3">
            <span className="text-xs text-gray-500">
              Quick react to last message:
            </span>
            {["👍", "❤️", "😂", "🎉"].map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  const lastMessage = messages[messages.length - 1];
                  if (lastMessage && !lastMessage.self) {
                    handleReaction(lastMessage.id, emoji);
                  }
                }}
                className="text-sm hover:scale-125 transition-transform"
                title={`React ${emoji} to last message`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
