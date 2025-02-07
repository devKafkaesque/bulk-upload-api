import express from 'express'
import dotenv from 'dotenv'
import router from './src/routes/upload.route.js'
import connectDB from './src/config/db.js'
import fs from 'fs';

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create 'uploads' folder if it doesn't exist
}
dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  connectDB()
})
