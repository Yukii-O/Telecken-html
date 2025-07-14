CREATE DATABASE formulario_db;
USE formulario_db;

CREATE TABLE dados_formulario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    senha VARCHAR(255),
    user_id INT,
    comentario TEXT,
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP
);
