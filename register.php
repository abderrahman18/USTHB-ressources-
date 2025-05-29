<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database Configuration
$db_config = [
    'host'     => '192.168.100.2',
    'port'     => '5432',
    'dbname'   => 'postgres',
    'user'     => 'postgres',
    'password' => 'USTHB'
];

// Connection function with error handling
function connect_db($config) {
    $conn_string = sprintf(
        "host=%s port=%s dbname=%s user=%s password=%s",
        $config['host'],
        $config['port'],
        $config['dbname'],
        $config['user'],
        $config['password']
    );
    
    $conn = pg_connect($conn_string);
    
    if (!$conn) {
        $error = pg_last_error();
        error_log("PostgreSQL connection failed: " . $error);
        die(json_encode([
            'status' => 'error',
            'message' => 'Database connection failed',
            'error' => $error
        ]));
    }
    
    return $conn;
}

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('HTTP/1.1 405 Method Not Allowed');
    die(json_encode([
        'status' => 'error',
        'message' => 'Only POST method is allowed'
    ]));
}

// Get and sanitize inputs
$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$password_raw = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

// Validate inputs
if (empty($username) || empty($email) || empty($password_raw)) {
    die(json_encode([
        'status' => 'error',
        'message' => 'All fields are required'
    ]));
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die(json_encode([
        'status' => 'error',
        'message' => 'Invalid email format'
    ]));
}

try {
    // Connect to database
    $conn = connect_db($db_config);
    
    // Hash password
    $password_hash = password_hash($password_raw, PASSWORD_DEFAULT);
    
    // Check if user already exists
    $check_query = "SELECT 1 FROM users WHERE username = $1 OR email = $2";
    $check_result = pg_query_params($conn, $check_query, [$username, $email]);
    
    if (pg_num_rows($check_result) > 0) {
        die(json_encode([
            'status' => 'error',
            'message' => 'Username or email already exists'
        ]));
    }
    
    // Insert new user
    $insert_query = "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)";
    $insert_result = pg_query_params($conn, $insert_query, [$username, $email, $password_hash]);
    
    if ($insert_result) {
        echo json_encode([
            'status' => 'success',
            'message' => 'User registered successfully!'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Registration failed',
            'error' => pg_last_error($conn)
        ]);
    }
} catch (Exception $e) {
    error_log("Registration error: " . $e->getMessage());
    die(json_encode([
        'status' => 'error',
        'message' => 'An unexpected error occurred'
    ]));
} finally {
    if (isset($conn)) {
        pg_close($conn);
    }
}
?>