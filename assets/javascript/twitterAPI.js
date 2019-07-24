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
// ==+
// ==+==== MAIN ======================+==
$(document).ready(function () {

  var cb = new Codebird;
  cb.setBearerToken("AAAAAAAAAAAAAAAAAAAAAMc6%2FQAAAAAAwOp0nm4pRcBP6Ll%2F1nFZ0qH1dzY%3DFpBUJ6yfl8mJhnZPnQy6IiIIyBk7TIkMNwjbwz01dkFzLi0hDI");
  var tweets = ["tweet", "classic"]

  // function renderSearchButtons()
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
  // end renderSearchButtons()


  // ==+===============================+==
  // Click Event Listener - on click #main-search-button. 
  //  adds button to tweet array with user text entered. - then this calls renderSearchButtons
  $("#main-search-button").on("click", function (event) {
    event.preventDefault()

    var tweet = $("#user-search-input").val()
    tweets.push(tweet)
    renderSearchButtons()

    // ==+===============================+==
    // BUILD TWITTER SEARCH WITH PARAMETERS ENTERED INTO CODEBIRD.js .__call() method
    // cd.__call("search_tweets", "q=test", function (resp) { console.log(resp)}, true);
    // - 
    // generate new code if not working..?? curl function in terminal
    // cb.setUseProxy(true); - we need this for proxy to get around CORS, but its default true I think dont mess with it
    // -
    // Codebird AJAX function  == __call - it builds string for URL with parameters.
    // cb.__call("search_tweets", "q=test", function (response) {console.log(response)},true);
    // -
    // Set new reference to codebird = cb
    // Set authentication app-only bearer token
    // -
    // ==+===============================+==
    // Codebird ajax function __call
    // true - this parameter required

    // Thomas - trying to make sure setBearer still holds token - does not stay set and is frustraiting
    // console.log(cb.setBearerToken) 
    // changed search_tweets to search/tweets in parameters
    cb.setBearerToken("AAAAAAAAAAAAAAAAAAAAAMc6%2FQAAAAAAwOp0nm4pRcBP6Ll%2F1nFZ0qH1dzY%3DFpBUJ6yfl8mJhnZPnQy6IiIIyBk7TIkMNwjbwz01dkFzLi0hDI");



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
        function (response) {
          console.log('response', response);
          // ==+===============================+==
          // ==+===============+== MAIN CODE FOR HANDLING API RESPONSE 

          var results = response.reply;
          // console.log(response.reply.statuses[0].text)
          // console.log(response.reply)
          console.log("response.reply = results", results)
          console.log("results.statuses.length = ", results.statuses.length)

          for (var i = 0; i < results.statuses.length; i++) {
            var text = response.reply.statuses[i].text

            const genTweet = `
            <div id="${tweets-dynamic-view}>


            `
            var tweetDiv = $("#tweets-dynamic-view")

            var tweetCard = $("<div class='card tweetCard'>")
            
            tweetCard.addClass("card-body")

            var tweetText = $("<p class='card-text'>").text("tweetText: =" + text)
            tweetDiv.append(tweetCard)
          }
          // Create the new row
          // var newRow = $("<tr>").append(
          // Name
          //   $("<td>").text(trainName)
          // );

          // Append the new row to the table
          // $("#train-table > tbody").append(newRow);

          // var image = $("<img>").attr("src", imgURLStill).addClass('tweety')

          // ==+===============+== MAIN CODE FOR HANDLING API RESPONSE
          // ==+===============================+==
        }
        // DO I NEED , HERE ,,,,,,,,,,,,,,,,,

      );
    // end THEN promise after cb.__call()

  });
  // end onCLICK main-search-button


  // function onCLICK buttons-display-view
  $('#buttons-display-view').on('click', '.tweet', function () {
    event.preventDefault();

    $("#tweets-view").empty()
    const tweetName = $(this).attr("data-name")
    console.log("buttons data-name = " + tweetName)

  });
  // end buttons-display-view

  renderSearchButtons()

});

// ==+== END MAIN ==============================================================+==
// ==+==========================================================================+==


// ==+==========================================================================+==


// ==+==========================================================================+==

// END
// ==+==========================================================================+==

