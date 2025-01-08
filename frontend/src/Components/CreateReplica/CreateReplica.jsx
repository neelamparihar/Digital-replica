import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateReplica.css";

const CreateReplica = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    persona: "",
    tone: "neutral", // Default value as per schema
  });

  // Check if the user is logged in, if not, redirect to auth page
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/auth"); // Redirect to auth page if not logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/replicas",
        formData
      );
      console.log(response.data);

      if (response.status === 201) {
        alert(response.data.message);
        setFormData({
          name: "",
          description: "",
          persona: "",
          tone: "neutral",
        });
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="create-replica-container">
      <h1>Create Your Digital Replica</h1>
      <form onSubmit={handleSubmit} className="create-replica-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="persona">Persona:</label>
          <input
            type="text"
            id="persona"
            name="persona"
            value={formData.persona}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tone">Tone:</label>
          <select
            id="tone"
            name="tone"
            value={formData.tone}
            onChange={handleChange}
          >
            <option value="neutral">Neutral</option>
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Create Replica
        </button>
      </form>
    </div>
  );
};

export default CreateReplica;
