

// $('.main-search-button').on('click', function () {
// event.preventDefault()
// }
function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) { return t[n][r] }) } return res }

function onClientLoad() {
  gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded/
function onYouTubeApiLoad() {
  gapi.client.setApiKey('AIzaSyB_LacdNoyYmvySVPxZIORjEZ4hjXu13S4')
  // gapi.client.setApiKey('AIzaSyBEDZ-mNT4ZebCqzIan1K8VrZ2FwHgJ-e8');
}

// Called when the search button is clicked in the html code
function search(event) {
  event.preventDefault();
  $('#query').empty();
  var query = $('#user-search-input').val().trim();
  console.log(query)

  // Use the JavaScript client library to create a search.list() API call.
  var request = gapi.client.youtube.search.list({
    part: 'snippet',
    type: 'video',
    description: 'description',
    maxResults: 2,

    q: query
  });

  // execute the request
  request.execute(function (response) {
    console.log('the response', response);
    var results = response.result;
    $("#youtube-video-column").html("");
    $.each(results.items, function (index, item) {
      $.get("item.html", function (data) {
        $("#youtube-video-column").append(tplawesome(data, [{ "title": item.snippet.title, "videoid": item.id.videoId, "description": item.snippet.description}]));

      });
    });
  });
}
// )


function loadVideo() {
  var apiKey = "AIzaSyBEDZ-mNT4ZebCqzIan1K8VrZ2FwHgJ-e8";
  var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=cat&maxResults=2&order=viewCount&publishedAfter=2016-01-01T00%3A00%3A00Z&q=teaser%7Ctrailer&type=video&videoCaption=any&videoCategoryId=24&videoEmbeddable=true&key=' + apiKey;
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    console.log(response);

    // const results = response.request;
    // console.log(results)
  })

  // onClientLoad();
  loadVideo();
}


