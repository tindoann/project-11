$('.main-search-button').on('click', function (prevent) {
    event.preventDefault()

    $("#reddit-display-column").empty()
    var query = $('#user-search-input').val().trim();

    console.log("Reddit query = ", query);

    var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCdt-76haNdFwBD667_DvInWELsT1iRfe4&cx=016389558833326296142:ezmrodyt_by&q=" + query;
    // console.log("Reddit queryURL =", queryURL)
    // redditsearch API1 = AIzaSyAL7vdfKAd9Wpr44QTiZPdHYRorgEE6xw4
    // redditsearch API2 = AIzaSyCdt-76haNdFwBD667_DvInWELsT1iRfe4
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log("REDDITresponse =", response);

        for (let i = 0; i < response.items.length; i++) {

            var item = response.items[i]
            display =
                `
                <div class="card m-2">
                <div class="card-body">
                
                <div class="card-title">${item.title}
                </div>
                <p class="card-text">${item.snippet}</p>
                <a href='${item.link}' class='btn'>Read more</a>
                </div>
                `;

            $('#reddit-display-column').append(display);

        }
    })
})