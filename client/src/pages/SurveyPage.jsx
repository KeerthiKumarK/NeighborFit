import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { getNeighborhoodMatches } from "../api/matchApi";

const SurveyPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    environment: "",
    preferences: {
      safety: 5,
      nightlife: 5,
      schools: 5,
      affordability: 5,
      parks: 5,
    }
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (field, value) => {
    if (step === 1) {
      setFormData({ ...formData, environment: value });
    } else if (step === 2) {
      setFormData({
        ...formData,
        preferences: { ...formData.preferences, [field]: value },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const matches = await getNeighborhoodMatches(formData.preferences);
      localStorage.setItem("userPreferences", JSON.stringify(formData));
      localStorage.setItem("neighborhoodMatches", JSON.stringify(matches));
      toast.success("Preferences submitted successfully!");
      navigate("/results");
    } catch (error) {
      toast.error("Failed to fetch matches. Please try again.");
      console.error("Error fetching matches:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-teal-700 p-6 text-white flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Step {step} of 2</h2>

        {step === 1 && (
          <>
            <p className="mb-4 text-lg">What kind of environment do you prefer?</p>
            {["Urban", "Suburban", "Rural"].map((option) => (
              <label key={option} className="block mb-2">
                <input
                  type="radio"
                  value={option}
                  checked={formData.environment === option}
                  onChange={(e) => handleChange("environment", e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </>
        )}

        {step === 2 && (
          <>
            <p className="mb-4 text-lg">Rate how important these features are (1-10)</p>
            {Object.keys(formData.preferences).map((key) => (
              <div key={key} className="mb-3">
                <label className="capitalize">{key}: {formData.preferences[key]}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.preferences[key]}
                  onChange={(e) => handleChange(key, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            ))}
          </>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="bg-white text-blue-800 px-4 py-2 rounded-lg">
              Back
            </button>
          )}
          {step < 2 ? (
            <button type="button" onClick={nextStep} className="bg-white text-blue-800 px-4 py-2 rounded-lg">
              Next
            </button>
          ) : (
            <button type="submit" className="bg-lime-400 text-black px-6 py-2 rounded-lg font-bold">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SurveyPage;
