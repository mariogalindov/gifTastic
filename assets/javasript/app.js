var superArray = ["Superman", "Spiderman", "Iron man", "Batman", "Joker", "Venom", "Green Lantern", "Flash", "Catwoman", "Captain America","Magneto", "Thor", "Hulk", "Bane", "Harley Quinn", "Thanos", "Dr. Doom", "Scarecrow", "Riddler", "Sandman"];

function pushToArray(superSomething){
        var newButton = $("<button>").text(superSomething);
        newButton.attr({"class":"btn btn-info","data-search": superSomething});
        $("#buttons-holder").append(newButton);
};

superArray.forEach(pushToArray);

$(document).ready(function() {

    var key = "k5W1p48qSZBrFEqZi5zAFhSr2zqTk9Iu"

    //Superswathever click event
    $(document).on("click", "button", function(superValue){

        console.log(superValue.target); //preguntar como se accede a la info así
        var buttonValue = $(this).data("search");
        console.log(buttonValue)
        if (buttonValue !== undefined){
            var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key="+key+"&q="+buttonValue+"&limit=10"

            $.ajax({
                url:queryUrl, 
                method: "GET"
            }).then(function(response){
                console.log(response.data)
                //This will generate the gifs for every element in the response.data array
                for(var i=0; i<response.data.length; i++){
                    var gifDiv = $("<div class='divToPlaceGifs'>");
                    var rating = response.data[i].rating;
                    var ratingP = $("<p>").text("Rating: "+rating);
                    var animated = response.data[i].images.fixed_height.url;
                    var still = response.data[i].images.fixed_height_still.url;
                    var gifImg = $("<img>");
                    gifImg.attr("src", still);
                    gifImg.attr("data-still", still);
                    gifImg.attr("data-animated", animated);
                    gifImg.attr("data-state", "still");
                    gifImg.addClass("imageState");
                    gifDiv.append(ratingP);
                    gifDiv.append(gifImg);
                    $("#gifs-place").prepend(gifDiv);
                };
            });
        }
    });

    //Changing state click event
    $(document).on("click", ".imageState", function(){
        console.log("gif clicked")
        var state = $(this).attr("data-state");
        console.log(state)
        console.log(this)
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    })


    //New button click event
    $("#newButton").on("click", function(btnTrigger){
        btnTrigger.preventDefault()
        var btnVal = $("#newButtonVal").val();
        if(btnVal !== ""){
            superArray.push(btnVal);
            pushToArray(btnVal);
            $("#newButtonVal").val(""); //esta pendiente
        }
    });

});