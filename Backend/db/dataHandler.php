<?php
include("../models/appointment.php");
include("../models/timeslot.php");
include("../models/votedTimeslot.php");
include("../db/db_connect.php");

class DataHandler
{
    public function queryData()
    {
        $res =  $this->getData();
        return $res;
    }


    private static function getData()
    {

        $db = getDBConnection();
        $data = array();
        $sql = "SELECT * FROM appointments";
        $result = $db->query($sql);

        // Wenn Termine gefunden wurden
        if ($result->num_rows > 0) {
            // Schleife durch alle gefundenen Termine


            while ($row = $result->fetch_assoc()) {

                $appointmentID = $row["appointmentID"];
                $title = $row["title"];
                $location = $row["location"];
                $date = $row["date"];
                $expirydate = $row["expirydate"];



                $appointments[$appointmentID] = new Appointment($appointmentID, $title, $location, $date, $expirydate);


            }
        }

            $sql = "SELECT * FROM timeslots";
            $result = $db->query($sql);

            // Wenn Termine gefunden wurden
            if ($result->num_rows > 0) {
                // Schleife durch alle gefundenen Termine


                while ($row = $result->fetch_assoc()) {

                    $appointmentID = $row["appointmentID"];
                    $timeslotID = $row["timeslotID"];
                    $date = $row["date"];
                    $starttime = $row["starttime"];
                    $endtime = $row["endtime"];


                    $timeslots[$timeslotID] = new Timeslot($appointmentID, $timeslotID, $date, $starttime, $endtime);


                }
            }

                $sql = "SELECT * FROM votedtimeslots";
                $result = $db->query($sql);

                // Wenn Termine gefunden wurden
                if ($result->num_rows > 0) {
                    // Schleife durch alle gefundenen Termine

                    while ($row = $result->fetch_assoc()) {

                        $votingID = $row["votingID"];
                        $appointmentID = $row["appointmentID"];
                        $timeslotID = $row["timeslotID"];
                        $username = $row["username"];
                        $comment = $row["comment"];


                        $votedtimeslots[$votingID] = new VotedTimeSlot($votingID, $appointmentID, $timeslotID, $username, $comment);

                    }

                }

        // Verschachteln der Arrays
        foreach ($timeslots as $timeslot) {
            $appointmentID = $timeslot->appointmentID;
            if (isset($appointments[$appointmentID])) {
                $appointments[$appointmentID]->addTimeslot($timeslot);
            }
        }

        foreach ($votedtimeslots as $votedtimeslot) {
            $timeslotID = $votedtimeslot->timeslotID;
            if (isset($timeslots[$timeslotID])) {
                $timeslots[$timeslotID]->addVotedTimeslot($votedtimeslot);
            }
        }

        $data['appointments'] = $appointments;


        return $data;
    }
    public function printData()
    {
        $data = $this->queryData();
        echo "<pre>";
        print_r($data);
        echo "</pre>";
    }
}

$dataHandler = new DataHandler();

// Aufruf der printData()-Methode, um die Daten zu drucken
$dataHandler->printData();
?>
