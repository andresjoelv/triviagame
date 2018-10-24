$(document).ready(function() {
    // create game as object
    // create an object containing arrays for each possible question

    var myQuestions = [
        {
            question : "What was the first full length CGI movie",
            answers : {
                a : "A Bug's Life",
                b : "Monsters Inc.",
                c : "Toy Story",
                d : "The Lion King"
            },
            correctAns : "c"
        },
        {
            question : 'Which one of this is NOT a name of one of the Spice Girls',
            answers : {
                a : "Sporty Spice",
                b : "Fred Spice",
                c : "Scary Spice",
                d : "Posh Spice"
            },
            correctAns : "b"
        },
        {
            question : "Which NBA team won the most titles in the 90s",
            answers : {
                a : "New York Knicks",
                b : "Portland Traiblazers",
                c : "Los Angeles Lakers",
                d : "Chicago Bulls"
            },
            correctAns : "d"
        },
    ];

    //  Variable that will hold our setInterval that runs the stopwatch
    var intervalId;
    // prevents the clock from being sped up unnecessarily
    var clockRunning = false;

    var timeRemaining = 5;
    var answersVar;

    var slides;
    var answerSlide;
    let currSlide = 0;
    let questionNumber = 0;
    // isCorrect

    var correctBoolean;
    var correctAnswerString = "";

    var correctAnsLetter = "";

    var labelText;
    var label;
    var result;

    let index = 0;

    $('#btn-start').on('click', function(){

        $(".quiz-container").css("display", "block");
        
        var questionArr = [];
        // erase button
        $('#btn-start').css('display', 'none');

        // Use setInterval to start the count here and set the clock to running.
        // if (!clockRunning) {
        //     intervalId = setInterval(count, 1000);
        //     clockRunning = true;
        //   }
        // count();
        
        
        var $gameDiv = $('#quiz');

        myQuestions.forEach((currQuestion, questionIndex) => { // value, index!!!
            const answers = [];
            for(letter in currQuestion.answers){

                 answers.push(
                            `<li><a class="answer" data-number="${questionIndex}" data-answer="${letter}">${currQuestion.answers[letter]}</a></li>`
                        );
            }
            questionArr.push(`<div class="slide">
                            <div class="question">${currQuestion.question}</div>
                            <div class="answers"><ul>${answers.join("")}</ul></div></div>`);
            questionArr.push(`<div class="slide result" >
                            <div id="answer-slide-label-${questionIndex+1}"></div>
                            <div id="answer-result-${questionIndex+1}"></div></div>`);
        });
        
        $gameDiv.html(questionArr.join(""));

        slides = document.querySelectorAll(".slide");
        pagination(0);

        
        
    });
    

    var pagination = function(n){
        //console.log("10s");
        slides[currSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currSlide = n;
    }

    var showResult = function(){
        
        index++;

        correctAnsLetter = myQuestions[index-1].correctAns;
        correctAnswerString = myQuestions[index-1].answers[correctAnsLetter];

        labelText = "The correct answer was:";
        label = $(`#answer-slide-label-${index}`);
        result = $(`#answer-result-${index}`);

        if(correctBoolean)
            label.text("Correct");
        else{
            label.text("Oops!");
            result.text(labelText + " " + correctAnswerString);
        }
    }

    var next = function(){
        pagination(currSlide + 1);
        showResult();
        setTimeout(function(){pagination(currSlide + 1)}, 2000);
    }

    var isCorrect = function(){
        // code here
        clearInterval(intervalId);
        
        //var questionNumber = parseInt($(this).attr("data-number"));
        correctAnsLetter = myQuestions[index].correctAns;
        correctAnswerString = myQuestions[index].answers[correctAnsLetter];
        var userChoice = $(this).attr("data-answer");
        correctBoolean = false;

        if (userChoice === correctAnsLetter) correctBoolean = true;
        next();
        
    }

    // Generic function for displaying the movieInfo
    $(document).on("click", ".answer", isCorrect);

    function reset(){
        timeRemaining = 5;
    }
    
    
    function count() {
        //  TODO: increment time by 1, remember we cant use "this" here.
        
    
        //  TODO: Use the variable you just created to show the converted time in the "display" div.
        $timeRemainingDiv = $('#time-remaining');
        $timeRmn = $(`<h3>Time Remaining: ${timeRemaining} seconds</h3>`);
        
        // display rule #1
        $timeRemainingDiv.html($timeRmn);
        timeRemaining--;
        if(timeRemaining == -1){ // runs out of time
            clearInterval(intervalId);
            next();
            reset();
        }
    
    }
});