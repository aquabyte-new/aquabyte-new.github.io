<?php
$field_name = $_POST['cf_name'];
$field_email = $_POST['cf_email'];
$field_subject = $_POST['cf_subject'];
$field_message = $_POST['cf_message'];

$mail_to = 'bizdev@aquabyte.ai';
$subject = 'Message from'.$field_name;

$body_message = 'From: '.$field_name."\n";
$body_message .= 'E-mail: '.$field_email."\n";
$body_message .= 'subject: '.$field_subject."\n";
$body_message .= 'message: '.$field_message."\n";


$headers = 'From: '.$field_email."\r\n";
$headers .= 'Reply-To: '.$field_email."\r\n";

$mail_status = mail($mail_to, $subject, $body_message, $headers);

if ($mail_status) { ?>
	<script language="javascript" type="text/javascript">
		alert('Thank you for the message. We will be in touch shortly.');
		window.location = '/';
	</script>
<?php
}
else { ?>
	<script language="javascript" type="text/javascript">
		alert('Message failed. Please, send an email to bizdev@aquabyte.ai');
		window.location = '/';
	</script>
<?php
}
?>