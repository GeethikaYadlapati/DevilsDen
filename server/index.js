// Express allows use to create routes for our application
import express from 'express';
// Dotenv allows us to interact with environment variables
import * as dotenv from 'dotenv'
// Import Cors for cross origin requests
import cors from 'cors';
// Import internal function connectDB 
import connectDB from './mongodb/connect.js';
// Import Routes
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import verifyToken  from './middleware/auth.js';
// Initialize dotenv
dotenv.config();
// Initialize app using express
const app = express();
// Add the cors middleware to the appv
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Add userRouter and verifyToken middleware to the app
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', verifyToken, userRouter)
// Add a limit of 50mb of files uploaded from the frontend
app.use(express.json({ limit : '50mb' }));
// Create an API endpoint for '/'
app.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
})
// Function to start the server
const startServer = async() => {
  try {
    // Connect to DB
    // Use the environment variable to get the URL for the DB server
    connectDB(process.env.MONGODB_URL)

    app.listen(8080, () => console.log('Server started on port http://localhost:8080'))
  } catch(error) {
    console.log(error);
  }
}

startServer();
