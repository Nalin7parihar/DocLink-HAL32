import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/admin.route.js';
import doctorRouter from './routes/doctor.route.js';
import userRouter from './routes/user.route.js';

const app = express();
const port = process.env.port || 4000
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());


app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req,res) => {
  res.send('API WORKING')
})

app.post("/chat", async (req, res) => {
  try {
      const { message } = req.body;
      const response = await axios.post("http://localhost:8501", { message });
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: "Chatbot error" });
  }
});

app.listen(port, () => console.log("Server Started",port))