import express, {json, urlencoded, Request, Response, NextFunction  } from "express"
import cors from 'cors'
import { CustomError, errorHandler } from "./middlewares/errorHandler"
import { ConnectDB } from "./config/db"
import { envConfig } from "./config/env"
import { reservationRouter } from "./routes/reservation.route"
import { tableRouter } from "./routes/table.route"

const app = express()

/**
 * Server configuration
 */
app.use(express.json())
app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())

/**
 * Routes
 */
app.use("/api/reservation", reservationRouter)
app.use("/api/table", tableRouter)

/**
 * Middlewares
 */
app.use(
  (err: CustomError, req: Request, res: Response, _next: NextFunction) => {
    errorHandler(err, req, res)
  }
)

/**
 * Database init
 */
ConnectDB().then(() => {
   app.listen(envConfig.port, () => {
   console.log(`🚀🚀 Server running on port: ${envConfig.port} 🚀🚀`);
  })
})