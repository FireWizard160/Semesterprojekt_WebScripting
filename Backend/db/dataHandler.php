<?php
include("../models/appointment.php");
include("../models/timeslot.php");
include("../models/votedTimeslot.php");
include("../db/db_connect.php");

class DataHandler
{
    public function queryData()
    {
        $res = $this->getData();
        return $res;
    }
    public function getData()
    {
        $db = getDBConnection();
        // Datenstruktur initialisieren
        $data = array();

        // Abfrage für Appointments durchführen
        $sql = "SELECT * FROM appointments";
        $result = $db->query($sql);

        // Wenn Appointments gefunden wurden
        if ($result->num_rows > 0) {
            // Schleife durch alle gefundenen Appointments
            while ($row = $result->fetch_assoc()) {
                $appointmentID = $row["appointmentID"];
                $title = $row["title"];
                $location = $row["location"];
                $date = $row["date"];
                $expirydate = $row["expirydate"];


                // Timeslots für dieses Appointment abrufen
                $timeslots = array();
                $sql_timeslots = "SELECT * FROM timeslots WHERE appointmentID = $appointmentID";
                $result_timeslots = $db->query($sql_timeslots);

                if ($result_timeslots->num_rows > 0) {

                    // Schleife durch alle gefundenen Timeslots für dieses Appointment
                    while ($timeslot = $result_timeslots->fetch_assoc()) {
                        $timeslotID = $timeslot["timeslotID"];
                        $starttime = $timeslot["starttime"];
                        $endtime = $timeslot["endtime"];

                        // VotedTimeslots für diesen Timeslot abrufen
                        $votedTimeslots = array();
                        $sql_voted_timeslots = "SELECT * FROM votedtimeslots WHERE timeslotID = $timeslotID";
                        $result_voted_timeslots = $db->query($sql_voted_timeslots);

                        if ($result_voted_timeslots->num_rows > 0) {

                            // Schleife durch alle gefundenen VotedTimeslots für diesen Timeslot
                            while ($votedTimeslot = $result_voted_timeslots->fetch_assoc()) {
                                $votingID = $votedTimeslot["votingID"];
                                $username = $votedTimeslot["username"];
                                $comment = $votedTimeslot["comment"];
                                // VotedTimeslot-Objekt erstellen und zum Array hinzufügen
                                $votedTimeslots[] = new VotedTimeSlot($votingID, $appointmentID, $timeslotID, $username,$comment);
                            }
                        }

                        // Timeslot-Objekt erstellen und VotedTimeslots hinzufügen
                        $timeslots[$timeslotID] = new Timeslot($timeslotID, $appointmentID, $date, $starttime, $endtime);
                        $timeslots[$timeslotID]->votedtimeslots = $votedTimeslots;
                    }
                }

                // Appointment-Objekt erstellen und Timeslots hinzufügen
                $appointment = new Appointment($appointmentID, $title, $location, $date, $expirydate);
                $appointment->timeslots = $timeslots;

                // Appointment zum Data-Array hinzufügen
                $data[$appointmentID] = $appointment;
            }
        }

        return $data;
    }



    public function printData()
         {
        $data = $this->queryData();
        echo "<pre>";
        print_r($data);
        echo "</pre>";
        }




    public function insertAppointment($newAppointment)
    {

    }




}
$dataHandler = new DataHandler();

// Aufruf der printData()-Methode, um die Daten zu drucken
$dataHandler->printData();
?>
