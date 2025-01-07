import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import "./Replica.css";

const Replica = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [replicas, setReplicas] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    fetchReplicas();
    return () => unsubscribe();
  }, []);

  const fetchReplicas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/fetch-replica"
      );
      setReplicas(response.data);
    } catch (error) {
      console.error("Error fetching replicas:", error);
    }
  };

  const handleStaticCardClick = () => {
    if (isLoggedIn) {
      navigate("/CreateReplica");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="replica-container">
      <h1>Your Digital Replicas</h1>
      <p>
        Start your journey to create a personalized AI-powered digital replica.
      </p>

      <div className="replica-cards">
        <div className="replica-card" onClick={handleStaticCardClick}>
          <img src="/replica.jpg" alt="Create Your Digital Replica" />
          <div className="card-content">
            <h3>Create Your Digital Replica</h3>
            <p>Start your journey to create a personalized digital replica.</p>
            <button className="card-button">Get Started</button>
          </div>
        </div>

        {replicas?.map((replica) => (
          <div className="replica-card" key={replica._id}>
            <h3>{replica.name}</h3>
            <p>{replica.description}</p>
            <button
              className="card-button"
              onClick={() => alert("Feature coming soon!")}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Replica;
