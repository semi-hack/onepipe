import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import router from './router.js'

dotenv.config();
const PORT = process.env.PORT || 4440

const app = express();
app.set("view engine","ejs");
// app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(router)

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})

export default  server
