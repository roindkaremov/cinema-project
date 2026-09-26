import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/api/ping', (req, res) => {
  res.json({ok: true})
})

export default app