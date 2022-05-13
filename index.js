require("dotenv").config()


const express = require('express')
const morgan = require('morgan')
const helmet = require("helmet")

const mysql = require("mysql2")
global.connection = mysql.createConnection(process.env.DATABASE_URL);

const app = express()
const port = 3000

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', async (socket) => {
    console.log('a user connected');

    const PostsDAO = require("./dao/posts.dao")
    const pdao = new PostsDAO()

    const posts = await pdao.all()
    socket.emit("posts" , posts )

    socket.on('insert post', async (data) => {
        // can i insert a post?
        // does data have all the fields?
        const postInserted = await pdao.post(data)
        // socket.broadcast.emit('new post' , postInserted)
        io.emit('new post' , postInserted)
    })

    socket.on('delete post' , async (data) => {
        // can i delete this post?
        const postDeleted = await pdao.delete(data.id)
        // if all went well then we can send the id of the deleted post:
        io.emit('deleted post' , { id: data.id })  
    })

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

const usersRoute = require('./routes/users.route')
const postsRoute = require('./routes/posts.route')

app.use(express.static("public"))

app.use(morgan('tiny'))
// app.use(helmet());

app.use(express.json())  // convierte el body (bytes) -> objeto json

app.use("/users", usersRoute)
app.use("/posts", postsRoute)

app.get('*', (req, res) => {
    res.json({ error: "404" })
})

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
    console.log(`http://localhost:${port}/users`)
})
