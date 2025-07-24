import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import Footer from "../components/Footer";
import About from "/src/components/About.jsx";
import Services from "/src/components/Services.jsx";

const HeroSection = () => {
  const navigate = useNavigate();

  // 👇 Auto-redirect logged-in users to Dashboard on page load
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/ProjectListings");
    }
  }, [navigate]);

  // 👇 These buttons are for not-logged-in users only
  const handleGetStarted = () => {
    if (isAuthenticated()) {
      navigate("/ProjectListings");
    }
    else {
      navigate("/LoginPage");
    }
    
  };

  const handleSignin = () => {
    if (isAuthenticated()) {
      navigate("/ProjectListings");
    }
    else {
      navigate("/Signin");
    }
    
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-black/10 backdrop-blur-lg transition-colors duration-300 md:px-10 lg:px-10">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              className="w-10"
              height={100}
              width={100}
              src="https://tailwindflex.com/images/logo.svg"
              alt="Talent Traveler logo"
            />
            <span className="md:flex text-2xl mt-0.5 font-bold text-white">
              Talent Traveler
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center md:gap-8 text-white">
            <a
              href="#Home"
              className="text-sm font-medium hover:text-purple-400 transition"
            >
              Home
            </a>
            <a
              href="#About"
              className="text-sm font-medium hover:text-purple-400 transition"
            >
              About
            </a>
            <a
              href="#Contact"
              className="text-sm font-medium hover:text-purple-400 transition"
            >
              Contact
            </a>
            <button
              onClick={handleSignin}
              className="text-sm font-medium hover:text-purple-400 transition"
            >
              Sign in
            </button>
            <button
              onClick={handleGetStarted}
              className="cursor-pointer rounded-full border-2 py-2 px-6 border-white bg-white text-purple-900 hover:bg-purple-900 hover:text-white hover:shadow-lg transition duration-300 ease-in-out"
            >
              Login Now
            </button>
          </div>

          {/* Mobile Menu Button (non-functional for now) */}
          <div className="md:hidden">
            <button className="text-2xl text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="Home"
        className="w-full flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-[#121212] to-purple-800"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ lineHeight: "1.2" }}
          >
            Turn{" "}
            <span className="relative whitespace-nowrap text-purple-400 dark:text-purple-400">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-2/3 left-0 h-[0.58em] w-full fill-purple-400/70 dark:fill-purple-300/60"
                preserveAspectRatio="none"
              >
                <path d="..." />
              </svg>
              <span className="relative">Passion</span>
            </span>{" "}
            into Paychecks
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Unlock student talent and real-world results. Post gigs or get hired
            — all in your campus network. Designed for creators, coders,
            designers, doers. Join the Talent Traveler revolution.
          </p>

          {/* CTA */}
          <div
            className="flex justify-center items-center mt-8"
            data-aos="fade-up"
            data-aos-delay={400}
          >
            <button
              onClick={handleGetStarted}
              className="relative flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200"
            >
              <span className="absolute inset-0 rounded-full bg-purple-600 opacity-50 animate-ping" />
              <span className="relative z-10 pr-2">Join Talent Traveler</span>
            </button>
          </div>
        </div>

        {/* Scroll Icon */}
        <div className="absolute sm:bottom-14 bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#About" className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Rest of the page */}
      <About />
      <Services />
      <Footer />
    </>
  );
};

export default HeroSection;
