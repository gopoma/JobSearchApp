const express = require("express");
const { port } = require("./config");
const { connection } = require("./config/db");

// Importanto routes
const users = require("./routes/users");
const auth = require("./routes/auth");

connection();

const app = express();

// Middleware de JSON
app.use(express.json());

// Usando routes
users(app);
auth(app);

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});
