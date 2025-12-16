export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager at TechFlow",
      image: "👩‍💼",
      content:
        "ChatApp has completely transformed how our remote team communicates. The reliability and speed are unmatched, and the security features give us peace of mind for sensitive business discussions.",
      rating: 5,
      feature: "Team Collaboration",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Freelance Designer",
      image: "👨‍🎨",
      content:
        "As someone who works with clients globally, ChatApp's seamless cross-platform experience is a game-changer. I can switch between my laptop and phone without missing a beat.",
      rating: 5,
      feature: "Cross-Platform Sync",
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      role: "Research Team Lead",
      image: "👩‍🔬",
      content:
        "The end-to-end encryption was the deciding factor for our research team. We can share confidential data knowing it's completely secure. The interface is intuitive and requires no training.",
      rating: 5,
      feature: "Security & Privacy",
    },
    {
      id: 4,
      name: "Alex Thompson",
      role: "Community Manager",
      image: "👨‍💻",
      content:
        "Managing large group chats used to be chaotic. With ChatApp, the admin tools and message organization make it effortless to keep communities engaged and informed.",
      rating: 5,
      feature: "Group Management",
    },
    {
      id: 5,
      name: "Priya Patel",
      role: "Small Business Owner",
      image: "👩‍💼",
      content:
        "For a growing business, ChatApp provides enterprise-level features without the enterprise price tag. The value we get is incredible, and our team adoption was instant.",
      rating: 5,
      feature: "Business Ready",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "IT Director",
      image: "👨‍💼",
      content:
        "The API integration capabilities allowed us to seamlessly incorporate ChatApp into our existing workflow. The documentation is excellent and support is responsive.",
      rating: 5,
      feature: "Developer Friendly",
    },
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex justify-center space-x-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Loved by teams worldwide
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community has to
            say about their ChatApp experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-linear-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg">
                  {testimonial.image}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 truncate">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Feature Tag */}
              <div className="mt-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                  {testimonial.feature}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-100">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Countries</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to join our satisfied users?
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start your ChatApp journey today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Get Started Free
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300">
              View All Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
