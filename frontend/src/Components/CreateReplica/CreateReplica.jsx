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
  });

  //const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const uploadImageToCloudinary = async (imageFile) => {
  //   const cloudinaryFormData = new FormData();
  //   cloudinaryFormData.append("file", imageFile);
  //   cloudinaryFormData.append("upload_preset", "replica");

  //   try {
  //     const response = await axios.post(
  //       `https://api.cloudinary.com/v1_1/dpc7crbo5/image/upload`,
  //       cloudinaryFormData
  //     );
  //     return response.data.secure_url;
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     throw new Error("Image upload failed");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // let uploadedImageUrl = null;
      // if (formData.image) {
      //   uploadedImageUrl = await uploadImageToCloudinary(formData.image);
      // }

      // const submissionData = {
      //   ...formData,
      //   // image: uploadedImageUrl,
      // };
      console.log(formData);
      const response = await axios.post(
        "http://localhost:5000/api/create-replica",
        formData
      );

      if (response.status === 200) {
        alert(response.data.message);
        setFormData({
          name: "",
          age: "",
          email: "",
          description: "",
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
          <label htmlFor="image">Character Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            // required
          />
          {/* {imagePreview && (
            <div className="image-preview-container">
              <img
                src={imagePreview}
                alt="Character Preview"
                className="image-preview"
              />
            </div>
          )} */}
        </div>
        <button type="submit" className="submit-button">
          Create Replica
        </button>
      </form>
    </div>
  );
};

export default CreateReplica;
