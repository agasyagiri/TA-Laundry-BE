require("dotenv").config(".env");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const userRoute = require(`./routes/user.route`);
app.use(`/user`, userRoute);

app.use(auth("owner", "admin"));
const jenisRoute = require(`./routes/jenis_laundry.route`);
app.use(`/jenis`, jenisRoute);

const pesananRoute = require(`./routes/pesanan.route`);
app.use(`/pesanan`, pesananRoute);

const detailRoute = require(`./routes/detail_pesanan.route`);
app.use(`/detail`, detailRoute);

app.listen(3000, () => {
  console.log("SERVER LISTEN ON PORT 3000");
});
