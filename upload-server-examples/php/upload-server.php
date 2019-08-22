<?php

class Uploader {

    public $uploadDir;
    public $corsEnabled = true;

    public function __construct($uploadDir, $corsEnabled = true){
        $this->uploadDir = $uploadDir;
        $this->corsEnabled = $corsEnabled;
    }

    public function handleDelete(){
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['my_whatever_key_from_server'])) {
            return null;
        }
        $filename = $data['my_whatever_key_from_server'];
        if (file_exists($this->uploadDir.DIRECTORY_SEPARATOR.$filename)) {
            return unlink($this->uploadDir.DIRECTORY_SEPARATOR.$filename);
        }
        return true;
    }

    public function handleUpload($uploadedFile){
        // $filename = md5(microtime().$uploadedFile['name'].$uploadedFile['tmp_name']); // create a unique name
        $filename = $uploadedFile['name']; // or use the file name from client
        move_uploaded_file($uploadedFile['tmp_name'], $this->uploadDir.DIRECTORY_SEPARATOR.$filename);
        return ['my_whatever_key_from_server' => $filename];
    }

    public function handleRequest(){
        if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
            return $this->handleUpload($_FILES['file']);
        }
        else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
            return ['deleted' => $this->handleDelete()];
        }
        return ['error' => 'Invalid request'];
    }

    public function cors(){
        if(!$this->corsEnabled){
            return;
        }
        header('Access-Control-Allow-Origin: *'); // Enable CORS
        header('Access-Control-Allow-Methods: POST, DELETE, OPTIONS'); // Allow CORS methods
        header('Access-Control-Allow-Headers: accept, content-type, x-test-header'); // Allow CORS methods

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            exit;
        }
    }

    public function handle(){
        $this->cors();
        $response = $this->handleRequest();
        header('Content-Type: application/json');
        echo json_encode($response);
    }

}

$uploader = new Uploader(__DIR__.'/../uploads');
$uploader->handle();