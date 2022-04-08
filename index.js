require("dotenv").config()

const express = require('express')
const morgan = require('morgan')
const helmet = require("helmet");

const mysql = require("mysql2")
global.connection = mysql.createConnection(process.env.DATABASE_URL);

const app = express()
const port = 3000

const usersRoute = require('./routes/users.route')
const postsRoute = require('./routes/posts.route')

app.use(morgan('tiny'))
// app.use(helmet());

app.use(express.json())  // convierte el body (bytes) -> objeto json

app.use("/users", usersRoute)
app.use("/posts", postsRoute)

////////////////////////////////////////////////////////////////////////////////////////////
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");
var { graphqlHTTP } = require("express-graphql");

const { makeExecutableSchema } = require("graphql-tools");

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
});

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log("verificarToken", token);
    next();
}

app.use(
    "/graphql",
    verificarToken,
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
);
////////////////////////////////////////////////////////////////////////////////////////////

app.get('*', (req, res) => {
    res.json({ error: "404" })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
    console.log(`http://localhost:${port}/graphql`)
})
