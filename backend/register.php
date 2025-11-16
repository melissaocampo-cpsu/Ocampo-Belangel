<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "config.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "No JSON received"
    ]);
    exit();
}

if (empty($data["username"]) || empty($data["email"]) || empty($data["password"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required fields"
    ]);
    exit();
}

$username = trim($data["username"]);
$email = trim($data["email"]);
$password = password_hash($data["password"], PASSWORD_DEFAULT);

// Check if user exists
$stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
$stmt->bind_param("ss", $username, $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Account already exists"]);
    exit();
}

// Insert new user
$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $password);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Registered successfully",
        "user" => [
            "username" => $username,
            "email" => $email
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Database error", "error_detail" => $stmt->error]);
}
?>
