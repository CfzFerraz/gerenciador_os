use gerenciador_os; 

CREATE TABLE if not exists ordensServico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_os VARCHAR(10),
    local VARCHAR(50),
    servico VARCHAR(50),
    data VARCHAR(20),
    situacao VARCHAR(50)
);

INSERT INTO ordensServico (numero_os, local, servico,data, situacao) 
VALUES ('2116', 'Adm - T.I', 'Testando banco', '12/032025 08:49', 'Testando banco');
SELECT * FROM ordensServico;
