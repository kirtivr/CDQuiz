


<?php
$questions = $_POST['data'];
$f = fopen('mock_quiz.json', 'w+');


fwrite($f,$questions);
fclose($f);
?>

