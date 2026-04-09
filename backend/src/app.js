import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import tagsRoutes from './routes/tag.routes.js'
import traitsRoutes from './routes/trait.routes.js'
import devsRoutes from './routes/dev.routes.js'
import charactersRoutes from './routes/lists/character.routes.js'
import otomesRoutes from './routes/lists/otome.routes.js'
import statesRoutes from './routes/lists/state.routes.js'

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
app.use('/api', otomesRoutes)
app.use('/api', statesRoutes)

export default app