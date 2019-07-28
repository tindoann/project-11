$(".main-search-button").on("click", function (event) {
  event.preventDefault(); 
  var display = $(".searchbox").css("display");
  if (display != "none") {
    $(".searchbox").attr("style", "display:none");
    console.log(display); 
  }
});

