const express = require(`express`)
const app = express()

app.use(express.json())

const jenisController = require(`../controllers/jenis_laundry.controller`)
const { auth } = require("../middleware/auth")
app.get("/", jenisController.getAllJenis)
app.get("/:key", jenisController.findJenis)
app.post("/", jenisController.addJenis)
app.put("/:id", jenisController.updateJenis)
app.delete("/:id", jenisController.deleteJenis)
module.exports = app
