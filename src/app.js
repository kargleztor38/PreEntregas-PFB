import express from "express";
import handlebars from "express-handlebars";
import { createServer } from "http"; // <-- Modulo nativo de node.js para crear servidores con el protocolo http
import { Server } from "socket.io";
import __dirname from "./utils.js";
import dbm from "./Dao/db/indexMongoose.js";
import cookieParser from "cookie-parser"; // <-- Importando cookie-parser
import passport from "passport";
import {
    initPassportJwt,
    initPassportLocal,
} from "./controllers/auth.controllers.js";
import session from "express-session";
import 'dotenv/config'

import indexRouter from "./routes/index.routes.js";
import socketProd from "./listeners/socketProducts.js";
import socketChat from "./listeners/socketChat.js";

const app = express();
const server = createServer(app); // <-- Creando un servidor http con express de argumento necesario para socket.io
const io = new Server(server);
const PORT = process.env.PORT;

app.use(cookieParser()); // <-- Inicializando cookie-parser para poder acceder a sus método en la aplicación

// Código necesarios para el correcto funcionamiento de express
app.use(express.urlencoded({ extended: true })); // <-- Permite manejar a express url complejas
app.use(express.static(__dirname + "/public")); // <-- Archivos estáticos de la carpeta public
app.use(express.json()); // <-- Para que express pueda leer los archivos JSON

// Configurando handlebars
app.engine("handlebars", handlebars.engine()); // <-- Inicializando el motor de handlebars
app.set("view engine", "handlebars"); // <-- Para que el motor lea todos los archivos de la carpeta views
app.set("views", __dirname + "/views"); // <-- Indicando la dirección de la carpeta views

// Configurando la session
app.use(
    session({
        secret: "myApiBack",
        resave: true,
        saveUninitialized: true,
    })
);

// Configuración de passport
app.use(passport.initialize());
initPassportLocal();
initPassportJwt();

app.use(indexRouter);

server.listen(PORT, () => {
    console.log(`Serve OK - ${PORT}`);
    dbm.connect();
    socketProd(io);
    socketChat(io);
});
