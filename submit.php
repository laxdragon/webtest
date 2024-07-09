<?php

/*
 *  CodeWeavers Web Test (PHP Side)
 */

define("DBFILE", "data/data.db");
require("include/db.php");
$db = new dataDB(DBFILE);

header("Content-type: application/x-javascript; charset=UTF-8");

if (empty($_POST) or empty($_POST['mail'])) {
    echo json_encode("INCOMPLETE");
    exit();
}

$fields = array('fname','lname','email','rdate');

$row = array();
foreach ($fields as $p) {
    $row[$p] = trim($_POST[$p]);
}

try {

    $r = $db->querySingle('SELECT id FROM users WHERE email = "{$row[email]}"');
    if ($r->id)
        throw new Exception('EMAIL_EXISTS');

    $db->exec("INSERT INTO users VALUES(0,'".implode("','",$row)."')");
    if ($db->lastErrorCode())
        throw new Exception($db->lastErrorMsg());
    if (!$db->lastInsertRowID())
        throw new Exception('DB_ERROR');

} catch (Exception $e) {
    echo json_encode($e->getMessage());
    exit();
}

echo json_encode("OK");
exit();

?>
