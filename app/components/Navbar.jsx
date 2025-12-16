import { Link } from "react-router";
import { useState } from "react";

// Logo Component
function ChatAppLogo({ className = "h-8 w-8" }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform rotate-12 shadow-lg">
          <div className="w-3 h-3 bg-white rounded-full opacity-90"></div>
        </div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full border-2 border-white"></div>
      </div>
      <span className="font-bold text-xl bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        ChatApp
      </span>
    </div>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth scroll function
  const handleSmoothScroll = (hash) => {
    setIsMenuOpen(false);

    // If we're not on home page, navigate to home first
    if (window.location.pathname !== "/") {
      window.location.href = `/${hash}`;
      return;
    }

    // Smooth scroll to section
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        const offsetTop =
          element.getBoundingClientRect().top + window.pageYOffset - 80; // Offset for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // Navigation items
  const navItems = [
    { to: "#about", label: "About" },
    { to: "#features", label: "Features" },
    { to: "#testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo - Links to home */}
          <Link to="/" className="shrink-0">
            <ChatAppLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.to}
                onClick={() => handleSmoothScroll(item.to)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/login"
              className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.to}
                  onClick={() => handleSmoothScroll(item.to)}
                  className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Link
                  to="/login"
                  className="block w-full text-center bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
