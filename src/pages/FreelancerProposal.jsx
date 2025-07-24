import React, { useState } from "react";

const FreelancerProposal = () => {
  const [coverLetter, setCoverLetter] = useState("");
  const [price, setPrice] = useState("");
  const [durationInDays, setDurationInDays] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!coverLetter || !price || !durationInDays) {
      alert("Please fill out all fields.");
      return;
    }

    const proposalData = {
      coverLetter,
      price: parseFloat(price),
      durationInDays: parseInt(durationInDays, 10),
    };

    console.log("Submitted Proposal:", proposalData);
    // TODO: send this data to backend / Firebase etc.
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 my-8">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Submit Proposal
          </h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2">
            For project:{" "}
            <span className="font-semibold text-blue-600">
              AI Portfolio Website
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover Letter */}
          <div>
            <label
              htmlFor="coverLetter"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              rows="8"
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
              placeholder="Introduce yourself and explain why you're the best fit for this project..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Price and Days */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Proposed Price (INR)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400 sm:text-sm">
                    ₹
                  </span>
                </div>
                <input
                  type="number"
                  id="price"
                  className="w-full pl-7 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                  placeholder="e.g., 4500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min="0"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="days"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Estimated Duration (in days)
              </label>
              <input
                type="number"
                id="days"
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                placeholder="e.g., 45"
                value={durationInDays}
                onChange={(e) => setDurationInDays(e.target.value)}
                required
                min="1"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            >
              Submit Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FreelancerProposal;
