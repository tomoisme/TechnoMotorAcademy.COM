<?php
session_start();
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use Valitron\Validator;

// setting bahasa validasi
Validator::langDir(__DIR__.'/vendor/vlucas/valitron/lang'); // always set langDir before lang.
Validator::lang('id');

// validasi data

$validator = new Validator($_POST);
$validator
    ->rule('required', ['nama', 'nohp'])
    ->rule('lengthMin', 'nohp', 11)
    ->rule('numeric', 'nohp')

if($_SERVER['REQUEST_METHOD'] != 'POST'){
    header('location:./');
    die;
}

if ($validator->validate() != true) {
    $_SESSION['errors'] = $validator->errors();
    header('location:./');
} else {

    // input ke database
    $host = 'mrmontir.com:3306';
    $db = 'technomotoracademy';
    $user = 'mrmontir';
    $pass = 'Tmi123!@#';
    $charset = 'utf8';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
    } catch (\PDOException $e) {
        throw new \PDOException($e->getMessage(), (int) $e->getCode());
    }

    $data = [
        'nama'      => $_POST['nama'],
        'nohp'      => $_POST['nohp'],
        'kelas'     => $_POST['kelas']
    ];
    $sql = "
        INSERT INTO 
            pendaftaran (
                nama, 
                nohp, 
                kelas
            ) 
        VALUES (
            :nama, 
            :nohp, 
            :kelas
        )";
    $input_data = $pdo->prepare($sql);
    $input_data->execute($data);

    // send mail
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = 0; // Enable verbose debug output
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'mail.technomotor.co.id'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'no-reply@technomotoracademy.com'; // SMTP username
        $mail->Password = 'Tmaq1w2e3r4'; // SMTP password
        $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465; // TCP port to connect to

        //Recipients
        $mail->setFrom('no-reply@mrmontir.com', 'Data Form Minat TMA');
        $mail->addAddress('warman@technomotoracademy.com'); // Add a recipient
        $mail->addBCC('christo.tomo@gmail.com', 'Tomo'); // Add a recipient
        // $mail->addReplyTo('tomo@technomotor.co.id', 'Test Form Minat');
        // $mail->addCC('cc@example.com');
        // $mail->addBCC('christo.tomo@gmail.com');

        // Attachments
        // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

        // Content
        $mail->isHTML(true); // Set email format to HTML
        $mail->Subject = 'Notifikasi Calon Siswa Baru';
        $mail->Body ="
                Nama: $_POST[nama] <br><br>
                No HP: $_POST[nohp] <br><br>
                Email: $_POST[kelas] <br>
            ";

        $mail->send();

        $_SESSION['success'] = true;
        header('location:./');
    } catch (Exception $e) {

        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
