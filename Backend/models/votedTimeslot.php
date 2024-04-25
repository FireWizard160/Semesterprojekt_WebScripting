<?php
class VotedTimeSlot
{

    public $votingID;

    public $appointmentID;

    public $timeslotID;

    public $username;

    public $comment;


    function __construct($votingID, $appointmentID, $timeslotID, $username, $comment)
    {

        $this->votingID = $votingID;
        $this->appointmentID = $appointmentID;
        $this->timeslotID = $timeslotID;
        $this->username = $username;
        $this->comment = $comment;

    }

}



