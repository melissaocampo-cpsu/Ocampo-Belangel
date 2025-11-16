<?php


error_reporting(E_ALL);
ini_set('display_errors', 1);

include "config.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Read input ONCE
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

// Debug if JSON failed
if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid or no JSON received",
        "raw" => $raw
    ]);
    exit();
}

if ((empty($data["email"]) && empty($data["username"])) || empty($data["password"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required fields",
        "received" => $data
    ]);
    exit();
}

$email_or_username = !empty($data["email"]) ? trim($data["email"]) : trim($data["username"]);
$password = $data["password"];

// Query DB
$check = $conn->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
$check->bind_param("ss", $email_or_username, $email_or_username);
$check->execute();
$result = $check->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Account not found"]);
    exit();
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user['password'])) {
    echo json_encode(["status" => "error", "message" => "Incorrect password"]);
    exit();
}

// SUCCESS
echo json_encode([
    "status" => "success",
    "message" => "Login successful",
    "user" => [
        "username" => $user['username'],
        "email" => $user['email']
    ]
]);
