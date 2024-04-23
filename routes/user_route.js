const express = require(`express`);
const app = express();

app.use(express.json());

const userController = require(`../controllers/user_controller`);
const { login } = require("../controllers/auth_controller");
const { auth } = require("../middleware/auth");

app.post("/login", login);

// app.use(auth("owner"));
app.get("/", userController.getAllUser);
app.get("/:key", userController.finduser);
app.post("/", userController.adduser);
app.put("/:id", userController.updateuser);
app.delete("/:id", userController.deleteuser);
app.put("/reset/:id", userController.resetPassword)
module.exports = app;
