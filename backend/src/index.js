import app from './app.js'
import { connectDB } from './db.js'
import { getTags } from './getTags.js'

connectDB()
    .then(() => {
        getTags()
    })

app.listen(3000, () => {
    console.log(">>>> Server on port", 3000)
})
