const express = require("express")
const router = express.Router()

const UsersDAO = require("../dao/users.dao")
const udao = new UsersDAO()

router.get("/", async (req, res) => {
    res.json(await udao.all())
})

router.get("/:id", async (req, res) => {
    res.json(await udao.get(req.params.id))
})

router.post("/", async (req, res) => {
    //body previamente verificado
    res.json(await udao.post(req.body))
})

router.put("/:id", async (req, res) => {
    //body pre...
    res.json(await udao.put(req.params.id, req.body))
})

router.delete("/:id", async (req, res) => {
    res.json(await udao.delete(req.params.id))
})

module.exports = router;