export default function About() {
  const stats = [
    {
      number: "10K+",
      label: "Active Users",
      color: "from-blue-500 to-blue-600",
    },
    {
      number: "99.9%",
      label: "Uptime",
      color: "from-green-500 to-emerald-600",
    },
    {
      number: "50+",
      label: "Countries",
      color: "from-purple-500 to-purple-600",
    },
    {
      number: "24/7",
      label: "Support",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const features = [
    {
      icon: (
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Lightning Fast",
      description: "Messages delivered in under 100ms globally",
      linear: "from-blue-500 to-blue-600",
    },
    {
      icon: (
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Military Grade Security",
      description: "End-to-end encryption for all conversations",
      linear: "from-green-500 to-emerald-600",
    },
    {
      icon: (
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
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Global Infrastructure",
      description: "Low latency servers in 50+ countries",
      linear: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 bg-white overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-500/10 to-purple-500/10 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm border border-blue-200/50">
            <div className="relative flex h-3 w-3">
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></div>
              <div className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></div>
            </div>
            Trusted by thousands of teams worldwide
          </div>

          <div className="relative">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
              <span className="block text-gray-900">The Future of</span>
              <span className="block bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
                Team Communication
              </span>
            </h2>

            <div className="relative">
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Built for{" "}
                <span className="font-semibold text-blue-600">speed</span>,
                designed for{" "}
                <span className="font-semibold text-purple-600">privacy</span>,
                and optimized for{" "}
                <span className="font-semibold text-green-600">
                  collaboration
                </span>
                . Experience messaging that just works.
              </p>
            </div>
          </div>
        </div>

        <div className="flex col lg:row items-center gap-16 lg:gap-24">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-10">
            {/* Feature Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-linear-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${feature.linear}"></div>

                  <div className="relative flex items-start space-x-4">
                    <div
                      className={`shrink-0 w-14 h-14 bg-linear-to-br ${feature.linear} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </div>

                    <div className="1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100/50">
              <div className="flex items-start space-x-4">
                <div className="shrink-0 w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-2">
                    Our Mission
                  </h4>
                  <p className="text-gray-700">
                    To create a communication platform where conversations flow
                    seamlessly, privacy is never compromised, and technology
                    serves to enhance human connection.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex col sm:row gap-4 pt-6">
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Start Free Today
                </div>
              </button>

              <button className="group relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 border-2 border-gray-300 hover:border-blue-400 bg-white">
                <div className="relative text-gray-700 px-8 py-4 rounded-xl flex items-center justify-center gap-3 group-hover:text-blue-600">
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
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  Explore Features
                </div>
              </button>
            </div>
          </div>

          {/* Right Content - Interactive Chat Demo */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Floating Chat Windows */}
              <div className="relative z-10">
                {/* Main Chat Window */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-200 transform hover:scale-105 transition-transform duration-500">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-14 h-14 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
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
                              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                            />
                          </svg>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-3 border-white shadow"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl">
                          Team Collaboration
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600 text-sm font-medium">
                            Active • 8 online
                          </span>
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="w-6 h-6 bg-linear-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">Now</div>
                  </div>

                  {/* Chat Messages */}
                  <div className="space-y-4 mb-6">
                    {/* Message 1 */}
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-blue-600 font-bold text-sm">
                          JD
                        </span>
                      </div>
                      <div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                          <p className="text-gray-800">
                            Just deployed the new analytics dashboard! 📊
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button className="text-xs text-gray-500 hover:text-blue-600">
                              👍 3
                            </button>
                            <button className="text-xs text-gray-500 hover:text-red-600">
                              ❤️ 2
                            </button>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 ml-2 mt-1 block">
                          2 min ago
                        </span>
                      </div>
                    </div>

                    {/* Message 2 */}
                    <div className="flex items-start space-x-3 justify-end">
                      <div>
                        <div className="bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-xs">
                          <p className="text-white">
                            Amazing work! The metrics look perfect 📈
                          </p>
                        </div>
                        <div className="flex items-center justify-end space-x-1 mt-1 mr-1">
                          <span className="text-xs text-gray-400">
                            1 min ago
                          </span>
                          <span className="text-xs text-blue-400">✓✓</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-sm">SA</span>
                      </div>
                    </div>

                    {/* Message 3 */}
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-green-600 font-bold text-sm">
                          ML
                        </span>
                      </div>
                      <div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                          <p className="text-gray-800">
                            Can you share the deployment checklist?
                          </p>
                        </div>
                        <div className="ml-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-gray-400">
                              Typing...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex items-center space-x-3">
                    <div className="1 bg-gray-100 rounded-full px-4 py-3 flex items-center space-x-3">
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
                      <input
                        type="text"
                        placeholder="Type your reply..."
                        className="1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                        disabled
                      />
                      <button className="text-gray-400 hover:text-purple-500 transition-colors">
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
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                      </button>
                    </div>
                    <button className="bg-linear-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full hover:shadow-lg transition-shadow">
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

                {/* Floating Notification */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-2xl border border-gray-200 animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-linear-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
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
                          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        Voice message
                      </div>
                      <div className="text-sm text-gray-500">Sarah • 1:24</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 relative">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl"></div>
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:border-blue-200 transition-all duration-300 hover:shadow-2xl"
              >
                <div
                  className={`text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r ${stat.color} mb-3 group-hover:scale-105 transition-transform duration-300`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-700 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
