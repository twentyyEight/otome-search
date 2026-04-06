import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import tagsRoutes from './routes/tags.routes.js'
import traitsRoutes from './routes/traits.routes.js'
import devsRoutes from './routes/devs.routes.js'
import charactersRoutes from './routes/lists/characters.routes.js'
import otomesListsRoutes from './routes/lists/otomes.routes.js'
import statesRoutes from './routes/lists/states.routes.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', tagsRoutes)
app.use('/api', traitsRoutes)
app.use('/api', devsRoutes)
app.use('/api', charactersRoutes)
app.use('/api', otomesListsRoutes)
app.use('/api', statesRoutes)

export default app