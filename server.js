const express = require("express");
const path = require("path");
const session = require("express-session");

const contactRoutes = require("./src/routes/contactRoutes");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "seu-segredo-aqui",
  resave: false,
  saveUninitialized: true
}));

// arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// rotas
app.use("/", contactRoutes);

// 🚫 REMOVA essa linha (duplicada)
// app.use("/contato", contactRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});