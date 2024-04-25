$.ajax({
    type: "GET",
    url: "../serviceHandler.php",
    cache: false,
    data: {method: "queryPersonByName", param: "searchterm"},
    dataType: "json",
    success: function (response) {
        console.log(response)
    }
});

function createAppointmentElement(appointmentData: any) {
    let card = $('<div class="card">');

    card.append(`
        <div class="card-header" id="appointment${appointmentData.id}">
            <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${appointmentData.id}" aria-expanded="true" aria-controls="collapse${appointmentData.id}">
                    Appointment #${appointmentData.id}
                </button>
            </h5>
        </div>
    `);

    let timeSlotContainer = $(`
       <div id="collapse${appointmentData.id}" class="collapse show" aria-labelledby="heading${appointmentData.id}" data-parent="#accordion">
            <div class="card-body">
                    <table>
                        <tr>
                            <th>Choose your timeslot</th>
                            <th id="timeslot1">Slot 1</th>
                            <th id="timeslot2">Slot 2</th>
                            <th id="timeslot3">Slot 3</th>
                            <th id="timeslot4">Slot 4</th>
                            <th id="timeslot5">Slot 5</th>
                        </tr>
                        <tr>
                            <td>
                                <label for="username">username:</label>
                                <input type="text" id="username" name="username">
                            </td>
                            <div class="form-check">
                            <td><input type="checkbox" name="timeslots"></td>
                            <td><input type="checkbox" name="timeslots"></td>
                            <td><input type="checkbox" name="timeslots"></td>
                            <td><input type="checkbox" name="timeslots"></td>
                            <td><input type="checkbox" name="timeslots"></td>
                            </div>
                        </tr>
                    </table>

                    <br>

                <div class="mb-3">
                    <label for="comment" class="form-label">Your Comment:</label>
                    <textarea class="form-control" id="comment" rows="3"></textarea>
                </div>
            </div>
       </div>
    `);
}

// <div class="form-check">
//                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
//                                 <label class="form-check-label" for="flexCheckDefault">
//                                     Default checkbox
//                                 </label>
//
//                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
//                                 <label class="form-check-label" for="flexCheckChecked">
//                                     Checked checkbox
//                                 </label>
//
//                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
//                                 <label class="form-check-label" for="flexCheckChecked">
//                                     Checked checkbox
//                                 </label>
//
//                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
//                                 <label class="form-check-label" for="flexCheckChecked">
//                                     Checked checkbox
//                                 </label>
//
//                                 <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
//                                 <label class="form-check-label" for="flexCheckChecked">
//                                     Checked checkbox
//                                 </label>
//                             </div>