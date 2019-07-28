// ==+==============================================================================+==
// names
// -- (News) N-Directory (News)

$(document).ready(function () {

  var tweets = ["tweet", "classic"]
  
  var localStorageTerm = localStorage.getItem("searchTerm")
  // By default display the search from localStorage
  $(".last-search-term").val(localStorageTerm);
  // console.log("localStorage.getItem(searchTerm)) === ", localStorageTerm)

  
  $(".main-search-button").on("click", function (event) {
    event.preventDefault()

    var tweet = $("#user-search-input").val().trim()
    tweets.push(tweet)
    console.log("Twitter tweet = ", tweet)

    renderSearchButtons()
    
    // Clear localStorage
    localStorage.clear();
    // Store searched content into localStorage
    localStorage.setItem("searchTerm", tweet);
  });

  
  function renderSearchButtons() {
    $("#buttons-display-view").empty()
    for (var i = 0; i < tweets.length; i++) {
      var a = $("<button>")
      a.addClass("tweet")
      a.attr("data-name", tweets[i])
      a.text(tweets[i])
      $("#buttons-display-view").append(a)
    }
  }
  

  $('#buttons-display-view').on('click', '.tweet', function () {
    event.preventDefault();
    // $("#tweets-view").empty()
    const tweetName = $(this).attr("data-name")
    console.log("buttons attribute data-name = " + tweetName)
    
  });
  
  
  renderSearchButtons()
  
  
});


// ==+== END MAIN ==============================================================+==
// ==+==========================================================================+==


// serch user input as = tweet variable passed into > codebird.js AJAX function __call
// cb.__call(
//   "search_tweets",
//   `q=${tweet}`,
//   null,
//   true,
//   function (reply, rate, err) {
//     if (err) {
//       console.log("error response or timeout exceeded" + err.error);
//     }
//     if (reply) {
//       cb.setToken(reply.oauth_token, reply.oauth_token_secret);
//     }
//   }).then(
//     function (response) {
//       console.log('cb ajax > response = ', response);

//       renderSearchResults(response)
//     }
//     );
// store the authenticated token, which may be different from the request token (!)
// if you need to persist the login after page reload,
// consider storing the token in a cookie or HTML5 local storage
// THEN - handle the response in renderSearchResults(response)

// Handle AJAX response after #main-search-button is clicked
// IF twitter response.reply.httpstatus === 0 >> not visible
// ELSE twitter good response, search twitter
// function renderSearchResults(response) {

//   console.log('renderSearchResults(response) > here response = ', response);
//   console.log("response.reply.httpstatus = ", response.reply.httpstatus)

//   $("#tweets-dynamic-view").empty()

  // error handle response data
  // card columns may be the way to go
  // if (response.reply.httpstatus === 0) {

    // display =
    //   `
    //     <div class"card-body text-danger">
    //     <div class="card-header text-danger">-_- Codebird.js Proxy Error -_-</div>
    //     `

    // $(".twitter-loading").removeClass("loader")
    // $('#tweets-dynamic-view').append(display);

    // console.log("twitter ran incorrectly -> response.reply.httpstatus = ", response.reply.httpstatus)

    // else response data > dynamically generate tweets text on card body
  // } else {

  //   console.log("twitter ran correctly -> response.reply.statuses.length = ", response.reply.statuses.length)

  //   displayHeader =
  //     `
  //       <div class="card-header project-color-style1">Twitter Search Results</div>
  //       `;

    // add the header to the page
    // $('#tweets-dynamic-view').append(displayHeader);

    // for (let i = 0; i < response.reply.statuses.length; i++) {

    //   var text = response.reply.statuses[i].text

    //   display =
    //     `
    //       <div class="card">
    //       <div class="card-body">${text}</div>
    //       </div>
    //       `;

      // add the cards  to the page
//       $('#tweets-dynamic-view').append(display);

//     }
//   }
// }