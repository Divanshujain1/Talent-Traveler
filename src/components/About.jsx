import React from "react";

const About = () => {
return (
  <div id="About" className="about sm:flex items-center max-w-screen-xxl bg-black">
    <div className="sm:w-1/2 p-10 ">
      <div className="image object-center text-center">
        <img src="https://i.imgur.com/WbQnbas.png" />
      </div>
    </div>
    <div className="sm:w-1/2 p-5 bg-black">
      <div className="text">
        <span className="text-white border-b-2 border-purple-600 uppercase">
          About us
        </span>
        <h2 className="my-4 font-bold text-white  sm:text-4xl ">
          About <span className="text-purple-600">Our Company</span>
        </h2>
        <p className="text-white">
          Talent Traveler is a campus-based freelance marketplace built for
          ambitious students and creative minds. We connect skilled students
          with those who need them — be it for gigs, collaborations, or paid
          projects. Whether you're a coder, designer, video editor, marketer, or
          just figuring it out — this is your launchpad. Forget endless job
          boards. Find real work. Build your brand. Get paid doing what you’re
          good at.
        </p>
      </div>
    </div>
  </div>
);
    };

export default About;
