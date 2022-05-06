require("dotenv").config()

// nos traemos http del core de node.
const http = require("http")

const express = require('express')
const morgan = require('morgan')
const helmet = require("helmet")

const mysql = require("mysql2")
global.connection = mysql.createConnection(process.env.DATABASE_URL);

//Creamos un servidor express
const app = express()
const port = 3000

// creamos un servidor http y asignamos express
const server = http.createServer(app)

// Creamos un servidor socket io y lo asignamos a http
const { Server } = require("socket.io")
const io = new Server(server)

app.use(express.static('public'))

const usersRoute = require('./routes/users.route')
const postsRoute = require('./routes/posts.route')

app.use(morgan('tiny'))
app.use(helmet());

app.use(express.json())  // convierte el body (bytes) -> objeto json

app.use("/users", usersRoute)
app.use("/posts", postsRoute)

app.get('*', (req, res) => {
    res.json({ error: "404" })
})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    }
    )
});

// app.listen(port, () => {
//     console.log(`http://localhost:${port}`)
//     console.log(`http://localhost:${port}/graphql`)
// })

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
    console.log(`http://localhost:${port}/users`)
})
