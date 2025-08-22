import cors from "cors"
import express from "express"
import dotenv from "dotenv";
import router from "./src/routes/router.js";

dotenv.config();

const PORT = process.env.APP_PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`[+] server running at http://localhost:${PORT}`);
})