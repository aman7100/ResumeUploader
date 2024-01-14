import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.js'
import upload from './middleware/upload-middleware.js'
import candidateRoutes from './routes/candidaeRoutes.js'
const app=express()
const port=process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL
app.use(cors())
connectDB(DATABASE_URL)
app.use(express.static('public/uploads/pimage'))
app.use(express.json())
app.use('/api',candidateRoutes)

app.listen(port,()=>{
    console.log(`Server listening at http://127.0.0.1:${port}`)

})