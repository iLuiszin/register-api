import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config'
import { errorHandler } from './middlewares/error-handler';


// Import Routes
import RegisterRoutes from './routes/RegisterRoutes'

const app: Express = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(errorHandler)

// Routes
app.use('/register', RegisterRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})