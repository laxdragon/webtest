<?php

/*
 *  CodeWeavers Web Test (PHP Side)
 */

$dataFile = "data.csv";

header("Content-type: application/x-javascript; charset=UTF-8");

if (empty($_POST) or empty($_POST['mail'])) {
    json_encode("INCOMPLETE");
    exit();
}

$fields = array('fname','lname','email','date');

$row = array();
foreach ($fields as $p) {
    $row[$p] = trim($_POST[$p]);
}

if (!is_writable($dataFile)) {
    trigger_error("FILE_ERROR", E_USER_ERROR);
}

$fh = fopen($dataFile, "w");
fputcsv($fh, $row);
fclose($fh);

echo json_encode("OK");
exit();

?>
