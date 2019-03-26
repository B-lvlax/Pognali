<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $host = 'http://' . $_SERVER['HTTP_HOST'];
    $recepient = 'your mail';
    $sender = $_POST['mail'];
    $siteName = '"YourSiteName"';
    $subject = "New request from the site $siteName";
    $headers = 'Content-type: text/html; charset=utf-8' . '\r\n';
    $headers .= 'From: ' . $sender . '\r\n';


    // Generating rows and cells for table in mail fron inputs in markup
    $row = true;
    foreach($_POST as $key => $value) {
      $message .= ''
        . (($row = !$row) ? '<tr>':'<tr style="background-color: #f8f8f8;">').
        '<td style="padding: 10px; border: #e9e9e9 1px solid;"><b>' . $key . '</b></td>
        <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $value . '</td>
      </tr>';
    }

    // Checking if input for adding file is available for adding row in mail table
    $rowFile = "
      <tr>
        <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>file</b></td>
        <td style='padding: 10px; border: #e9e9e9 1px solid;'>" . $_FILES['file']['name'] . "</td>
      </tr>
    ";
    $setFileField = (!empty($_FILES) ? $rowFile : "");

    // Uploading file on server. Don't forget to CREATE FOLDER UPLOADS! And add to form  enctype='multipart/form-data'
    if (isset($_FILES) && $_FILES['file']['error'] == 0) {
      $destiation_dir = dirname(__FILE__) . '/uploads/' . $_FILES['file']['name'];
      move_uploaded_file($_FILES['file']['tmp_name'], $destiation_dir);
    }

    // Assembling all parts for sending message
    $message = "
      <html>
        <head> <title>$subject</title> </head>
        <body>
          <table style='width: 100%; max-width: 768px; margin: 0 auto; border-collapse: collapse; font-size: 16px;'>
            <tr>
              <th colspan='2' style='padding: 16px; border: #e9e9e9 1px solid; font-size: 22px; text-align: center; background-color: #282E34; color: #ddd;'>$subject</th>
            </tr>
            $setFileField
            $message
          </table>
        </body>
      </html>
    ";


    $sendMail = mail($recepient, $subject, $message, $headers);

    if ($sendMail == 'true') {
      http_response_code(200);
      echo 'The data has been successfully sent!';
    } else {
      http_response_code(500);
      echo 'Unfortunately, the data has been not sent.';
    }

  } else {
    http_response_code(403);
    echo 'Something went wrong... Try again.';
  }

?>
