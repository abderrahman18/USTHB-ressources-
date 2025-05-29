<?php
// Connection
$host = "192.168.100.2";
$dbname = "postgres";
$user = "postgres";
$password = "USTHB";

$conn = pg_connect("
    host=192.168.100.2
    port=5432 
    dbname=postgres 
    user=postgres 
    password=USTHB
");

if (!$conn) {
    die("Connection failed: " . pg_last_error());
}

// Get inputs safely
$username = $_POST['username'] ?? '';
$email = $_POST['email'] ?? '';
$password_raw = $_POST['password'] ?? '';

// Validate
if ($username && $email && $password_raw) {
    // Hash password
    $password_hash = password_hash($password_raw, PASSWORD_DEFAULT);

    // Insert
    $query = "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)";
    $result = pg_query_params($conn, $query, array($username, $email, $password_hash));

    if ($result) {
        echo " User registered successfully!";
    } else {
        echo " Error: " . pg_last_error($conn);
    }
} else {
    echo " All fields are required.";
}

pg_close($conn);
?>
