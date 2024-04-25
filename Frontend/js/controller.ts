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
    let appointmentElement = $(`
        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
    `);
     let timeSlotsTable = $(`
        <table class="table table-striped-columns">
     `);
     let timeSlotHead = $(`
        <thead>
        <tr class="table-primary">
     `);

    //TODO add time slot headers

    let timeSlotData = $(`
        <tbody>
        <tr>
            <td>
                <label for="username">username:</label>
                <input type="text" id="username" name="username">
            </td>
    `);

    //TODO add time slot data

}