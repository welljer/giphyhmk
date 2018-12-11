"use strict"
    // my array
    var topic = ["Transformers","He man","The Tick","Digimon","Voltron"];
    
    //function that displays the giphy buttons
    
    function displayGifButtons() {
        $("#gifButtonsView").empty();
        for (var i = 0; i < topic.length; i++) {
            var createdButton = $("<button>");
            createdButton.addClass("cartoon");
            createdButton.addClass("btn btn-primary")
            createdButton.attr("data-name", topic[i]);
            createdButton.text(topic[i]);
            $("#gifButtonsView").append(createdButton);
        }
    }
    
    //function to add new button
    
    function addNewButton() {
        $("#addGif").on("click", function() {
        var cartoon = $("#topicInput").val().trim();
            if (cartoon === ""){
    // Rejects empty buttons//
                return false;
            }
            topic.push(cartoon);
            displayGifButtons();
            return false;
            });
    }
    
    // function that displays the giphys
    
    function displayGifs() {
        var cartoon = $(this).attr("data-name");
        console.log(cartoon)
        // var apiKey = "2C3COcAWeZBS1aQpza5H2ajkLY9mjJso"
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=2C3COcAWeZBS1aQpza5H2ajkLY9mjJso" + "&q="+ cartoon;
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .then(function(response) {
            console.log(response)
            $("#gifsView").empty();
    //show results of giphys
        var results = response.data;
            if (results === ""){
                alert("There is not a giffy for this request!");	
            }
            for (var i = 0; i < results.length; i++){
    //put gifs in a div
        var gifDiv = $("<div1>");
    //pull rating of gif
        var gifRating = $("<p>").text("Rating " + results[i].rating);
                gifDiv.append(gifRating);
    
    //pull gif
        var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
    //still images
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
    //animate images
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
    //how images come in, already animated
                gifImage.attr("data-state", "animate");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
    //add new div to existing divs
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    
    // calling functions and methods
    displayGifButtons();
    addNewButton();
        
    //event listeners
    $(document).on("click", ".cartoon", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
});