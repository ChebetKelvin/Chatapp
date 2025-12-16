import { useState } from "react";
import { redirect } from "react-router";
import { getSession } from "../.server/session";
import { SocketProvider } from "../context/SocketContext";
import ChatWindow from "../components/ChatWindow";
import DashboardNavbar from "../components/DashboardNavbar";
import ChatList from "../components/ChatList"; // We'll create this

// Dashboard Meta
export function meta() {
  return [
    { title: "Dashboard | ChatApp" },
    {
      name: "description",
      content: "User dashboard with chat access and conversation management",
    },
  ];
}

// Protected Loader
export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (!userId) return redirect("/login");
  return null;
}

// Main Dashboard Component
export default function Dashboard() {
  const [activeChat, setActiveChat] = useState(null); // Start with no chat selected
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // "list" or "chat"

  const recentConversations = [
    {
      id: "general-room",
      name: "General Chat",
      lastMessage: "Hello everyone!",
      unread: 2,
      isGroup: true,
      members: 12,
      timestamp: "10:30 AM",
    },
    {
      id: "project-team",
      name: "Project Team",
      lastMessage: "Meeting at 3 PM",
      unread: 0,
      isGroup: true,
      members: 5,
      timestamp: "Yesterday",
    },
    {
      id: "design-group",
      name: "Design Group",
      lastMessage: "New mockups ready",
      unread: 5,
      isGroup: true,
      members: 8,
      timestamp: "Monday",
    },
    {
      id: "john-doe",
      name: "John Doe",
      lastMessage: "Are you available?",
      unread: 1,
      isGroup: false,
      isOnline: true,
      timestamp: "Just now",
    },
    {
      id: "sarah-smith",
      name: "Sarah Smith",
      lastMessage: "Thanks for the help!",
      unread: 0,
      isGroup: false,
      isOnline: false,
      timestamp: "2 hours ago",
    },
  ];

  const userStats = {
    totalMessages: 1.2,
    onlineFriends: 8,
    activeGroups: 3,
  };

  // Handle chat selection
  const handleSelectChat = (chatId) => {
    setActiveChat(chatId);
    setViewMode("chat");
    if (sidebarOpen) setSidebarOpen(false); // Close sidebar on mobile
  };

  // Go back to chat list
  const handleBackToList = () => {
    setViewMode("list");
    setActiveChat(null);
  };

  // Toggle sidebar (mobile)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <SocketProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar */}
        <DashboardNavbar />

        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 right-4 z-50">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-white rounded-lg shadow-md"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden pt-16">
          {/* Sidebar for Mobile */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 flex lg:hidden">
              <div
                className="fixed inset-0 bg-black opacity-30"
                onClick={toggleSidebar}
              ></div>
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
                <ConversationSidebar
                  conversations={recentConversations}
                  activeChat={activeChat}
                  onSelectChat={handleSelectChat}
                  userStats={userStats}
                />
              </div>
            </div>
          )}

          {/* Sidebar for Desktop */}
          <div className="hidden lg:flex lg:flex-col lg:w-80 lg:border-r lg:border-gray-200 bg-white shadow-sm">
            <ConversationSidebar
              conversations={recentConversations}
              activeChat={activeChat}
              onSelectChat={handleSelectChat}
              userStats={userStats}
            />
          </div>

          {/* Main Content */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Show chat list OR chat window based on view mode */}
            {viewMode === "list" ? (
              <>
                {/* Stats / Welcome Banner */}
                <div className="bg-linear-to-r from-blue-500 to-purple-600 px-8 py-6 text-white">
                  <h1 className="text-2xl font-bold mb-2">Welcome back! 👋</h1>
                  <p className="text-blue-100">
                    {userStats.onlineFriends} friends online •{" "}
                    {userStats.activeGroups} active groups
                  </p>
                </div>

                {/* Chat List View */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="max-w-4xl mx-auto">
                    {/* Header with Create Chat Button */}
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Your Conversations
                        </h2>
                        <p className="text-gray-600">
                          Click on any chat to start messaging
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                        + New Chat
                      </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-blue-600"
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
                          <div>
                            <div className="text-2xl font-bold text-gray-900">
                              {userStats.totalMessages}k
                            </div>
                            <div className="text-sm text-gray-600">
                              Total Messages
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 1.0H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-900">
                              {userStats.onlineFriends}
                            </div>
                            <div className="text-sm text-gray-600">
                              Online Friends
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-purple-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-gray-900">
                              {userStats.activeGroups}
                            </div>
                            <div className="text-sm text-gray-600">
                              Active Groups
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat List */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                      <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Recent Conversations
                        </h3>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {recentConversations.map((chat) => (
                          <button
                            key={chat.id}
                            onClick={() => handleSelectChat(chat.id)}
                            className="w-full p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="relative">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center ${chat.isGroup ? "bg-blue-500" : "bg-purple-500"}`}
                              >
                                <span className="text-white font-bold">
                                  {chat.isGroup
                                    ? chat.name.charAt(0)
                                    : chat.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </span>
                              </div>
                              {!chat.isGroup && chat.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-gray-900">
                                  {chat.name}
                                </h4>
                                <span className="text-xs text-gray-500">
                                  {chat.timestamp}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">
                                {chat.lastMessage}
                              </p>
                            </div>

                            {chat.unread > 0 && (
                              <div className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                {chat.unread}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Chat Window View */
              <div className="flex-1 flex flex-col">
                {/* Chat Header with Back Button */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center space-x-4">
                  <button
                    onClick={handleBackToList}
                    className="p-2 hover:bg-gray-100 rounded-full transition lg:hidden"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                  </button>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {recentConversations.find((c) => c.id === activeChat)
                        ?.name || "Chat"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {recentConversations.find((c) => c.id === activeChat)
                        ?.isGroup
                        ? `${recentConversations.find((c) => c.id === activeChat)?.members || 0} members`
                        : "Private conversation"}
                    </p>
                  </div>
                </div>

                {/* Chat Window */}
                <div className="flex-1 p-4">
                  <ChatWindow chatId={activeChat} />
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </SocketProvider>
  );
}

// Conversation Sidebar Component (for desktop/mobile)
function ConversationSidebar({
  conversations,
  activeChat,
  onSelectChat,
  userStats,
}) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* User Profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            U
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">User</h3>
            <div className="flex items-center text-green-600 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              Online
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {userStats.totalMessages}k
            </div>
            <div className="text-xs text-gray-500">Messages</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {userStats.onlineFriends}
            </div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {userStats.activeGroups}
            </div>
            <div className="text-xs text-gray-500">Groups</div>
          </div>
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Conversations
        </h3>
        <nav className="space-y-1">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition ${
                activeChat === chat.id
                  ? "bg-blue-50 text-blue-700 border border-blue-100"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${chat.isGroup ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"}`}
                >
                  {chat.isGroup
                    ? chat.name.charAt(0)
                    : chat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </div>
                {!chat.isGroup && chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <span className="font-medium truncate">{chat.name}</span>
                  {chat.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
