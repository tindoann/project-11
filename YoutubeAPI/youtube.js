
function loadVideo() {
  var apiKey = "AIzaSyAGvs6LJtuHdhgHhwORUOgMSea6-VQ5khE";
  var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&publishedAfter=2016-01-01T00%3A00%3A00Z&q=teaser%7Ctrailer&type=video&videoCaption=any&videoCategoryId=24&videoEmbeddable=true&key=' + apiKey;
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    console.log(response);
  })
};
loadVideo();

function onClientLoad() {
  gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded/
function onYouTubeApiLoad() {
  gapi.client.setApiKey('AIzaSyAGvs6LJtuHdhgHhwORUOgMSea6-VQ5khE');
}

// Called when the search button is clicked in the html code
function search() {
  var query = $('#query').value;
  // Use the JavaScript client library to create a search.list() API call.
  var request = gapi.client.youtube.search.list({
    part: 'snippet',
    q: query
  });
  // Send the request to the API server, call the onSearchResponse function when the data is returned
  request.execute(onSearchResponse);
}
// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {
  var responseString = JSON.stringify(response, '', 2);
  document.getElementById('response').innerHTML = responseString;
}