const express = require(`express`)
const app = express()

app.use(express.json())

const detailController = require(`../controllers/detail_pesanan.controller`)
app.get("/", detailController.getAllDetail)
app.get("/:key", detailController.findDetail)
app.post("/", detailController.addDetail)
app.put("/:id", detailController.updateDetail)
app.delete("/:id", detailController.deleteDetail)
module.exports = app
