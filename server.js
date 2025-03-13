const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Criar pool de conexões MySQL
const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "stacasa1133",
    database: "gerenciador_os"
});

// Testar conexão com o banco de dados
app.get("/", (req, res) => {
    db.query("SELECT 1", (err) => {
        if (err) {
            console.error("Erro na conexão com o MySQL:", err);
            return res.status(500).send("Erro ao conectar ao banco de dados.");
        }
        res.send("Conexão com o banco de dados bem-sucedida!");
    });
});

// 🔹 Rota para adicionar uma nova OS
app.post("/os", (req, res) => {
    const { numero_os, local, servico, data, situacao } = req.body;

    if (!numero_os || !local || !servico || !data || !situacao) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    const sql = "INSERT INTO ordensServico (numero_os, local, servico, data, situacao) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [numero_os, local, servico, data, situacao], (err, result) => {
        if (err) {
            console.error("Erro ao adicionar OS:", err);
            return res.status(500).json({ erro: "Erro ao adicionar OS." });
        }
        res.status(201).json({ mensagem: "OS adicionada com sucesso!", id: result.insertId });
    });
});

// 🔹 Rota para obter todas as OSs
app.get("/os", (req, res) => {
    const sql = "SELECT * FROM ordensServico";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao buscar OS:", err);
            return res.status(500).json({ erro: "Erro ao buscar OS." });
        }
        res.json(results);
    });
});

// 🔹 Rota para excluir uma OS
app.delete("/os/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM ordensServico WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erro ao excluir OS:", err);
            return res.status(500).json({ erro: "Erro ao excluir OS." });
        }
        res.json({ mensagem: "OS removida com sucesso!" });
    });
});

// 🔹 Rota para atualizar uma OS
app.put("/os/:id", (req, res) => {
    const { id } = req.params;
    const { numero_os, local, servico, data, situacao } = req.body;

    if (!numero_os || !local || !servico || !data || !situacao) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    const sql = "UPDATE ordensServico SET numero_os = ?, local = ?, servico = ?, data = ?, situacao = ? WHERE id = ?";
    db.query(sql, [numero_os, local, servico, data, situacao, id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar OS:", err);
            return res.status(500).json({ erro: "Erro ao atualizar OS." });
        }
        res.json({ mensagem: "OS atualizada com sucesso!" });
    });
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
});
