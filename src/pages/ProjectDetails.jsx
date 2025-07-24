import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Image map based on skill keywords
const skillImageMap = {
  web: "/src/assets/css.jpg",
  design: "/src/assets/design.jpg",
  react: "/src/assets/htnl.jpg",
  node: "/src/assets/nodejs.jpg",
  ui: "/src/assets/design.jpg",
  frontend: "/src/assets/css.jpg",
  backend: "/src/assets/css.jpg",
  javascript: "/src/assets/css.jpg",
  default: "/src/assets/default.jpg",
};

// Helper function to select image based on skills
const getImageForSkills = (skills) => {
  if (!skills || skills.length === 0) return skillImageMap.default;
  const lowerSkills = skills.map((skill) => skill.toLowerCase());
  for (const key in skillImageMap) {
    if (lowerSkills.some((skill) => skill.includes(key))) {
      return skillImageMap[key];
    }
  }
  return skillImageMap.default;
};

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from route
  const navigate = useNavigate(); // For redirection
  const [project, setProject] = useState(null);

  // Fetch project from localStorage
  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const found = storedProjects.find((proj) => proj.id === id);
    setProject(found || null);
  }, [id]);

  // Navigate to proposal form
  const handleForm = () => {
    navigate("/FreelancerProposal");
  };

  if (!project) {
    return (
      <div className="text-center text-gray-700 dark:text-white mt-20">
        Project not found 🫠
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 pt-6 transition-all duration-300 animate-fade-in mx-auto mt-10">
      <div className="text-3xl font-bold text-white mb-7 mt-0">
        Talent<span className="text-indigo-400">Traveler</span>
      </div>
      <div className="flex flex-col md:flex-row">
        {/* Project Visual */}
        <div className="md:w-1/3 text-center mb-8 md:mb-0">
          <img
            src={getImageForSkills(project.Skills)}
            alt="Project Visual"
            className="rounded-lg w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">
            {project.ProjectName}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Posted by: {project.Email}
          </p>
          <button
            onClick={handleForm}
            className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
          >
            Apply Now
          </button>
        </div>

        {/* Project Info */}
        <div className="md:w-2/3 md:pl-8">
          <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
            Project Description
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {project.Description}
          </p>

          <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
            Required Skills
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.Skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
            Project Details
          </h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Budget:</strong> {project.Budget}
            </li>
            <li>
              <strong>Contact:</strong> {project.Email}
            </li>
          </ul>
        </div>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default ProjectDetails;
