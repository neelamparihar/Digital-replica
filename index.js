// const express = require("express");
// const dotenv = require("dotenv");
// const dotenv = require("dotenv";)
// const connectDB = require("./db");
// const { Server } = require("socket.io");
// const userRoutes = require("./routes/auth");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// // Load environment variables from .env file
// require("dotenv").config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Atlas connection string from .env file
// const dbURI = process.env.MONGODB_URI;

// // ROutes
// app.use("/api/auth", authRoutes);

// // Connect to MongoDB Atlas
// mongoose
//   .connect(dbURI)
//   .then(() => console.log("Connected to MongoDB Atlas"))
//   .catch((err) => console.log("MongoDB connection error:", err));

// // Your routes here
// app.post("/api/create-replica", (req, res) => {
//   const { name, age, email, description } = req.body;

//   // Replica schema and model should be defined here
//   const Replica = mongoose.model("Replica", {
//     name: String,
//     age: Number,
//     email: String,
//     description: String,
//   });

//   const newReplica = new Replica({ name, age, email, description });

//   newReplica
//     .save()
//     .then(() => res.json({ message: "Replica created successfully!" }))
//     .catch((err) =>
//       res.status(500).json({ message: "Error saving replica", error: err })
//     );
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
const connectDB = require("./db");

dotenv.config();

// MongoDB connection
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// OpenAI setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Middleware
app.use(express.json());

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("user_message", async (message) => {
    console.log("User message:", message);

    // Get AI response
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo", // or your preferred model
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      });

      const aiMessage = response.data.choices[0].message.content;
      console.log("AI response:", aiMessage);

      // Send AI response back to the user
      socket.emit("ai_response", aiMessage);
    } catch (error) {
      console.error("Error generating AI response:", error.message);
      socket.emit("ai_response", "Sorry, I encountered an issue processing your message.");
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
