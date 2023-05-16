const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

const cors = require("cors");

require("./config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }), cors());

require("./routes/author.routes")(app);

app.listen(PORT, () => console.log(`❕❕❕ Now listening on port: ${PORT}.`));
