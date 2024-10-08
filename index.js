const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
const chalk = require("chalk");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/admin.html");
})

io.on("connection", (socket) => {
    socket.on("setWord", word => {
        io.emit("word", word)
    })
    socket.on("setName", name => {
        io.emit("name", name);
    })
    socket.on("wordSubmission", data => {
        console.log("word has been submitted")
        io.emit("wordSubmissionAdmin", data)
    })
})

server.listen(3000, () => {
    console.log(chalk.bgGreen("Server is up and running!"));
})