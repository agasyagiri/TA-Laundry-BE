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
app.use(express.static(__dirname))

const userRoute = require(`./routes/user_route`);
const jenisRoute = require(`./routes/jenis_laundry_route`);
const pesananRoute = require(`./routes/pesanan_route`);
const detailRoute = require(`./routes/detail_pesanan_route`);

app.use(`/user`, userRoute);
app.use(auth("owner", "kasir"))
app.use(`/jenis`, jenisRoute);
app.use(`/pesanan`, pesananRoute);
app.use(`/detail`, detailRoute);

app.listen(3000, () => {
  console.log("SERVER LISTEN ON PORT 3000");
});
