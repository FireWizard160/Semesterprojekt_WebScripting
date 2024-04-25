$.ajax({
    type: "GET",
    url: "../Backend/servicehandler.php",
    cache: false,
    data: { method: "getAllData", param: "a" },
    dataType: "json",
    success: function (response) {
        console.log(response);
        for (var key in response) {
            $("body").append(createAppointmentElement(response[key]));
        }
    },
    error: function (response) {
        console.log("Error");
        console.log(response);
    }
});
function createAppointmentElement(appointmentData) {
    var appointmentElement = $("\n\n<div class=\"card\">\n        <div class=\"card-header\" id=\"heading".concat(appointmentData.appointmentID, "\">\n            <h5 class=\"mb-0\">\n                <button class=\"btn btn-link\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapse").concat(appointmentData.appointmentID, "\"\n                        aria-expanded=\"true\" aria-controls=\"collapse").concat(appointmentData.appointmentID, "\">\n                    ").concat(appointmentData.title, "\n                </button>\n            </h5>\n        </div>\n\n        \n    "));
    var cardContainer = $("\n    <div id=\"collapse".concat(appointmentData.appointmentID, "\" class=\"collapse show\" aria-labelledby=\"heading").concat(appointmentData.appointmentID, "\" data-parent=\"#appointmentContainer").concat(appointmentData.appointmentID, "\">\n                "));
    var cardBody = $("<div class=\"card-body\">");
    var timeSlotsTable = $("\n        <table class=\"table table-striped-columns\">\n     ");
    var timeSlotHeaderContainer = $("\n        <thead>\n     ");
    var timeSlotHeader = $("\n        <tr class=\"table-primary\">\n    ");
    //TODO add time slot headers
    timeSlotHeader.append("<th>");
    for (var key in appointmentData.timeslots) {
        var date = new Date(appointmentData.timeslots[key].date);
        console.log(date);
        timeSlotHeader.append("\n        <th>\n                            <div class=\"text-center row\">\n                                <div>\n                                    <div class=\"fw-normal\">".concat(date.getMonth(), "</div>\n                                    <div class=\"fw-bold h2\">").concat(date.getDay(), "</div>\n                                    <div class=\"fw-normal\">DI</div>\n                                </div>\n                                <div class=\"fw-light mt-3\">\n                                    <small>\n                                        10:00 - 15:00\n                                    </small>\n                                </div>\n                            </div>\n                        </th>\n        "));
    }
    timeSlotHeaderContainer.append(timeSlotHeader);
    timeSlotsTable.append(timeSlotHeaderContainer);
    var timeSlotData = $("\n        <tbody>\n        <tr>\n            <td>\n                <label for=\"username\">username:</label>\n                <input type=\"text\" id=\"username\" name=\"username\">\n            </td>\n    ");
    //TODO add time slot data
    cardBody.append(timeSlotsTable);
    cardContainer.append(cardBody);
    var comments = $('<div class="card">');
    comments.append("\n        <div class=\"card-header\">\n            Comments\n        </div>\n    ");
    var commentInput = $("\n    ");
    appointmentElement.append(cardContainer);
    return $("<div class=\"accordion\" id=\"appointmentContainer".concat(appointmentData.appointmentID, "\">")).append(appointmentElement);
}
