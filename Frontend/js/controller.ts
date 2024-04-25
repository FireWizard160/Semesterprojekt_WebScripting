$.ajax({
    type: "GET",
    url: "../Backend/servicehandler.php",
    cache: false,
    data: {method: "getAllData", param: "a"},
    dataType: "json",
    success: function (response) {
        console.log(response);
        for (const key in response) {
            $("body").append(createAppointmentElement(response[key]))
        }
    },
    error: function (response) {
        console.log("Error")
        console.log(response)
    }
});

function createAppointmentElement(appointmentData: any) {
    let appointmentElement = $(`

<div class="card">
        <div class="card-header" id="heading${appointmentData.appointmentID}">
            <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${appointmentData.appointmentID}"
                        aria-expanded="true" aria-controls="collapse${appointmentData.appointmentID}">
                    ${appointmentData.title}
                </button>
            </h5>
        </div>

        
    `)
    let cardContainer = $(`
    <div id="collapse${appointmentData.appointmentID}" class="collapse show" aria-labelledby="heading${appointmentData.appointmentID}" data-parent="#appointmentContainer${appointmentData.appointmentID}">
                `);
    let cardBody = $(`<div class="card-body">`);

    let timeSlotsTable = $(`
        <table class="table table-striped-columns">
     `);
    let timeSlotHeaderContainer = $(`
        <thead>
     `)

    let timeSlotHeader = $(`
        <tr class="table-primary">
    `)
    //TODO add time slot headers
    timeSlotHeader.append("<th>")
    for (const key in appointmentData.timeslots) {
        let date: Date = new Date(appointmentData.timeslots[key].date);
        console.log(date)

        timeSlotHeader.append(`
        <th>
                            <div class="text-center row">
                                <div>
                                    <div class="fw-normal">${date.getMonth()}</div>
                                    <div class="fw-bold h2">${date.getDay()}</div>
                                    <div class="fw-normal">DI</div>
                                </div>
                                <div class="fw-light mt-3">
                                    <small>
                                        10:00 - 15:00
                                    </small>
                                </div>
                            </div>
                        </th>
        `);
    }
    timeSlotHeaderContainer.append(timeSlotHeader)
    timeSlotsTable.append(timeSlotHeaderContainer)

    let timeSlotData = $(`
        <tbody>
        <tr>
            <td>
                <label for="username">username:</label>
                <input type="text" id="username" name="username">
            </td>
    `);

    //TODO add time slot data


    cardBody.append(timeSlotsTable)
    cardContainer.append(cardBody)
    let comments = $('<div class="card">');
    comments.append(`
        <div class="card-header">
            Comments
        </div>
    `);

    let commentInput = $(`
    `);

    appointmentElement.append(cardContainer)

    return $(`<div class="accordion" id="appointmentContainer${appointmentData.appointmentID}">`).append(appointmentElement);
}