const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const path = require("path");
const nodemailer = require("nodemailer");
const Contact = require("../models/contactModel"); // model único

// ================== RENDERIZA PÁGINA CONTATO ==================
exports.index = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
};

// ================== ENVIA CONTATO ==================
exports.send = async (req, res) => {
    console.log("CHEGOU NA ROTA");
    console.log(req.body);

    const { nome, email, assunto, mensagem } = req.body;

    if (!nome || !email || !mensagem || !assunto) {
        return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    try {
        // ✅ salva no banco primeiro
        await Contact.create({ nome, email, mensagem });

        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com", // 🔥 volta pro domínio
                port: 587,
                secure: false,
                auth: {
                    user: "Seu_email.com",
                    pass: "Sau_senha" // 🔥 senha de app (NÃO use a senha real),
                },
                tls: {
                    rejectUnauthorized: false // 🔥 IGNORA certificado
                }
            });

            await transporter.sendMail({
                to: "Seu_email.com",
                from: 'Seu_email.com',
                replyTo: email,
                subject: `[Contato] ${assunto}`,
                html: `
                    <h3>Novo contato</h3>
                    <p><b>Nome:</b> ${nome}</p>
                    <p><b>Email:</b> ${email}</p>
                    <p><b>Mensagem:</b></p>
                    <p>${mensagem}</p>
                `
            });

            console.log("Email enviado");

        } catch (emailError) {
            console.error("Erro no email:", emailError);
            // 👇 NÃO quebra o sistema
        }

        // ✅ sempre retorna sucesso
        res.json({ success: true });

    } catch (err) {
        console.error("Erro geral:", err);
        res.status(500).json({ error: "Erro ao salvar contato." });
    }
};
// ================== LISTAR CONTATOS (ADMIN) ==================
exports.list = async (req, res) => {
    try {
        const contatos = await Contact.list();
        res.json(contatos);
    } catch (err) {
        console.error("Erro ao listar contatos:", err);
        res.status(500).json({ error: "Erro ao listar contatos" });
    }
};
