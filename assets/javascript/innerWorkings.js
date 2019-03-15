// var buttonList = [animals of the ocean]
var buttonList =
["sea lion", 
"whales",
"sharks",
"turtle",
"crab",
"octopus",
"manta ray",
"narwhal"];

// function printButtonList(){empty();
    // forLoop(buttonList){add class "clickButton".attr("value", buttonList[i]
    // append all}
    // print ButtonList;
function printButtonList(){
        console.log("printButtonList()")
        $('#buttonList').empty();
        var newDiv = $('<div>');

        buttonList.forEach(function(element){
            var newButton = $('<button>'+element+'</button>').addClass("clickButton").attr("value", element);
            newDiv.append(newButton);
        });

        $('#buttonList').append(newDiv);
};

function printGifs(arrayObject, targetDiv){
        console.log(arrayObject);
        arrayObject.forEach(function(object){
            var newCard = $('<div>').addClass("gifCard","col-md-4", "justify-space-between");
            var newTitle = $('<h4>'+object.title+'</h4>');
            var newRating = $('<p> Rating:'+object.rating+'</p>');
            var newGif = $('<img>')
            .addClass("gifAnimate")
            .attr("src", object.images.fixed_width_still.url)
            .attr("valueFlag", "still")
            .attr("data-gifLink", object.images.fixed_width.url)
            .attr("data-stillLink", object.images.fixed_width_still.url);
            console.log(object.title + ""+ object.rating+""+object.images.fixed_width_still.url)
            newCard.append(newGif);
            newCard.append(newRating);
            newCard.append(newTitle);
            $('#gifDisplay').append(newCard);
        });
    // forLoop(arrayObject){
    // build card (bootstrap card col-md-4)
    // -append title
    // -append rating
    // -add class to gif .gifAnimate
    // -add style="border 2px black"
    // -append gifLink animate
    // -append gifLink stillImage
    // -add valueFlag=still
    // -set value src=stillImage
};


$(document).ready(function(){

    printButtonList();

    // function formSubmit(){buttonList.push(newButton);
    // printButtonList();
    // clear form val("");
    $('#submitButton').click(function(e){
        e.preventDefault();
        var newButtonElement = $('#newButtonInput').val();
        buttonList.push(newButtonElement);
        printButtonList();
        $('#newButtonInput').val("");
    });
    

    $('#buttonList').on("click", ".clickButton", function(){
        $('#gifDisplay').empty();
        var searchTerm = $(this).attr("value");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=EHOyCqQDv7IO8ezUFOtjjSJy9QVFbZZN&q="+searchTerm+"&limit=10&offset=0&rating=G&lang=en";
    // im supposed to use these: `q``limit``rating`
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(response);
                var newResponse = response.data;
                printGifs(newResponse, "#gifDisplay");   
            });    
        
        });
        
    

    $('#gifDisplay').on("click",".gifAnimate", function(){
        
        if(($(this).attr("valueFlag") === "still")){
            $(this).attr("src", $(this).attr("data-gifLink"));
            $(this).attr("valueFlag", "animate");
        // set this.src= gifLink animate
        // set valueFlag = animate
        }else{
            $(this).attr("src", $(this).attr("data-stillLink"));
            $(this).attr("valueFlag", "still");
        // set this.src= gifLink stillImage
        // set valueFlag = stillImage
        }
    });
});