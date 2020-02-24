$(document).ready(function(){
  var topics = [
    "Laptops",
    "Desktops",
    "Smartphones",
    "TVs",
    "Cars",
    "Video Games",
    "League of Legends",
    "Shoes"
  ]
  function renderButtons() {

    for(var i = 0; i < topics.length; i++) {
      var button = $("<button>").text(topics[i]);
      button.attr("data-topics", topics[i]);
      button.addClass("topics-button");
      $("#button-group").append(button);
    }
  }

  $("#add-topics-button").on("click", function(e) {
    e.preventDefault();
    var alreadyExist = false;
    if(topics.indexOf($("#new-topics-input").val()) !== -1) {
      alreadyExist = true;
    }
    if($("#new-topics-input").val() !== "" && alreadyExist === false) {
      var newtopics = $("#new-topics-input").val().toLowerCase();
      topics.push(newtopics);
      var button = $("<button>").text(newtopics);
      button.attr("data-topics", newtopics);
      button.addClass("topics-button");
      $("#button-group").append(button);
    }
    $("#new-topics-input").val("");
  });

  $(document).on("click", ".topics-button", function() {
    var topics = $(this).attr("data-topics");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          topics + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        var results = response.data;
        // console.log(results);

      var resultsContainerSection = $("<section class='results-container'>");

        for(var i = 0; i < results.length; i++) {
          var singleResultDiv = $("<div class='result-container'>");
          
          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var topicsImg = $("<img class='result'>");
          topicsImg.attr("src", results[i].images.fixed_height_still.url);
          topicsImg.attr("data-state", "still");
          topicsImg.attr("data-still", results[i].images.fixed_height_still.url);
          topicsImg.attr("data-animate", results[i].images.fixed_height.url);

          singleResultDiv.prepend(topicsImg);
          singleResultDiv.prepend(p);

          resultsContainerSection.prepend(singleResultDiv);
        }

        $("#topics-group").prepend(resultsContainerSection);
      });
  });

  $(document).on("click", ".result", function() {
    var state = $(this).attr("data-state");

    if(state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
      }
  });
renderButtons()
});


    




