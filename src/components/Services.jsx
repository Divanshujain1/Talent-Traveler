import React from "react";
import varifiedImg from "../assets/varified.png"; 
import workImg from "../assets/varified.png"; 
import portfolioImg from "../assets/varified.png"; 

const services = [
  {
    title: "🎓 Verified Student Freelancers",
    description:
      "Every freelancer on Talent Traveler is a verified college student with real skills in design, development, content creation, editing, and more — so you can trust the talent you hire.",
    image: varifiedImg,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-8 w-8 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    reverse: false,
  },
  {
    title: "Sentiment Analysis",
    description:
      "The product has built-in sentiment analysis capabilities, allowing it to determine the sentiment (positive, negative, or neutral) expressed in text or customer feedback.",
    image: "https://images.unsplash.com/photo-1599134842279-fe807d23316e",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-8 w-8 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387"
        />
      </svg>
    ),
    reverse: true,
  },
  {
    title: "Natural Language Generation (NLG)",
    description:
      "The AI product can generate human-like written content, summaries, or reports based on structured data or analysis results.",
    image: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-8 w-8 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25"
        />
      </svg>
    ),
    reverse: false,
  },
];

const Services = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900 pt-16 pb-32 space-y-24">
      {services.map((service, index) => (
        <div className="relative" key={index}>
          <div
            className={`lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ${
              service.reverse ? "lg:grid-cols-2 lg:grid-flow-row-dense" : ""
            }`}
          >
            <div
              className={`mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 ${
                service.reverse ? "lg:col-start-2" : ""
              }`}
            >
              <div>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500">
                    {service.icon}
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-white">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-lg text-gray-300">
                    {service.description}
                  </p>
                  <div className="mt-6">
                    <a
                      className="inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700"
                      href="/login"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div
                className={`${
                  service.reverse
                    ? "-ml-48 pr-6 md:-ml-16 lg:right-0"
                    : "-mr-48 pl-6 md:-mr-16 lg:left-0"
                } lg:relative lg:m-0 lg:h-full lg:px-0`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  loading="lazy"
                  style={{ color: "transparent" }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
