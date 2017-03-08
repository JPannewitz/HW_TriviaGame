

var questions = [{
    question: "What is the name of the original Flash?",
    choices: ["Wally West", "Bart Allen", "Barry Allen", "Jay Garrick"],
    correctAnswer: 2
}, {
    question: "What is Superman's real name?",
    choices: ["Peter Parker", "Clark Kent", "Kal-El", "Bruce Wayne"],
    correctAnswer: 2
}, {
    question: "Which Robin did the Joker kill?",
    choices: ["Dick Grayson", "Alfred Pennyworth", "Tim Drake", "Jason Todd"],
    correctAnswer: 3
}, {
    question: "Which one of the following can bring someone back to life in the DC Universe?",
    choices: ["Lazarus Pit", "The Multiverse", "Cosmic Treadmill", "Kryptonite"],
    correctAnswer: 0
}, {
    question: "Which villian is Harley Quinn devoted to?",
    choices: ["The Riddler", "The Joker", "Clayface", "Two-face"],
    correctAnswer: 1
}];





  


var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    var count=11;

var counter; //1000 will  run it every 1 second

function timer()
{
  count=count-1;
  if (count < 0)
  {
     clearInterval(counter);
     console.log("Time's up!");
    $(".result").text("Time's up- on to the next question!");
     currentQuestion++;
     displayCurrentQuestion();
     resetTimer();
     return;
  }
  document.getElementById("timer").innerHTML=count + " seconds";
}

function resetTimer() {
    clearInterval(counter);
    count = 11;
    counter = setInterval(timer, 1000);
}

resetTimer();



    
    $("button").hide();
    // Displays first question
    displayCurrentQuestion();

    
    $('.choiceList').on('click', 'input:radio', function() {
                      
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();


                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                    $(".result").text("Correct answer!");
                } else {
                    var index = parseInt(questions[currentQuestion].correctAnswer)
                    $(".result").text("Wrong answer! Correct answer was: " + questions[currentQuestion].choices[index]);
                }

                currentQuestion++; 

                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                    resetTimer();
                    $("button").hide();

                } else {
                    displayScore();
                    
                    $("button").show();
                    quizOver = true;
                }
            
        } else { 
            quizOver = false;
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }

 
    });


$('button').on('click', function() {
        resetQuiz();
       displayCurrentQuestion();
       resetTimer();
    });

});

// This displays the current question + choices
function displayCurrentQuestion() {
    

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".questionContainer > .question");
    var choiceList = $(document).find(".questionContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;


    $(questionClass).text(question);

    
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
    $("button").hide();      
}

function displayScore() {
    $(document).find(".questionContainer > .result").text("You scored: " + correctAnswers + " out of " + questions.length);
    $(document).find(".questionContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}

