const express = require("express");
const { dbConnection } = require("./db/config");
// Manejar variables de entorno dotenv
require("dotenv").config();
const cors = require("cors");
const auth = require("./routes/auth");
const events = require("./routes/events");

// Creo el servidor
const app = express();

// Habilitar Cors
app.use(cors());

// DB
dbConnection();


//Middleware

// Directorio Publico
// Use es un middleware( Se ejecuta cuando alguien llama al servidor)
app.use(express.static("public"));

// Lectura y parseo de JSON
app.use(express.json());

// Rutas
// TODO: /auth: crear, login, renew token
app.use("/api/auth", auth);
// TODO: /CRUD: Eventos
app.use("/api/events", events)

// Lo hago esuchar en el puerto
app.listen(process.env.PORT || process.env.PORT_PRODUCTION, () => {
  console.log(`Escuchando en puerto ${process.env.PORT || process.env.PORT_PRODUCTION}`);
});
