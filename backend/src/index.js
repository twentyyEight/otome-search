import app from './app.js'
import { connectDB } from './db.js'
import { downloadTags } from './utils/downloadTags.js'

connectDB()
    .then(() => {
        downloadTags()
    })

app.listen(3000, () => {
    console.log(">>>> Server on port", 3000)
})
