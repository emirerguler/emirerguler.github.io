<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Form verilerini al
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $subject = trim($_POST['subject']);
    $message = trim($_POST['message']);

    // Doğrulama
    if ($name === '' || strlen($name) < 2) {
        echo json_encode(['status' => 'error', 'message' => 'Ad en az 2 karakter olmalıdır.']);
        exit;
    }

    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Geçerli bir e-posta adresi girin.']);
        exit;
    }

    if ($subject === '' || strlen($subject) < 3) {
        echo json_encode(['status' => 'error', 'message' => 'Konu en az 3 karakter olmalıdır.']);
        exit;
    }

    if ($message === '' || strlen($message) < 10) {
        echo json_encode(['status' => 'error', 'message' => 'Mesaj en az 10 karakter olmalıdır.']);
        exit;
    }

    // E-posta gönderimi
    $to = 'mberkyaren@gmail.com'; // Alıcı e-posta adresi
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $email_body = "Ad: $name\n";
    $email_body .= "E-posta: $email\n";
    $email_body .= "Konu: $subject\n";
    $email_body .= "Mesaj:\n$message\n";

    // E-posta gönder
    if (mail($to, $subject, $email_body, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Mesajınız başarıyla gönderildi!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Mesaj gönderilirken bir hata oluştu.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Geçersiz istek.']);
}
?>