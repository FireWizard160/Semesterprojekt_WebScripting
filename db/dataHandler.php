<?php
include("./models/person.php");
class DataHandler
{
    public function queryPersons()
    {
        $res =  $this->getDemoData();
        return $res;
    }

    public function queryPersonById($id)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->id == $id) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    public function queryPersonByLastName($name)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->lastname == $name) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    public function queryPersonByFirstName($name)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->firstname == $name) {
                array_push($result, $val);
            }
        }
        return $result;
    }


    private static function getDemoData()
    {
        $demodata = [
            [new Person(1, "Jane", "Doe", "jane.doe@fhtw.at", 1234567, "Central IT")],
            [new Person(2, "John", "Doe", "john.doe@fhtw.at", 34345654, "Help Desk")],
            [new Person(3, "baby", "Doe", "baby.doe@fhtw.at", 54545455, "Management")],
            [new Person(4, "Mike", "Smith", "mike.smith@fhtw.at", 343477778, "Faculty")],
            [new Person(5, "Emily", "Johnson", "emily.johnson@fhtw.at", 9998888, "Marketing")],
            [new Person(6, "Chris", "Williams", "chris.williams@fhtw.at", 1112222, "Human Resources")],
            [new Person(7, "Anna", "Brown", "anna.brown@fhtw.at", 4445555, "Research & Development")],
            [new Person(8, "Daniel", "Garcia", "daniel.garcia@fhtw.at", 7776666, "Finance")],
            [new Person(9, "Olivia", "Martinez", "olivia.martinez@fhtw.at", 3330000, "Sales")],
            [new Person(10, "William", "Lee", "william.lee@fhtw.at", 2223333, "Customer Support")],
            [new Person(11, "Sophia", "Nguyen", "sophia.nguyen@fhtw.at", 6669999, "Legal")],
            [new Person(12, "Ethan", "Gonzalez", "ethan.gonzalez@fhtw.at", 8881111, "Operations")],
        ];

        return $demodata;
    }
}
