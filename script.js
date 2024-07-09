function loadRsvps() {
    $.ajax({
        type: "GET",
        url: "https://api.dsciwedding.com/rsvp/list",
        success: function(response) {
            j = JSON.parse(response);

            j.forEach(rsvp => {
                $("#rsvp-table-body").append(
                    `
                        <tr>
                            <th scope="row">${rsvp.id}</th>
                            <td>${rsvp.name}</td>
                            <td>${rsvp.mobile}</td>
                            <td>${rsvp.email}</td>
                            <td>${rsvp.message}</td>
                            <td class="${rsvp.is_pasilungan_attending == 1 ? "table-success" : "table-danger"}">
                                ${rsvp.is_pasilungan_attending == "1" ? "Yes" : "No"}
                            </td>
                            <td class="${rsvp.is_approved == 1 ? "table-success" : "table-danger"}">
                                ${rsvp.is_approved == "1" ? "Yes" : "Not yet"}
                            </td>
                            <td ${rsvp.is_approved != 1 ? '' : 'style="display: none;"'}>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-success" onclick="approve('${rsvp.id}', '${rsvp.email}')">Approve</button>
                                    <button type="button" class="btn btn-danger">Decline</button>
                                </div>
                            </td>
                        </tr>
                    `
                )
            });
        }
    });
}

function approve(id, email) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/rsvp/approve",
        data: JSON.stringify({'id': id, 'email': email}),
        success: function (response) {
            console.log(response);
            j = JSON.parse(response);
        }
    })
}

loadRsvps();