export default function Features() {
  const features = [
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-7 h-7 text-white"
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
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow"></div>
        </div>
      ),
      title: "Real-time Messaging",
      description:
        "Instant delivery with read receipts and live typing indicators",
      linear: "from-blue-500 to-blue-600",
      hover: "hover:shadow-blue-100",
    },
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative w-14 h-14 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>
      ),
      title: "Military-Grade Security",
      description: "End-to-end encryption with forward secrecy",
      linear: "from-green-500 to-emerald-600",
      hover: "hover:shadow-green-100",
    },
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative w-14 h-14 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-7 h-7 text-white"
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
        </div>
      ),
      title: "Group Collaboration",
      description: "Unlimited members with advanced moderation tools",
      linear: "from-purple-500 to-purple-600",
      hover: "hover:shadow-purple-100",
    },
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-orange-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative w-14 h-14 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      ),
      title: "Rich Media Sharing",
      description: "Photos, videos, documents, and animated GIFs",
      linear: "from-orange-500 to-orange-600",
      hover: "hover:shadow-orange-100",
    },
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative w-14 h-14 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          </div>
        </div>
      ),
      title: "Voice Messages",
      description: "High-quality audio with visual waveform",
      linear: "from-red-500 to-red-600",
      hover: "hover:shadow-red-100",
    },
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative w-14 h-14 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      ),
      title: "Cross-Platform Sync",
      description: "Seamless experience across all your devices",
      linear: "from-indigo-500 to-indigo-600",
      hover: "hover:shadow-indigo-100",
    },
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-pink-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative w-14 h-14 bg-linear-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>
      ),
      title: "Smart Reactions",
      description: "Express with emojis, stickers, and GIFs",
      linear: "from-pink-500 to-pink-600",
      hover: "hover:shadow-pink-100",
    },
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-teal-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative w-14 h-14 bg-linear-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
        </div>
      ),
      title: "Custom Themes",
      description: "Personalize your chat experience",
      linear: "from-teal-500 to-teal-600",
      hover: "hover:shadow-teal-100",
    },
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
          <div className="relative w-14 h-14 bg-linear-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      ),
      title: "Free Forever",
      description: "No hidden fees, all features included",
      linear: "from-amber-500 to-amber-600",
      hover: "hover:shadow-amber-100",
    },
  ];

  return (
    <div className="relative bg-white overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-500/10 to-purple-500/10 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm border border-blue-200/50">
            <div className="relative flex h-3 w-3">
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></div>
              <div className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></div>
            </div>
            Feature-Packed Platform
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="block text-gray-900">Everything You Need for</span>
            <span className="block bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
              Modern Communication
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Packed with powerful features designed to make every conversation
            <span className="font-semibold text-blue-600"> effortless</span>,
            <span className="font-semibold text-purple-600"> secure</span>, and
            <span className="font-semibold text-green-600"> delightful</span>.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-6 border border-gray-200/50 shadow-lg ${feature.hover} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
            >
              {/* linear Overlay */}
              <div
                className={`absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-5 ${feature.linear} rounded-2xl transition-opacity duration-500`}
              ></div>

              {/* Icon */}
              <div className="mb-5">{feature.icon}</div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Indicator */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${feature.linear} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>
            </div>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-gray-200/50">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-2/5">
              <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-6">
                Live Demo
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Experience the Power
                <span className="block text-blue-600">Firsthand</span>
              </h3>

              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Try our interactive demo and see how ChatWave transforms team
                communication with instant messaging, file sharing, and
                collaboration tools.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">No sign-up required</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Real-time updates</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">End-to-end encrypted</span>
                </div>
              </div>

              <button className="group relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl">
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
                  Try Interactive Demo
                </div>
              </button>
            </div>

            <div className="lg:w-3/5">
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-r from-blue-200 to-purple-200 rounded-3xl blur-xl opacity-50"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">CW</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          Demo Chat Room
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-sm text-gray-500">
                            5 online
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">Now</div>
                  </div>

                  <div className="space-y-4">
                    {/* Demo Message 1 */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-blue-600 text-xs font-bold">
                          JD
                        </span>
                      </div>
                      <div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                          <p className="text-gray-800 text-sm">
                            Welcome to the demo! Try sending a message 👋
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 ml-1">
                          <span className="text-xs text-gray-400">
                            Just now
                          </span>
                          <div className="flex gap-1">
                            <button className="text-xs hover:scale-125 transition-transform">
                              👍
                            </button>
                            <button className="text-xs hover:scale-125 transition-transform">
                              ❤️
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Demo Input */}
                    <div className="mt-6">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Type a demo message..."
                          className="w-full bg-gray-100 border-none outline-none rounded-full px-5 py-3 pr-12 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                          <button className="text-gray-400 hover:text-blue-500 transition-colors">
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
                          <button className="bg-linear-to-r from-blue-500 to-purple-500 text-white p-2 rounded-full">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
