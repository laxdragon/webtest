<?php
/*
 * SQLite3 Wrapper Class
 */

class dataDB extends SQLite3
{
    function __construct ($dbFile = "")
    {
        $this->open($dbFile);
    }
}

?>