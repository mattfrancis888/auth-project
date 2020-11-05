import express from "express";
import dotenv from "dotenv";
import cors from "cors";

if (process.env.NODE_ENV !== "production") {
    //We don't need dotenv when in production
    dotenv.config();
}

const app = express();
app.use(cors());
const port = 5000;

app.get("/", (req, res) => {
    res.send("hi");
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
