import { useNavigate } from "react-router";

export default function HeroSection() {
  let Navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-linear-to-br from-white via-blue-50 to-indigo-100 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        {/* Animated Logo/Badge */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 rounded-3xl blur-lg opacity-50 animate-pulse"></div>
            <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
              <div className="flex items-center space-x-3 px-4 py-2">
                <div className="relative">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                    <svg
                      className="w-6 h-6 text-white"
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
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-lg">
                    ChatWave
                  </div>
                  <div className="text-xs text-gray-500">
                    Real-time messaging
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Heading with linear */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          <span className="block text-gray-900">Chat in</span>
          <span className="block bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
            real-time
          </span>
        </h1>

        {/* Animated subtitle */}
        <div className="relative">
          <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            <span className="inline-block animate-fade-in">
              Connect instantly with
            </span>
            <span className="relative inline-block mx-2">
              <span className="relative z-10 bg-linear-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-full border border-blue-200">
                <span className="text-blue-600 font-semibold">friends</span>
              </span>
            </span>
            <span className="inline-block">and teams</span>
            <br />
            <span className="text-lg text-gray-500 mt-2 block">
              No sign-up required • End-to-end encrypted • 100% free
            </span>
          </p>
        </div>

        {/* CTA Buttons with glow effect */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => {
              Navigate("/login");
            }}
            className="group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-2">
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Start Chatting Free
            </div>
          </button>

          <button className="group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 border-2 border-gray-300 hover:border-blue-400 bg-white">
            <div className="relative text-gray-700 px-8 py-4 rounded-2xl flex items-center justify-center gap-2 group-hover:text-blue-600">
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Watch Demo
            </div>
          </button>
        </div>

        {/* App Preview with floating animation */}
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Live demo • Real messages
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Feature highlights */}
            <div className="text-left space-y-6">
              <div className="flex items-start space-x-4 group hover:bg-white/50 p-4 rounded-2xl transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    Real-time messages
                  </h3>
                  <p className="text-gray-600">No delays, instant delivery</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group hover:bg-white/50 p-4 rounded-2xl transition-all">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Secure & private</h3>
                  <p className="text-gray-600">End-to-end encryption</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group hover:bg-white/50 p-4 rounded-2xl transition-all">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Group chats</h3>
                  <p className="text-gray-600">Create unlimited rooms</p>
                </div>
              </div>
            </div>

            {/* Right side - Chat preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-linear-to-r from-blue-200 to-purple-200 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">CW</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Team Chat</h3>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-500">3 online</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">Just now</div>
                </div>

                <div className="space-y-4">
                  {/* Message 1 */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-bold">
                        JD
                      </span>
                    </div>
                    <div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                        <p className="text-gray-800">
                          Hey team! Let's catch up on the project updates 🚀
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 mt-1 ml-1">
                        <span className="text-xs text-gray-400">2:45 PM</span>
                        <div className="flex space-x-1">
                          <span className="text-xs">👍</span>
                          <span className="text-xs">❤️</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message 2 */}
                  <div className="flex items-start space-x-3 justify-end">
                    <div>
                      <div className="bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-xs">
                        <p className="text-white">
                          I've finished the design mockups! 📐
                        </p>
                      </div>
                      <div className="flex items-center justify-end space-x-2 mt-1 mr-1">
                        <span className="text-xs text-gray-400">2:46 PM</span>
                        <span className="text-xs">✓✓</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">YA</span>
                    </div>
                  </div>

                  {/* Message 3 */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs font-bold">
                        MK
                      </span>
                    </div>
                    <div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                        <p className="text-gray-800">
                          Awesome! I'll review them now 👀
                        </p>
                      </div>
                      <div className="mt-1 ml-1">
                        <span className="text-xs text-gray-400">Typing...</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input area */}
                <div className="mt-6 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                      disabled
                    />
                    <button className="text-gray-400 hover:text-blue-500">
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
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <button className="bg-linear-to-r from-blue-500 to-purple-500 text-white p-2 rounded-full hover:shadow-lg transition-shadow">
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats at bottom */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">10K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">1M+</div>
            <div className="text-gray-600">Messages Sent</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">&lt;100ms</div>
            <div className="text-gray-600">Latency</div>
          </div>
        </div>
      </div>

      {/* Add these styles to your global CSS or Tailwind config */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
