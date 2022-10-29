require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const cookieparser = require("cookie-parser");
const { get } = require("http");
const cors = require("cors");
const axios = require("axios");
const connection = require("./db/mysql");

app.use("/", express.static(path.join(__dirname, "../public")));

app.use(cookieparser());

app.use(express.urlencoded({ extended: false }));

console.log(__dirname);

app.set("view engine", "hbs");

app.use("/", require("../server/routes/pages"));
app.use("/auth", require("../server/routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`server started @ ${process.env.PORT} port`);
});

//others app.js
app.use(cors());
app.use(express.json());
app.use("/", require("./middleware/logger"));
app.use("/booking", require("./routes/api/booking"));
app.use("/checkin", require("./routes/api/checkin"));
app.use("/wings", require("./routes/api/wings"));
app.use("/availability", require("./routes/api/availability"));
