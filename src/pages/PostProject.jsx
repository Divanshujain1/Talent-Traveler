import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // UUID import

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ProjectName: "",
    Description: "",
    Email: "",
    Skills: [],
    Budget: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const navigate = useNavigate();

  const showAlert = (msg) => {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: msg,
    });
  };

  const handleNext = () => {
    if (step === 1) {
      if (
        !formData.ProjectName.trim() ||
        !formData.Description.trim() ||
        !formData.Email.trim()
      ) {
        showAlert("Please complete all fields in Step 1.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.Email)) {
        showAlert("Please enter a valid email.");
        return;
      }
    }

    if (step === 2) {
      if (formData.Skills.length === 0 || !formData.Budget.trim()) {
        showAlert("Add at least one skill and a budget.");
        return;
      }
    }

    if (step === 3) {
      const newProject = {
        id: uuidv4(), // ✅ unique ID
        ProjectName: formData.ProjectName,
        Description: formData.Description,
        Email: formData.Email,
        Skills: formData.Skills,
        Budget: `₹${formData.Budget}`,
      };

      const existingProjects =
        JSON.parse(localStorage.getItem("projects")) || [];
      const updatedProjects = [newProject, ...existingProjects];
      localStorage.setItem("projects", JSON.stringify(updatedProjects));

      Swal.fire({
        icon: "success",
        title: "Project Posted!",
        showConfirmButton: false,
        timer: 1500,
      });

      // ✅ Redirect to listing
      navigate("/ProjectListings");

      return;
    }

    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => step > 1 && setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!formData.Skills.includes(skillInput.trim().toLowerCase())) {
        setFormData((prev) => ({
          ...prev,
          Skills: [...prev.Skills, skillInput.trim()],
        }));
      }
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      Skills: prev.Skills.filter((_, i) => i !== index),
    }));
  };

  const progressWidth = `${(step - 1) * 50}%`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-[#5ea0c9ff] shadow-lg rounded-lg p-8">
        {/* Step Indicators */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center justify-center gap-8 w-full max-w-md">
            {[1, 2, 3].map((s) => (
              <div key={s} className="relative flex-1 flex justify-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-medium transition-colors duration-300 ${
                    step >= s ? "bg-purple-600" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`absolute h-1 w-full top-1/2 left-1/2 transform -translate-x-0 -translate-y-1/2 z-[-1] ${
                      step > s ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#242f96ff] rounded-full h-2 mb-8">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Steps */}
        <form>
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Step 1: Project Info
              </h2>
              <div className="space-y-4">
                <input
                  name="ProjectName"
                  placeholder="Project Name"
                  value={formData.ProjectName}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
                <input
                  name="Description"
                  placeholder="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
                <input
                  name="Email"
                  type="email"
                  placeholder="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Step 2: Skills & Budget
              </h2>
              <input
                type="text"
                placeholder="Type skill & press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className="w-full border rounded-lg p-3 mb-2"
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.Skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(i)}
                      className="text-purple-500 hover:text-purple-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                name="Budget"
                type="number"
                placeholder="Budget (INR)"
                value={formData.Budget}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 3: Review</h2>
              <ul className="list-disc pl-5 text-sm space-y-2">
                <li>
                  <strong>Name:</strong> {formData.ProjectName}
                </li>
                <li>
                  <strong>Description:</strong> {formData.Description}
                </li>
                <li>
                  <strong>Email:</strong> {formData.Email}
                </li>
                <li>
                  <strong>Skills:</strong> {formData.Skills.join(", ")}
                </li>
                <li>
                  <strong>Budget:</strong> ₹{formData.Budget}
                </li>
              </ul>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step !== 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
              >
                Previous
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              {step === 3 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
