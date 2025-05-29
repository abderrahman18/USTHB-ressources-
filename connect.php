<?php
$host = "192.168.100.2";
$dbname = "postgres";
$user = "postgres";
$password = "USTHB; // <- use the one you chose when installing

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

$username = $_POST['username'] ?? '';
echo "Hello, $username!";
pg_close($conn);

?>
