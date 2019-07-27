$('.main-search-button').on('click', function (prevent) {
    event.preventDefault()
    $("#display-view").empty()
    $("#reddit-display-column").empty()
    var query = $('#user-search-input').val().trim();
    console.log("ReditGoogleCSE query = ", query);

    var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAL7vdfKAd9Wpr44QTiZPdHYRorgEE6xw4&cx=016389558833326296142:ezmrodyt_by&q=" + query;
    console.log("Reddit queryURL =", queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("REDDITresponse =", response);

        // <img class="card-img-bottom" src="${response.items[i].pagemap.cse_image.src}" alt="Card image cap">
        for (let i = 0; i < response.items.length; i++) {
            display =
                `
                <div class="card m-2">
                <div class="card-body">
                
                <div class="card-title">${response.items[i].htmlTitle}
                </div>
                <p class="card-text">${response.items[i].htmlSnippet}</p>
                <a href='${response.items[i].link}' class='btn'>Read more</a>
                </div>
                `;

            $('#reddit-display-column').append(display);

            // <img class="card-img-bottom" src="${response.items[i].urlToImage}" alt="Card image cap">
            //       <p class="card-text">${response.items[i].description}</p>
            //       
            //       <p class="card-text">Published on: ${response.items[i].publishedAt}</p>
            //   </div>
        }
    })
})