import cors from "cors"
import express from "express"
import dotenv from "dotenv";
import router from "./src/routes/router.js";
import sessionSetup from "./src/utils/sessionSetup.js";
import { applyAuth } from "./src/middlewares/authenticationMiddleware.js";
import globalResponseHandler from "./src/middlewares/globalResponseHandler.js";


dotenv.config();

const PORT = process.env.APP_PORT || 3000

const app = express()

app.use(sessionSetup)


// CORS setup
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}))

app.use(express.json())

// Middlewares
app.use(globalResponseHandler) // global response helper
app.use(applyAuth) // Global authentication middleware

app.use(router) // APP Routes

app.listen(PORT, () => {
    console.log(`[+] server running at http://localhost:${PORT}`);
})