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
                            <td>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-success">Approve</button>
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

loadRsvps();