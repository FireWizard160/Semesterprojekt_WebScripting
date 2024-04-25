$.ajax({
    type: "GET",
    url: "../Backend/servicehandler.php",
    cache: false,
    data: { method: "getAllData", param: "a" },
    dataType: "json",
    success: function (response) {
        console.log(response);
        for (var key in response) {
            AddAppointment(response[key]);
        }
    },
    error: function (response) {
        console.log("Error");
        console.log(response);
    }
});
var weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function AddAppointment(appointmentData) {
    var appointmentElement = $("\n            <div class=\"card accordion-item\">\n                \n                    <div class=\"card-header\" id=\"heading".concat(appointmentData.appointmentID, "\">\n                        <h5 class=\"mb-0\">\n                            <button class=\"accordion-button\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapse").concat(appointmentData.appointmentID, "\"\n                                    aria-expanded=\"true\" aria-controls=\"collapse").concat(appointmentData.appointmentID, "\">\n                                ").concat(appointmentData.title, "\n                            </button>\n                        </h5>\n                    </div>\n                    <div id=\"collapse").concat(appointmentData.appointmentID, "\" class=\"collapse show\" aria-labelledby=\"heading").concat(appointmentData.appointmentID, "\" data-bs-parent=\"#appointmentContainer\">\n            <form>\n                       \n                        <div class=\"card-body\">\n                            <table class=\"table table-striped-columns\">\n                                <thead>\n                                <tr class=\"table-primary\" id=\"timeSlotHeader").concat(appointmentData.appointmentID, "\">\n                                    <th></th>\n                                </tr>\n                                </thead>\n                                <tbody>\n                                <tr>\n                                    <td>\n                                        <label for=\"username\">username:</label>\n                                        <input type=\"text\" id=\"username\" name=\"username\" required>\n                                    </td>\n                                    <td class=\"text-center\">\n                                        <div class=\"form-check form-check-inline\">\n                                            <input class=\"form-check-input timeSlotCheck").concat(appointmentData.appointmentID, "\" type=\"checkbox\" value=\"option1\">\n                                        </div>\n                                    </td>\n                                    <td class=\"text-center\">\n                                        <div class=\"form-check form-check-inline\">\n                                            <input class=\"form-check-input timeSlotCheck").concat(appointmentData.appointmentID, "\" type=\"checkbox\" value=\"option1\">\n                                        </div>\n                                    </td>\n                                    <td class=\"text-center\">\n                                        <div class=\"form-check form-check-inline\">\n                                            <input class=\"form-check-input timeSlotCheck").concat(appointmentData.appointmentID, "\" type=\"checkbox\" value=\"option1\">\n                                        </div>\n                                    </td>\n                                    <td class=\"text-center\">\n                                        <div class=\"form-check form-check-inline\">\n                                            <input class=\"form-check-input timeSlotCheck").concat(appointmentData.appointmentID, "\" type=\"checkbox\" value=\"option1\">\n                                        </div>\n                                    </td>\n                                    <td class=\"text-center\">\n                                        <div class=\"form-check form-check-inline\">\n                                            <input class=\"form-check-input timeSlotCheck").concat(appointmentData.appointmentID, "\" type=\"checkbox\" value=\"option1\">\n                                        </div>\n                                    </td>\n                                </tr>\n                                </tbody>\n                            </table>\n                            <div class=\"card\">\n                                <div class=\"card-header\">\n                                    Comments\n                                </div>\n                                <ul class=\"list-group list-group-flush\" id=\"comments").concat(appointmentData.appointmentID, "\">\n                                </ul>\n                            </div>\n                            <div class=\"mt-3\">\n                                <label for=\"comment\" class=\"form-label\">Your Comment:</label>\n                                <textarea class=\"form-control\" id=\"comment\" rows=\"3\"></textarea>\n                                <button class=\"btn btn-primary mt-3\" type=\"submit\">Post</button>\n                            </div>\n                        \n                        </div>\n                        </form>\n                    </div>\n                \n            </div>\n    "));
    $("#appointmentContainer").append(appointmentElement);
    for (var key in appointmentData.timeslots) {
        var date = new Date(appointmentData.timeslots[key].date);
        console.log(key + ": " + date);
        $("#timeSlotHeader".concat(appointmentData.appointmentID)).append("\n        <th>\n                            <div class=\"text-center row\">\n                                <div>\n                                    <div class=\"fw-normal\">".concat(months[date.getMonth()], "</div>\n                                    <div class=\"fw-bold h2\">").concat(date.getDate(), "</div>\n                                    <div class=\"fw-normal\">").concat(weekdays[date.getDay()], "</div>\n                                </div>\n                                <div class=\"fw-light mt-3\">\n                                    <small>\n                                        ").concat(appointmentData.timeslots[key].starttime.slice(0, -3), " - ").concat(appointmentData.timeslots[key].endtime.slice(0, -3), "\n                                    </small>\n                                </div>\n                            </div>\n                        </th>\n        "));
        for (var key2 in appointmentData.timeslots[key].votedtimeslots) {
            if (appointmentData.timeslots[key].votedtimeslots[key2].comment === "")
                continue;
            $("#comments".concat(appointmentData.appointmentID)).append("\n            <li class=\"list-group-item\">".concat(appointmentData.timeslots[key].votedtimeslots[key2].comment, "</li>\n            "));
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
