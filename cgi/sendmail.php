<?php
/**
 * @package     aboutme
 *
 * @copyright   Copyright (C) 2016 Christian Paffhausen. All rights reserved.
 * @license     GNU General Public License version 3
 */

    $name       = $_POST["name"];
    $mail       = $_POST["mail"];
    $message    = $_POST["message"];

    $to         = 'c.paffhausen@gmx.de';
    $subject    = 'Mail from: ' . $name . ', by thepaffy.de';
    $message    = $_POST["message"];
    $headers    = 'From: ' . $mail . "\r\n" .
        'Reply-To: ' . $mail . "\r\n" .
        "Content-Type: text/plain; charset=\"utf-8\"" . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    $success    = mail($to, $subject, $message, $headers);

    echo "{ \"success\": " . ($success ? "true" : "false") . " }";
?>
