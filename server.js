const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")

// for all requests
app.use(express.json())
app.use(morgan("dev"))

// connect to database
mongoose.connect("mongodb://localhost:27017/bounty-hunter-db", () => console.log("Connected to the database."))

// Routes
app.use("/bounties", require("./routes/bountyRouter.js"))

// Error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// Server listen
app.listen(8001, () => {
    console.log("The server is running on Port 8001")
})