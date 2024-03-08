const express = require(`express`)
const app = express()

app.use(express.json())

const pesananController = require(`../controllers/pesanan.controller`)
app.get("/", pesananController.getAllPesanan)
app.get("/:key", pesananController.findPesanan)
app.post("/", pesananController.addPesanan)
app.put("/updateStatus", pesananController.updateStatus)
app.put("/updatePayment", pesananController.updatePayment)
app.put("/:id", pesananController.updatePesanan)
app.delete("/:id", pesananController.deletePesanan)
module.exports = app
