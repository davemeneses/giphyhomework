$(document).ready(function() {
  //Array for searched sports to be added
  var sports = [
    "skateboarding",
    "rugby",
    "hockey",
    "curling",
    "cricket",
    "fencing"
  ];

  function displayGIFS() {
    var sport = $(this).data("search");
    console.log(sport);

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      sport +
      "&api_key=G91ywVKl5sMotDMcwf8dBLNwtldkmzpm&limit=10";

    // console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var image = $("<img>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);

        image.attr("src", still);
        image.addClass("Giphy");
        image.attr("data-state", "still");
        image.attr("data-still", still);
        image.attr("data-animate", animated);
        gifDiv.append(p);
        gifDiv.append(image);
        $("#gifs").prepend(gifDiv);
      }
    });
  }
  //Submit button click event takes search term from form input, trims and pushes to sports array, displays button
  $("#submitButton").on("click", function(event) {
    event.preventDefault();
    var sportSearch = $("#searchArea")
      .val()
      .trim();
    sports.push(sportSearch);
    console.log(sports);
    $("#searchArea").val("");
    displayButtons();
  });

  //Function iterates through sports array to display button with array values in "buttons" section of HTML
  function displayButtons() {
    $("#buttons").empty();
    for (var i = 0; i < sports.length; i++) {
      var y = $('<button class="btn btn-secondary btn-sm">');
      y.attr("id", "sport");
      y.attr("data-search", sports[i]);
      y.text(sports[i]);
      $("#buttons").append(y);
    }
  }
  displayButtons();
  displayGIFS();

  $(document).on("click", "#sport", displayGIFS);

  $(document).on("click", ".Giphy", pausePlayGifs);

  //   Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
  function pausePlayGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }
});
