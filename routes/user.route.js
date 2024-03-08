const express = require(`express`);
const app = express();

app.use(express.json());

const userController = require(`../controllers/user.controller`);
const { login } = require("../controllers/auth.controller");
const { auth } = require("../middleware/auth");
app.post("/login", login);
app.get("/", auth("owner"), userController.getAllUser);
app.get("/:key", auth("owner"), userController.finduser);
app.post("/", auth("owner"), userController.adduser);
app.put("/:id", auth("owner"), userController.updateuser);
app.delete("/:id", auth("owner"), userController.deleteuser);
module.exports = app;
