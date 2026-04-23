let contatosGlobais = [];

const btn = document.getElementById("toggleContato");
const modal = document.getElementById("modalContato");

const form = document.getElementById("contactForm");
const alertBox = document.getElementById("alertMessage");

function mostrarVisitante() {
    console.log("Visitante");
}

document.addEventListener("DOMContentLoaded", async () => {

    /* =========================
       ELEMENTOS (🔥 FALTAVA ISSO)
    ========================== */
    const btn = document.getElementById("openContact");
    const modal = document.getElementById("contactContainer");
    const form = document.getElementById("contactForm");
    const alertBox = document.getElementById("alertBox");

    /* =========================
       MENU ATIVO
    ========================== */
    const links = document.querySelectorAll(".menu a");

    if (links.length) {
        let currentPath = window.location.pathname;

        if (currentPath.length > 1) {
            currentPath = currentPath.replace(/\/$/, "");
        }

        links.forEach(link => {
            let linkPath = link.getAttribute("href");

            if (linkPath.length > 1) {
                linkPath = linkPath.replace(/\/$/, "");
            }

            if (linkPath === currentPath) {
                link.classList.add("active");
            }

            link.addEventListener("click", function () {
                links.forEach(l => l.classList.remove("active"));
                this.classList.add("active");
            });
        });
    }

    /* =========================
       BOTÃO CONTATO (CARREGAR + ABRIR)
    ========================== */
    if (btn && modal) {
        let aberto = false;

        btn.addEventListener("click", async () => {
            aberto = !aberto;

            if (aberto) {
                try {
                    const res = await fetch("/contato");
                    const html = await res.text();

                    modal.innerHTML = html;
                    modal.style.display = "block";
                    modal.classList.add("ativo");

                    btn.textContent = "Fechar Contato";

                } catch (err) {
                    console.error("Erro ao carregar contato:", err);
                }
            } else {
                modal.classList.remove("ativo");
                modal.style.display = "none";
                modal.innerHTML = "";

                btn.textContent = "Contato";
            }
        });
    }

    /* =========================
       FORM CONTATO (DEPOIS QUE CARREGA)
    ========================== */
    document.addEventListener("submit", async (e) => {
        if (e.target && e.target.id === "contactForm") {
            e.preventDefault();

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
                const res = await fetch("/contato", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                if (!res.ok) throw new Error("Erro ao enviar");

                alert("Mensagem enviada com sucesso!");
                e.target.reset();

            } catch (err) {
                console.error("Erro no envio:", err);
                alert("Erro ao enviar mensagem.");
            }
        }
    });

    /* =========================
       CARREGAMENTOS OPCIONAIS
    ========================== */
    if (document.getElementById("contactsBody")) {
        await loadContatos();
    }

    if (document.querySelector("#contactsTable tbody")) {
        await loadContacts();
    }

    if (document.getElementById("clientesBody")) {
        await loadClientes();
    }

});