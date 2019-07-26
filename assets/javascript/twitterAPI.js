// ==+==============================================================================+==

// function window.onload() {
  
// }

$(document).ready(function () {
  
  // Set new reference to codebird = cb
  // Set authentication app-only bearer token
  var cb = new Codebird;
  cb.setBearerToken("AAAAAAAAAAAAAAAAAAAAAMc6%2FQAAAAAAwOp0nm4pRcBP6Ll%2F1nFZ0qH1dzY%3DFpBUJ6yfl8mJhnZPnQy6IiIIyBk7TIkMNwjbwz01dkFzLi0hDI");
  var tweets = ["tweet", "classic"]
  
  var localStorageTerm = localStorage.getItem("searchTerm")
  // By default display the search from localStorage
  $(".last-search-term").val(localStorageTerm);
  console.log("default localStorage.getItem(searchTerm)) === " , localStorageTerm)

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


  $(".main-search-button").on("click", function (event) {
    event.preventDefault()
    $(".twitter-loading").addClass("loader")

    var tweet = $("#user-search-input").val().trim()
    tweets.push(tweet)
    renderSearchButtons()

    // Clear localStorage
    localStorage.clear();

    // Store searched content into localStorage
    localStorage.setItem("searchTerm", tweet);


    // serch user input as = tweet variable passed into > codebird.js AJAX function __call
    cb.__call(
      "search_tweets",
      `q=${tweet}`,
      null,
      true,
      function (reply, rate, err) {
        if (err) {
          console.log("error response or timeout exceeded" + err.error);
        }
        if (reply) {
          // store the authenticated token, which may be different from the request token (!)
          cb.setToken(reply.oauth_token, reply.oauth_token_secret);
        }
        // if you need to persist the login after page reload,
        // consider storing the token in a cookie or HTML5 local storage
      }).then(
        // THEN - handle the response in renderSearchResults(response)
        function (response) {
          console.log('cb ajax response = ', response);

          renderSearchResults(response)
        }
      );

  });


  // Handle AJAX response after #main-search-button is clicked
  // IF twitter does not respond, css animation, on bad Response - custom Reddit Google Search
  // ELSE tidder good response, search twitter
  function renderSearchResults(response) {

    $("#tweets-dynamic-view").empty()
    // console.log('renderSearchResults here >> response = ', response);
    console.log("response.reply.httpstatus = ", response.reply.httpstatus)

    // error handle response data
    // card columns may be the way to go
    if (response.reply.httpstatus === 0) {

      display =
        `
      <div class"card-body text-danger">
      <div class="card-header text-danger">Codebird tweets error -_- </div>
      <div class="card-text text-success">Try a custom Reddit Search below!</div>
      <div class="card-text text-success">HINT: include Twitter to search for Reddit threads describing things that happen on twitter</div>
      <script async src="https://cse.google.com/cse.js?cx=016389558833326296142:ezmrodyt_by"></script>
      <div class="gcse-search">"search reddit"</div>
      </div>
      `;
      $(".twitter-loading").removeClass("loader")
      $('#tweets-dynamic-view').append(display);

      console.log("twitter ran incorrectly -> response.reply.httpstatus = ", response.reply.httpstatus)
      // console.log(display)
    } else {
      // else response data > dynamically generate tweets text on card body
      for (let i = 0; i < response.reply.statuses.length; i++) {

        var text = response.reply.statuses[i].text

        display =
          `
          <div class="card">
          <div class="card-body">${text}</p>
          </div>
          `;

        $('#tweets-dynamic-view').append(display);
        // add the new tweet cards to the page

        console.log("twitter ran correctly -> response.reply.statuses.length = ", response.reply.statuses.length)
        // console.log(display)
      }
    }

  }


  $('#buttons-display-view').on('click', '.tweet', function () {
    event.preventDefault();

    $("#tweets-view").empty()
    const tweetName = $(this).attr("data-name")
    console.log("buttons attribute data-name = " + tweetName)

  });


  renderSearchButtons()


});


// ==+== END MAIN ==============================================================+==
// ==+==========================================================================+==






// ==+===== other code notes ===================================================+==

// ==+===============================+==
// BUILD TWITTER SEARCH WITH PARAMETERS ENTERED INTO CODEBIRD.js .__call() method
// cd.__call("search_tweets", "q=test", function (resp) { console.log(resp)}, true);
// -
// Codebird AJAX function  == __call - it builds string for URL with parameters.
// -
// ==+===============================+==
// true - this parameter required
// Thomas - trying to make sure setBearer still holds token - does not stay set and is frustraiting
// console.log(cb.setBearerToken) 
// changed search_tweets to search/tweets in parameters
// cb.setBearerToken("AAAAAAAAAAAAAAAAAAAAAMc6%2FQAAAAAAwOp0nm4pRcBP6Ll%2F1nFZ0qH1dzY%3DFpBUJ6yfl8mJhnZPnQy6IiIIyBk7TIkMNwjbwz01dkFzLi0hDI");
// bearer token should already be set - i was resetting in main-search-button but have removed

// <img src='${results[i].urlToImage}'>
// <p>${results[i].description}</p>
// <p>${results[i].content}</p>
// <p>Published on: ${results[i].publishedAt}</p>
// <a href='${results[i].url}' class='btn'>Read more</a>

// var tweetDiv = $("#tweets-dynamic-view")
// var tweetCard = $("<div class='card tweetCard'>")
// tweetCard.addClass("card-body")
// var tweetText = $("<p class='card-text'>").text("tweetText: =" + text)
// tweetDiv.append(tweetCard)
// }

// Create the new row
// var newRow = $("<tr>").append(
// Name
//   $("<td>").text(trainName)
// );
// Append the new row to the table
// $("#train-table > tbody").append(newRow);
// var image = $("<img>").attr("src", imgURLStill).addClass('tweety')
// ==+==========================================================================+==
// ==+==========================================================================+==
// FSU6bR8JdQURQhuv6TUi7QctX (API key)
// Resource URL - https://api.twitter.com/1.1/search/tweets.json
// bearer token - AAAAAAAAAAAAAAAAAAAAAMc6%2FQAAAAAAwOp0nm4pRcBP6Ll%2F1nFZ0qH1dzY%3DFpBUJ6yfl8mJhnZPnQy6IiIIyBk7TIkMNwjbwz01dkFzLi0hDI
//              - AAAAAAAAAAAAAAAAAAAAAMc6%2FQAAAAAAwOp0nm4pRcBP6Ll%2F1nFZ0qH1dzY%3DFpBUJ6yfl8mJhnZPnQy6IiIIyBk7TIkMNwjbwz01dkFzLi0hDI
// O.Authenticate with Bearer token, then create URL
// --- USED Codebird Library to complete this call instead of AJAX ---
// $.ajax({
//     headers: { Authorization: 'Bearer '+ 'AAAAAAAAAAAAAAAAAAAAAMc6%2FQAAAAAAwOp0nm4pRcBP6Ll%2F1nFZ0qH1dzY%3DFpBUJ6yfl8mJhnZPnQy6IiIIyBk7TIkMNwjbwz01dkFzLi0hDI' },
//     url: 'https://api.twitter.com/1.1/search/tweets.json?q='+ $search
//   }).then(function (data) {
//     // Play with the data
//     console.log(data)      });
// --- USED Codebird Library to complete this call instead of AJAX ---
// ==+==================================================================================================================+==
// ==+==================================================================================================================+==
// ==+
// ==+
// ==+==========================================================================+==
// END
// ==+==========================================================================+==

