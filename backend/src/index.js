const express = require("express");
const cors = require("cors");
const { port } = require("./config");
const { connection } = require("./config/db");

// Importanto routes
const users = require("./routes/users");
const auth = require("./routes/auth");
const offers = require("./routes/offers");

connection();

const app = express();

app.use(cors({
  origin: ["http://127.0.0.1:5500"]
}));
// Middleware de JSON
app.use(express.json());

// Usando routes
users(app);
auth(app);
offers(app);

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});
