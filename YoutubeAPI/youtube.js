function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) { return t[n][r] }) } return res }

function onClientLoad() {
  gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded/
function onYouTubeApiLoad() {
  gapi.client.setApiKey('AIzaSyBEDZ-mNT4ZebCqzIan1K8VrZ2FwHgJ-e8');
}

// Called when the search button is clicked in the html code
function search() {
  $('#query').empty();
  var query = $('#query').val().trim();
  // Use the JavaScript client library to create a search.list() API call.
  var request = gapi.client.youtube.search.list({
    part: 'snippet',
    type: 'video',
    maxResults: 5,
    q: query
  });

  // execute the request
  request.execute(function (response) {
    console.log('the response', response);
    var results = response.result;
    $("#results").html("");
    $.each(results.items, function (index, item) {
      $.get("tpl/item.html", function (data) {
        $("#results").append(tplawesome(data, [{ "title": item.snippet.title, "videoid": item.id.videoId }]));
        //$("#results").append(item.id.videoId+' '+item.snippet.title+'<br'); 
      });
    });
  })
}
// Triggered by this line: request.execute(onSearchResponse);
// function onSearchResponse(response) {
//     var responseString = JSON.stringify(response, '', 1);
//     document.getElementById('response').innerHTML = responseString;
// } 

function loadVideo() {
  var apiKey = "AIzaSyBEDZ-mNT4ZebCqzIan1K8VrZ2FwHgJ-e8";
  var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=cat&maxResults=10&order=viewCount&publishedAfter=2016-01-01T00%3A00%3A00Z&q=teaser%7Ctrailer&type=video&videoCaption=any&videoCategoryId=24&videoEmbeddable=true&key=' + apiKey;
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    console.log(response);

    // const results = response.request;
    // console.log(results)
  })
}
loadVideo();


