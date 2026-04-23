const pool = require("../config/db");

async function create({ nome, email, assunto, mensagem }) {
    const [result] = await pool.query(
        "INSERT INTO contatos (nome, email, assunto, mensagem) VALUES (?,?,?,?)",
        [nome, email, assunto, mensagem]
    );
    return result;
}

async function list() {
    const [rows] = await pool.query(
        "SELECT * FROM contatos ORDER BY id DESC"
    );
    return rows;
}

module.exports = { create, list };