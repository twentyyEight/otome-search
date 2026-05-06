import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tagsRoutes from './routes/tags.routes.js'
import authRoutes from './routes/auth.routes.js'
import otomeListRoutes from './routes/otomes.list.routes.js'
import characterListRoutes from './routes/characters.list.routes.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/tags', tagsRoutes)
app.use('/api', authRoutes)
app.use('/api/otomes/lists', otomeListRoutes)
app.use('/api/characters/lists', characterListRoutes)

export default app
