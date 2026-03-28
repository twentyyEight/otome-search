import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import collectionRoutes from './routes/collection.routes.js'
import tagsRoutes from './routes/tags.routes.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', collectionRoutes)
app.use('/api', tagsRoutes)

export default app