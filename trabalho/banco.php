<?php
// Conexão com o banco
$host = 'localhost';
$dbname = 'formulario_db';
$username = 'alisson';
$password = 'betito'; // ou sua senha

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Pega os dados do formulário
    $nome = $_POST['nome'] ?? '';
    $senha = $_POST['senha'] ?? '';
    $user_id = $_POST['user'] ?? '';
    $comentario = $_POST['comentario'] ?? '';

    // Criptografa a senha
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    // Insere no banco
    $sql = "INSERT INTO dados_formulario (nome, senha, user_id, comentario)
            VALUES (:nome, :senha, :user_id, :comentario)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':nome' => $nome,
        ':senha' => $senha_hash,
        ':user_id' => $user_id,
        ':comentario' => $comentario
    ]);

    echo "Dados salvos com sucesso!";
} catch (PDOException $e) {
    echo "Erro ao conectar com o banco: " . $e->getMessage();
}
?>
<!-- php -S localhost:8000-->
<!-- http://localhost:8000/index.html -->
<!-- http://localhost:8000/banco.php -->