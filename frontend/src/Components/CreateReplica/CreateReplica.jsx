import React, { useState, useEffect } from "react";
import "./CreateReplica.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateReplica = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    description: "",
    gender: "",
    occupation: "",
    personality: "",
    hobbies: "",
    image: null, // New field for image
  });

  const [imagePreview, setImagePreview] = useState(null); // State to store the image preview
  const [imageUrl, setImageUrl] = useState(null); // State to store the uploaded image URL

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const isLoggedIn = localStorage.getItem("token"); // Assuming token is stored in localStorage

    if (!isLoggedIn) {
      navigate("/auth"); // Redirect to the auth page if not logged in
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the first selected file
      }));

      // Generate the image preview
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview
      };
      if (file) {
        reader.readAsDataURL(file); // Read the image file as a URL
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, // Replace with your Cloudinary cloud name
        formData
      );
      setImageUrl(response.data.secure_url); // Set the uploaded image URL
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.image) {
      await uploadImageToCloudinary(formData.image); // Upload image to Cloudinary
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:5000/api/create-replica", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Success message
      } else {
        alert("Error: " + data.message); // Error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }

    // Optionally, clear the form after submission
    setFormData({
      name: "",
      age: "",
      email: "",
      description: "",
      gender: "",
      occupation: "",
      personality: "",
      hobbies: "",
      image: null, // Clear the image field
    });
    setImagePreview(null); // Clear the image preview
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
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
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
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="occupation">Occupation:</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="personality">Personality Traits:</label>
          <input
            type="text"
            id="personality"
            name="personality"
            value={formData.personality}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hobbies">Hobbies:</label>
          <input
            type="text"
            id="hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Character Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
          {imagePreview && (
            <div className="image-preview-container">
              <img
                src={imagePreview}
                alt="Character Preview"
                className="image-preview"
              />
            </div>
          )}
        </div>
        <button type="submit" className="submit-button">
          Create Replica
        </button>
      </form>
    </div>
  );
};

export default CreateReplica;
