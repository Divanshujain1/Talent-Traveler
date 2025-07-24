import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const ProjectListings = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/LoginPage");
    } else {
      setUser(storedUser);
    }

    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
  }, [navigate]);

  const handleDelete = (idToDelete) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== idToDelete
    );
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const handleProjectDetails = (id) => {
    navigate(`/project-details/${id}`);
  };

  const handleAddProject = () => {
    navigate("/postproject");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/LoginPage");
  };

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Top Bar */}
      <div className="text-3xl font-bold text-white mb-5 flex justify-between items-center">
        <div>Talent<span className="text-indigo-400 ">Traveler</span></div>
        
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm">
              👋 {user.displayName || user.email || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Listings</h1>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            {/* Delete Button (top right X) */}
            <button
              onClick={() => handleDelete(project.id)}
              className="absolute top-2 right-2 text-gray-300 hover:text-red-500 text-2xl font-bold"
            >
              ×
            </button>

            {/* Image */}
            <img
              src={getImageForSkills(project.Skills)}
              alt="Project Visual"
              className="w-full h-40 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">
                {project.ProjectName}
              </h2>
              <p className="text-sm mb-2 text-gray-300">
                {project.Description}
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium text-violet-400">Skills:</span>{" "}
                {project.Skills?.join(", ")}
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium text-violet-400">Budget:</span>{" "}
                {project.Budget}
              </p>
              <p className="text-sm mb-4">
                <span className="font-medium text-violet-400">Email:</span>{" "}
                {project.Email}
              </p>

              {/* View Project Button */}
              <button
                onClick={() => handleProjectDetails(project.id)}
                className="w-full mt-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              >
                View Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Floating Button */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleAddProject}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg"
        >
          + Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectListings;
