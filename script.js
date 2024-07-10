$(document).ready( function () {
    $('#rsvp-table').DataTable({
        paging: true,
        ordering: true,
        searching: true,
        lengthChange: false,
        columns: [
            null,
            { width: '50%' },              
            null,
            { width: '30%' },
            null,
            null,
            null
        ]
    });

    $('#declined-table').DataTable({
        paging: true,
        ordering: true,
        searching: true,
        lengthChange: false,
        columns: [
            null,
            { width: '30%' },
            null,
            { width: '30%' },
            null
        ]
    });
} );

function loadRsvps() {
    $.ajax({
        type: "GET",
        url: "https://api.dsciwedding.com/rsvp/list",
        success: function(response) {
            j = JSON.parse(response);

            var rsvpTable = $('#rsvp-table').DataTable();
            var declinedTable = $("#declined-table").DataTable();

            rsvpTable.clear();
            declinedTable.clear();

            j.forEach(function(rsvp) {
                if (rsvp.is_declined != 1) {
                    var isApprovedCell = rsvp.is_approved == 1 ? "Yes" : "Not yet";
                    var isAttendingCell = rsvp.is_pasilungan_attending == 1 ? "Yes" : "No";
                    var approveAndDeclineButtonHtml = '';

                    if (rsvp.is_approved != 1 && rsvp.is_declined != 1) {
                        approveAndDeclineButtonHtml = '<button type="button" class="btn btn-success" onclick="approve(' + rsvp.id + ', \'' + rsvp.email + '\')">Approve</button>' + '<button type="button" class="btn btn-danger" onclick="decline(' + rsvp.id + ', \'' + rsvp.email + '\')">Decline</button>';
                    }

                    rsvpTable.row.add([
                        rsvp.id,
                        rsvp.name,
                        rsvp.mobile,
                        rsvp.email,
                        isAttendingCell,
                        isApprovedCell,
                        '<div class="btn-group" role="group" aria-label="Basic example">' +
                            '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#rsvp-message-modal" onclick="viewMessage(\'' + rsvp.name + '\', \'' + addslashes(rsvp.message) + '\')">View</button>' +
                            approveAndDeclineButtonHtml +
                        '</div>'
                    ]).draw(false);
                } else {
                    declinedTable.row.add([
                        rsvp.id,
                        rsvp.name,
                        rsvp.mobile,
                        rsvp.email,
                        '<div class="btn-group" role="group" aria-label="Basic example">' +
                            '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#rsvp-message-modal" onclick="viewMessage(\'' + rsvp.name + '\', \'' + addslashes(rsvp.message) + '\')">View</button>' +
                            '<button type="button" class="btn btn-success" onclick="approve(' + rsvp.id + ', \'' + rsvp.email + '\')">Approve</button>' +
                        '</div>'
                    ]).draw(false);
                }
            });
        }
    });
}

function viewMessage(name, message) {
    var modalMessage = message.trim().length > 0 ? message : 'No message';

    $("#message-modal-title").html(name + " said...")
    $("#message-modal-body").html(modalMessage);
}

function approve(id, email) {
    $.ajax({
        type: "POST",
        url: "https://api.dsciwedding.com/rsvp/approve",
        data: JSON.stringify({'id': id, 'email': email}),
        success: function (response) {
            j = JSON.parse(response);

            alert(j.message);
            location.reload();
        }
    })
}

function decline(id, email) {
    $.ajax({
        type: "POST",
        url: "https://api.dsciwedding.com/rsvp/decline",
        data: JSON.stringify({'id': id, 'email': email}),
        success: function (response) {
            j = JSON.parse(response);

            alert(j.message);
            location.reload();
        }
    })
}

function getStats() {
    $.ajax({
        type: "GET",
        url: "https://api.dsciwedding.com/rsvp/stats",
        success: function(response) {
            j = JSON.parse(response);

            $("#form-count").html(j.form_sent + " form(s)");
            $("#pasilungan-count").html(j.pasilungan_attendees + " attendee(s)");
            $("#approved-count").html(j.approved_attendees + " attendee(s)");
            $("#declined-count").html(j.declined_attendees + " attendee(s)");
        }
    })
}

function addslashes( str ) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

var password = prompt("");

if (btoa(password) != "SmF4eGRtczIwQA==") {
    location = "honeypot.html"
}

loadRsvps();
getStats();