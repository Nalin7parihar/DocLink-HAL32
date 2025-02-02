import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/admin.route.js';
import doctorRouter from './routes/doctor.route.js';
import userRouter from './routes/user.route.js';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 4000; // Make sure to use `process.env.PORT` for flexibility

connectDB();
connectCloudinary();

// Enable CORS only from React's local development server
app.use(cors({
  origin: 'http://localhost:5174',
  methods: ['GET', 'POST'], // Allowing specific methods
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Chatbot POST route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;  // Get the message from request body

    // Check if message is provided
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    // Assuming you have a chatbot API running on port 5001 (or change to whatever backend you're using)
    const response = await axios.post("http://localhost:5000/chat", { message }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Send back the chatbot response to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error calling chatbot:', error.message);
    res.status(500).json({ error: "Chatbot error", message: error.message });
  }
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
