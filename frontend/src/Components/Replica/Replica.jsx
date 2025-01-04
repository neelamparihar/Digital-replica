import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { auth } from "../../firebase"; // Import Firebase authentication
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase auth state listener
import "./Replica.css";

const Replica = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    // Check the user's login status when the component mounts
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const cardData = {
    title: "Create Your Digital Replica",
    image: "/replica.jpg",
    link: "#", // This will be replaced with navigation logic
  };

  // Function to handle card click and navigate to another route
  const handleCardClick = () => {
    if (isLoggedIn) {
      navigate("/CreateReplica"); // Navigate to the CreateReplica route if logged in
    } else {
      navigate("/auth"); // Redirect to the auth page if not logged in
    }
  };

  return (
    <div className="replica-container">
      <h1>Create Your Digital Replica</h1>
      <p>
        Start your journey to create a personalized AI-powered digital replica.
      </p>
      <div className="replica-cards">
        <div className="replica-card" onClick={handleCardClick}>
          <img src={cardData.image} alt={cardData.title} />
          <div className="card-content">
            <h3>{cardData.title}</h3>
            <p>{cardData.description}</p>
            <button className="card-button">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Replica;
