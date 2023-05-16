const mongoose = require("mongoose");

const db = process.env.DB;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;
const uri = `mongodb+srv://${username}:${pw}@cluster1331.z3izpy8.mongodb.net/${db}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`🦄🦄🦄 Successful connection to database: ${db}!`))
  .catch((error) =>
    console.log(
      `❌❌❌ Something went wrong while trying to connect to database: ${db}`,
      error
    )
  );
