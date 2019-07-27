$('.main-search-button').on('click', function (event) {
  event.preventDefault()
  
  $("#news-display-view").empty(event)
  var query = $('#user-search-input').val().trim();
  console.log("NewsAPI query = ", query);

  var queryURL = "https://newsapi.org/v2/everything?q=" + query + "&from=2019-07-19&to=2019-07-19&sortBy=popularity&apiKey=37ef007297c34129a5a467ca9a5304ab";
  // console.log(queryURL)
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // console.log(response);
    const results = response.articles; //grabs the data 
    for (let i = 0; i < 6; i++) {
      display =

        `
        <div class="card m-2">

        <div class="card-title"<h4>${results[i].title}</h4>
        <div class="card-body">
        <img class="card-img-bottom" src="${results[i].urlToImage}" alt="Card image cap">
        <p class="card-text">${results[i].description}</p>
        <p class="card-text">${results[i].content}</p>
        <p class="card-text">Published on: ${results[i].publishedAt}</p>
        <a href='${results[i].url}' class='btn'>Read more</a>
        </div>
        </div>
        `;
      $('#news-dynamic-view').append(display);
    }
  })
})


