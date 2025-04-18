import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import notFound from './app/error/notFound'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import router from './app/router'
const app: Application = express()

// middleware
app.use(express.urlencoded({ extended: true })) // to parse SSLCommerz data
app.use(express.json())
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
)

app.use(cookieParser())
app.use('/api', router)

app.use('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
