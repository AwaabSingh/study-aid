import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import studyRoutes from './routes/studyRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler  }  from './middleware/errorHandler.js'
import connectDB from './config/db.js'
import cors from 'cors'

const app = express();
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(errorHandler)

// db
connectDB();

// Routes 
app.use('/api/studies', studyRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`.bold.yellow))