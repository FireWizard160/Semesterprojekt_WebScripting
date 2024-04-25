<?php
class Appointment
{

    public $appointmentID;

    public $title;

    public $location;

    public $date;

    public $expirydate;


    public $timeslots = array();


    function __construct($appointmentID, $title, $location, $date, $expirydate, $comment, $timeslots = '')
    {

        $this->appointmentID = $appointmentID;
        $this->title = $title;
        $this->location = $location;
        $this->date = $date;
        $this->expirydate = $expirydate;

        $this->timeslots[] = $timeslots;
    }

    public function addTimeslot($timeslot) {
        $this->timeslots[] = $timeslot;
    }

}


