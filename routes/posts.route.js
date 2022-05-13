const express = require("express")
const router = express.Router()

const PostsDAO = require("../dao/posts.dao")
const pdao = new PostsDAO()

router.get("/", async (req, res, next) => {
    res.json(await pdao.all())
})

router.get("/:id", async (req, res, next) => {
    // SELECT * FROM POSTS WHERE id = 'params.id'
    res.json(await pdao.get(req.params.id))
})

router.post("/", async (req, res, next) => {
    // INSERT INTO POSTS (id, nombre, ...) values (body...)
    // body previamente verificado!!
    res.json(await pdao.post(req.body))
})

router.put("/:id", async (req, res, next) => {
    // UPDATE POSTS SET nombre = ? , edad = ? WHERE id = params.id
    next({ error: "not implemented" })
})

router.delete("/:id", async (req, res, next) => {
    // DELETE FROM POSTS WHERE id = params.id
    await pdao.delete(req.params.id)
    res.status(204).end() //.json(await pdao.delete(req.params.id))
})


module.exports = router;
