
$('#searchbtn').on('click', function () {
  $("#display-view").empty()
  var query = $('#search').val().trim();
  console.log(query);

  var queryURL = "https://newsapi.org/v2/everything?q=" + query + "&from=2019-07-19&to=2019-07-19&sortBy=popularity&apiKey=37ef007297c34129a5a467ca9a5304ab";
  console.log(queryURL)
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    const results = response.articles; //grabs the data 
    for (let i = 0; i < 5; i++) {
      display =

        `
  <div>
    <h4>${results[i].title}</h4>
    <img src='${results[i].urlToImage}'>
    <p>${results[i].description}</p>
    <p>${results[i].content}</p>
    <p>Published on: ${results[i].publishedAt}</p>
    <a href='${results[i].url}' class='btn'>Read more</a>
  </div>
  `;
      $('#display-view').append(display);
    }
  })
})

