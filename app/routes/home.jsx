import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export function meta() {
  return [
    { title: "ChatApp - Secure Real-time Messaging" },
    {
      name: "description",
      content:
        "Connect instantly with friends and colleagues through secure, fast, and reliable messaging. End-to-end encryption, group chats, and cross-platform sync.",
    },
    {
      name: "keywords",
      content: "chat, messaging, real-time, secure, group chat, video call",
    },
    { property: "og:title", content: "ChatApp - Secure Real-time Messaging" },
    {
      property: "og:description",
      content: "Connect instantly with secure, fast messaging",
    },
    { property: "og:type", content: "website" },
  ];
}

export default function Home() {
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="grow">
        {/* Hero section */}
        <section id="home">
          <Hero />
        </section>

        {/* About section */}
        <section id="about">
          <About />
        </section>

        {/* Features section */}
        <section id="features">
          <Features />
        </section>

        {/* Testimonials section */}
        <section id="testimonials">
          <Testimonials />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
