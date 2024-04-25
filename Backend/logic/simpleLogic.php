<?php
include("db/dataHandler.php");

class SimpleLogic
{
    private $dh;
    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param)
    {
        switch ($method) {
            case "getAllData":
                $res = $this->dh->queryData();
                break;
                $res = null;
                break;
        }
        return $res;
    }
}
