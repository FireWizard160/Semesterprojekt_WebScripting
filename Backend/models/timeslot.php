<?php
class Timeslot
{

    public $timeslotID;

    public $appointmentID;

    public $date;

    public $starttime;

    public $endtime;

    public $votedtimeslots = array();

    function __construct($timeslotID, $appointmentID, $date, $starttime, $endtime, $votedtimeslots = '')
    {

        $this->timeslotID = $timeslotID;
        $this->appointmentID = $appointmentID;
        $this->date = $date;
        $this->starttime = $starttime;
        $this->endtime = $endtime;
        $this->votedtimeslots = $votedtimeslots;
    }

    public function addVotedTimeslot($votedTimeslot) {
        $this->votedTimeslots[] = $votedTimeslot;
    }
}


