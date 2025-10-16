import express from 'express'
import cors from 'cors'
import db from './db.js'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/contact', (req, res) => {
  const { firstname, lastname, email, phone, service, message } = req.body

  const sql = `
    INSERT INTO contacts (firstname, lastname, email, phone, service, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `

  db.query(
    sql,
    [firstname, lastname, email, phone, service, message],
    (err, result) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ success: false, message: 'Failed to save contact' })
      }
      res.json({ success: true, message: 'Message sent successfully' })
    }
  )
})

const PORT = 5000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
