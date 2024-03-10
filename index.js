var count = 1;
var sytemSelectedPattern = [];
var userEnteredPattern = [];
var btnArray = ["green", "red", "yellow", "blue"];

$("body").on("keypress", handleKeyPress, );
$(".btn").on("click", function(event){
    var clickedButton = event.target.getAttribute("id");
    pressedAnimation(clickedButton);
    userEnteredPattern.push(clickedButton);
    if (count < 2){
        errorAnimation();
    }
    else{
        ClickCounter(); 
    }
});

function ClickCounter(){
    if (userEnteredPattern.length === sytemSelectedPattern.length){
        var continueGame = compareTwoArrays();
        if (continueGame){
            $("h1").text("Level "+(sytemSelectedPattern.length + 1));
            setTimeout(randomButtonSelection, 500);
        }
        else{
            errorAnimation();
        }
    }
    else if(userEnteredPattern.length <= sytemSelectedPattern.length){
        var continueGame = compareTwoArrays();
        if (!continueGame) errorAnimation();
    }
}

function handleKeyPress(){
    if (count <= 1 ){
        randomButtonSelection();
        $("h1").text("Level "+sytemSelectedPattern.length);
        count++ ;
    }
}

function randomButtonSelection(){
    var randIndex = Math.floor(Math.random() * btnArray.length);
    sytemSelectedPattern.push(btnArray[randIndex])
    pressedAnimation(btnArray[randIndex]);
    userEnteredPattern = [];
}

function pressedAnimation(key){
    $("."+key).addClass("pressed");
    setTimeout(function(){$("."+key).removeClass("pressed");}, 300);
    makeSound(key);
}

function errorAnimation(){
    $("h1").text("Game Over Press any key to restart the Game!");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 300);    
    sytemSelectedPattern = [];
    userEnteredPattern = [];
    count = 1;
    makeSound("wrong");
}

function compareTwoArrays(){
    for (var i = 0; i<userEnteredPattern.length ; i++){
        if (sytemSelectedPattern[i] !== userEnteredPattern[i]) return false;
    }
    return true;
}


function makeSound(key){
    var audioSrc = "./sounds/"+key+".mp3"
    var audioElement = new Audio(audioSrc);
    audioElement.play();
}