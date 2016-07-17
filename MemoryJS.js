// Global variables here
var numberOfDigits = 3; // This will be the starting point
var currentDigitsStringInStringFormat;
var numOfRounds = 0;
var minSucceed = 0; // you remebered at least 1 on the two trials in the digits series. 
var maxSucceed = 0; // you remembered 2 of the trials inthe same digit-series
var numOfErrors = 0; // Gamelogic is: if two consecutive fails in the same number of digits -> STOP the test
var numOfSuccess = 0; // Game logic: if you succeed 2 consecutive in the same Digits-number --> that's your Max memory length

$(document).ready(function () {

    $('#btnSubmit').on("click", checkAnswer);

    startRound(3);

});




function startRound(numDigits) {
    $('#headline').show().html('Try to recall the next ' + numDigits + " digits");
    $('#displayDigits').html('').show();
    $('#userInput').hide();

    var digitsToDisplay = prepareDigitsString(numDigits);
    var varisFinished = false;
    console.log(digitsToDisplay);

    // Display the digits
    digitCounter = -1; // this is my starting point..... will turn to 0 soon...

    // This is a self-invoking, recursive function. 
    //   http://patrickmuff.ch/blog/2014/03/12/for-loop-with-delay-in-javascript/


    (function next() {

        if (digitCounter++ >= numDigits) {
            $('#displayDigits').fadeOut(500);

            displayInputElements();
            return;
        }
        setTimeout(function () {
            $('#displayDigits').html(digitsToDisplay[digitCounter]);
            next();
        }, 1400);
    })();

}



function prepareDigitsString(numOfDigits) {
    var finalString = [];
    var chooseFrom = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    currentDigitsStringInStringFormat = ''; // Reset this variable

    for (var i = 0; i < numOfDigits; i++) {
        var digitPlace = Math.floor((Math.random() * chooseFrom.length));
        var chosenDigit = chooseFrom[digitPlace];
        // Now we need to add the Chosen digit to our final digits string, PLUs remove it from the digits Pool:
        finalString.push(chosenDigit); //build the final string
        chooseFrom.splice(digitPlace, 1); // remove the selected digits, so there will be no repeats
        currentDigitsStringInStringFormat += chosenDigit.toString();
    }
    return finalString;
}

function displayInputElements() {
    $('#inputBox').val('');
    $('#userInput').show();
    $('#displayDigits').hide();
    $('#inputBox').select();
    
    
}

function checkAnswer() {
    numOfRounds += 1;
    var userAnswer = $('#inputBox').val();

    if (numOfRounds == 1) {

        if (userAnswer == currentDigitsStringInStringFormat) { // RIGHT
            console.log("Right");
            showMessage('correct');
            numOfSuccess += 1;
            minSucceed = numberOfDigits;
            console.log("min Success achieved, and it is: " + minSucceed + " digits");
            startRound(numberOfDigits);

        } else { // WRONG
            console.log("WRONG");
            showMessage('incorrect');
            numOfErrors += 1
            startRound(numberOfDigits);
        }
    }

    if (numOfRounds == 2) {

        if (userAnswer == currentDigitsStringInStringFormat) { // RIGHT
            console.log("Right");
            showMessage('correct');
            numOfSuccess += 1;

            if (numOfSuccess == 1) {
                minSucceed = numberOfDigits;
                console.log("min Success achieved, and it is: " + minSucceed + " digits");
            }
            if (numOfSuccess == 2) {
                maxSucceed = numberOfDigits;
                console.log("MAX Success achieved, and it is: " + minSucceed + " digits");
            }

            // Now for the next round
            numOfSuccess = 0;
            numOfErrors = 0;
            numberOfDigits += 1;
            numOfRounds = 0;
            startRound(numberOfDigits);

        } else { // WRONG
            console.log("WRONG");
            showMessage('incorrect');
            numOfErrors += 1

            if (numOfErrors == 2) {
                alert("This is the end of the test");

            } else {
                // Now for the next round
                numOfSuccess = 0;
                numOfErrors = 0;
                numOfRounds = 0;
                numberOfDigits += 1;
                startRound(numberOfDigits);
            }
        }
    }
}

function showMessage(response) {
    if(response == 'correct') {
        $('#message').show().html("Correct !").fadeOut(900);
    }
    
    if(response == 'incorrect') {
        $('#message').show().html("Incorrect :(").fadeOut(900);
    }
}
