import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth-routes.js'
import todoRoutes from './routes/todo-routes.js'
import authMiddleware from './middleware/auth-middleware.js'

const app = express();
const PORT =  process.env.PORT || 5000;
 
//Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)

//Get the directory name from the file path
const __dirname = dirname(__filename)

app.use(express.json())

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//routes
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})
