import express from 'express'
import { readdirSync } from 'fs'
import mongoose from 'mongoose'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 8000
const csrfProtection = csrf({ cookie: true })
require('dotenv').config()

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => app.listen(port, () => console.log(`Server is running on port ${port}`)))
  .catch((err) => console.log('db connection error => ', err))

// app.options('*', cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }))

// app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))

app.use(csrfProtection)

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})
