$.ajax({
    type: "GET",
    url: "../Backend/servicehandler.php",
    cache: false,
    data: {method: "getAllData", param: "a"},
    dataType: "json",
    success: function (response) {
        console.log(response);
        for (const key in response) {
            AddAppointment(response[key])
        }
    },
    error: function (response) {
        console.log("Error")
        console.log(response)
    }
});

const weekdays: string[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const months: string[] = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function AddAppointment(appointmentData: any) {
    let appointmentElement = $(`
            <div class="card accordion-item">
                
                    <div class="card-header" id="heading${appointmentData.appointmentID}">
                        <h5 class="mb-0">
                            <button class="accordion-button" type="button" data-toggle="collapse" data-target="#collapse${appointmentData.appointmentID}"
                                    aria-expanded="true" aria-controls="collapse${appointmentData.appointmentID}">
                                ${appointmentData.title}
                            </button>
                        </h5>
                    </div>
                    <div id="collapse${appointmentData.appointmentID}" class="collapse show" aria-labelledby="heading${appointmentData.appointmentID}" data-bs-parent="#appointmentContainer">
            <form>
                       
                        <div class="card-body">
                            <table class="table table-striped-columns">
                                <thead>
                                <tr class="table-primary" id="timeSlotHeader${appointmentData.appointmentID}">
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <label for="username">username:</label>
                                        <input type="text" id="username" name="username" required>
                                    </td>
                                    <td class="text-center">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input timeSlotCheck${appointmentData.appointmentID}" type="checkbox" value="option1">
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input timeSlotCheck${appointmentData.appointmentID}" type="checkbox" value="option1">
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input timeSlotCheck${appointmentData.appointmentID}" type="checkbox" value="option1">
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input timeSlotCheck${appointmentData.appointmentID}" type="checkbox" value="option1">
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input timeSlotCheck${appointmentData.appointmentID}" type="checkbox" value="option1">
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="card">
                                <div class="card-header">
                                    Comments
                                </div>
                                <ul class="list-group list-group-flush" id="comments${appointmentData.appointmentID}">
                                </ul>
                            </div>
                            <div class="mt-3">
                                <label for="comment" class="form-label">Your Comment:</label>
                                <textarea class="form-control" id="comment" rows="3"></textarea>
                                <button class="btn btn-primary mt-3" type="submit">Post</button>
                            </div>
                        
                        </div>
                        </form>
                    </div>
                
            </div>
    `);
    $("#appointmentContainer").append(appointmentElement);

    for (const key in appointmentData.timeslots) {
        let date: Date = new Date(appointmentData.timeslots[key].date);
        console.log(key + ": " + date)

        $(`#timeSlotHeader${appointmentData.appointmentID}`).append(`
        <th>
                            <div class="text-center row">
                                <div>
                                    <div class="fw-normal">${months[date.getMonth()]}</div>
                                    <div class="fw-bold h2">${date.getDate()}</div>
                                    <div class="fw-normal">${weekdays[date.getDay()]}</div>
                                </div>
                                <div class="fw-light mt-3">
                                    <small>
                                        ${appointmentData.timeslots[key].starttime.slice(0, -3)} - ${appointmentData.timeslots[key].endtime.slice(0, -3)}
                                    </small>
                                </div>
                            </div>
                        </th>
        `);

        for (const key2 in appointmentData.timeslots[key].votedtimeslots) {
            if(appointmentData.timeslots[key].votedtimeslots[key2].comment === "")
                continue;

            $(`#comments${appointmentData.appointmentID}`).append(`
            <li class="list-group-item">${appointmentData.timeslots[key].votedtimeslots[key2].comment}</li>
            `);
        }
    }


}

/*function createAppointmentElement(appointmentData: any) {
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

    let timeSlotDataContainer = $(`
        <tbody>
    `);

    let timeSlotData = $(`
     <tr>
    `)

    timeSlotData.append(`
    <td>
                <label for="username">username:</label>
                <input type="text" id="username" name="username">
            </td>
    `)

    for (const key in appointmentData.timeslots) {

    }

    timeSlotDataContainer.append(timeSlotData)
    timeSlotsTable.append(timeSlotDataContainer)

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
}*/