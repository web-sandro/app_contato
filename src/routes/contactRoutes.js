// src/routes/contactRoutes.js
const express = require("express");
const path = require("path");
const router = express.Router();

const ContactController = require("../controllers/contactController");

// ================= PÚBLICO =================

// 🔥 Página inicial
router.get("/", ContactController.index);

// 🔥 Carregar HTML do contato (ESSENCIAL pro botão funcionar)
router.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/contato.html"));
});

// 🔥 Envio do formulário
router.post("/contato", ContactController.send);

module.exports = router;