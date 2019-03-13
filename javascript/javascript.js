// This is the giphy homework! This felt super attainable and was pretty fun to do. Stephen, Christine and I all worked on this together but without Tom's example I would not have been able to animate/pause each gif.

$(document).ready(function() {
  //this is the array I push all the things users search. I pre-populated it with 6.
  var sports = [
    "skateboarding",
    "rugby",
    "hockey",
    "curling",
    "cricket",
    "fencing"
  ];
  // this is the function I built that actually hits the giphy API and searches the database
  function createGifs() {
    // this is the variable that takes user input and is slotted into the queryURL to search that specific topic.
    var sport = $(this).data("search");
    console.log(sport);

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      sport +
      "&api_key=G91ywVKl5sMotDMcwf8dBLNwtldkmzpm&limit=10";

    //this is what accesses the ipgy api and pulls the information we want
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        // this is a bank of variables I use to do multiple things: 1) create a div for an individual gif 2)grabs the animated and still URLs from giphy, 3) adds the img tag, 4) pulls the rating for each gif, 5) adds a <p> tag and displays the gif rating
        var gifDiv = $("<div>");
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var image = $("<img>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        //all these commands take the variables above and attach them to each item in the sports array.
        // this also set's me up to play/pause my gifs by adding the gif's state when it is created.
        image.attr("src", still);
        image.attr("class", "Giphy");
        image.attr("data-state", "still");
        image.attr("data-still", still);
        image.attr("data-animate", animated);
        gifDiv.append(p);
        gifDiv.append(image);
        $("#gifs").prepend(gifDiv);
      }
    });
  }
  //this is how the user searches new gifs.
  $("#submitButton").on("click", function(event) {
    event.preventDefault();
    var sportSearch = $("#searchArea")
      // .val() actually grabs the things the user searched and .trim() gets ride of all spaces
      .val()
      .trim();
    sports.push(sportSearch);
    console.log(sports);
    $("#searchArea").val("");
    createButtons();
  });

  //this function actually creates the buttons from the key word (or words) that the user searched. I add a couple more tags onto things that I can reference later (the sport id and data-search: sports[i] which adds each searched term)
  function createButtons() {
    $("#buttons").empty();
    for (var i = 0; i < sports.length; i++) {
      var y = $('<button class="btn btn-secondary btn-sm">');
      y.attr("id", "sport");
      y.attr("data-search", sports[i]);
      y.text(sports[i]);
      $("#buttons").append(y);
    }
  }
  // i call it right after i define it so it creates buttons for all the things I pre-populated the sports array with.
  createButtons();

  // this is where I tell the JS how to interpret user clicks
  $(document).on("click", "#sport", createGifs);

  // this is how I pause/play the gifs
  $(document).on("click", ".Giphy", changeGIFState);

  //  Tom demo-ed this in class and it was very helpful. Was stuck on this for a LOOOOOONNNNGGGG time
  function changeGIFState() {
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
