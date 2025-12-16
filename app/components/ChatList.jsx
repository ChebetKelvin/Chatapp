import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { Users, MessageSquare, UserPlus } from "lucide-react";

export default function ChatList({ onSelectChat, activeChat }) {
  const socket = useSocket();
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Load mock chats (or replace with API later)
  useEffect(() => {
    if (!socket) return;

    const mock = [
      {
        id: "general",
        name: "General Room",
        unread: 3,
        lastMessage: "Hello everyone!",
        timestamp: "10:30 AM",
        isGroup: true,
      },
      {
        id: "john-doe",
        name: "John Doe",
        unread: 1,
        lastMessage: "Are you free?",
        timestamp: "9:45 AM",
        isGroup: false,
        isOnline: true,
      },
      {
        id: "project-alpha",
        name: "Project Alpha",
        unread: 0,
        lastMessage: "Meeting at 2 PM",
        timestamp: "Yesterday",
        isGroup: true,
      },
      {
        id: "design-team",
        name: "Design Team",
        unread: 0,
        lastMessage: "New mockups uploaded",
        timestamp: "Monday",
        isGroup: true,
      },
    ];

    setChats(mock);
  }, [socket]);

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* HEADER */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>

          <button
            className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition"
            aria-label="Add new chat"
          >
            <UserPlus className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        <p className="text-gray-500">Chat with your team and friends</p>

        {/* SEARCH */}
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="absolute right-3 top-3 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ONLINE USERS */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">ONLINE NOW</h3>

        <div className="flex space-x-3 overflow-x-auto pb-2">
          {["John", "Sarah", "Mike", "Emma", "Alex"].map((name, i) => (
            <button
              key={i}
              onClick={() => onSelectChat(name.toLowerCase())}
              className="flex flex-col items-center space-y-2 focus:outline-none"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-linear-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {name.charAt(0)}
                </div>

                {/* Green indicator */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              <span className="text-xs text-gray-600">{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <h3 className="text-sm font-semibold text-gray-500 mb-3 px-4">
            RECENT CHATS
          </h3>

          {chats.map((chat) => {
            const isActive = activeChat === chat.id;

            return (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`w-full p-4 flex items-center space-x-4 rounded-xl transition-colors
                  ${isActive ? "bg-blue-50" : "hover:bg-gray-50"}
                `}
              >
                {/* Avatar */}
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center 
                    bg-linear-to-r 
                    ${
                      chat.isGroup
                        ? "from-blue-500 to-blue-600"
                        : "from-purple-500 to-pink-500"
                    } text-white`}
                  >
                    {chat.isGroup ? (
                      <Users className="w-6 h-6" />
                    ) : (
                      <MessageSquare className="w-6 h-6" />
                    )}
                  </div>

                  {!chat.isGroup && chat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-gray-800">{chat.name}</h4>
                    <span className="text-xs text-gray-500">
                      {chat.timestamp}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 truncate max-w-40">
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Unread badge */}
                {chat.unread > 0 && (
                  <div className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* USER FOOTER */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            Y
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">You</h4>
            <p className="text-xs text-green-600 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              Online
            </p>
          </div>

          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
