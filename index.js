const express = require("express");
const cors = require("cors");
const dbConnect = require("./src/config/dbConnect");
// Routers 
const userRouter = require('./src/features/users/user.router.js');
const contentRouter = require("./src/external-adapters/content-submission.js");
const { PORT } = require("./connection.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/content", contentRouter);

app.get("/", async (req, res) => {
    res.send('Backend is running successfully!')
})

// listen
dbConnect().then(() => {
    app.listen(PORT, async () => {
        // feedback: fw16_644 - you can connect db at the top or before calling cors or other configuration
        console.log(`Listening on port: http://localhost:${PORT}`);
    })
})