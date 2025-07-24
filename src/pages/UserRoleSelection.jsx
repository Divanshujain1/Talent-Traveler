import React from "react";
import { useNavigate } from "react-router-dom";

const UserRoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem("userRole", role);

    if (role === "client") {
      navigate("/ProjectListings"); // or your custom client dashboard route
    } else if (role === "freelancer") {
      navigate("/ProjectListings"); // or your freelancer dashboard route
    }
  };

  return (
    <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
      {/* Card Start */}
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg p-8">
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <div className="border-b px-4 pb-6">
            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
              What best describes you?
            </h3>
            <div className="inline-flex text-gray-700 dark:text-gray-300 items-center"></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 px-2 mt-4 max-w-sm mx-auto">
          <button
            onClick={() => handleRoleSelect("client")}
            className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
          >
            Client
          </button>
          <button
            onClick={() => handleRoleSelect("freelancer")}
            className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2"
          >
            Freelancer
          </button>
        </div>
        {/* Card End */}
      </div>
    </div>
  );
};

export default UserRoleSelection;
