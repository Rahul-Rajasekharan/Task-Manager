// Import required modules
import express, { json } from 'express';
import cors from 'cors';
import {connectDB} from './db/connection.js';
import router from './routes/usertask.js'
// Create an instance of Express app
const app = express();

// Middleware for JSON parsing
app.use(json());

// Middleware for CORS
app.use(cors());

connectDB(); // Call the function to establish the database connection

// all routes-api end points
app.use('/create-task',router)
app.use('/get-tasks',router)
app.use('/update-task',router)
app.use('/edited-task',router)
app.use('/delete-task',router)

// app.get('/', (req, res) => {
//   res.send('Server is up and running!');
// });

// Start the server
const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

