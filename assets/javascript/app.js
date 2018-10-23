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
    let currSlide = 0;
    let questionNumber = 0;
    // isCorrect
    

    $('#btn-start').on('click', function(){

        $(".quiz-container").css("display", "block");
        
        var questionArr = [];
        // erase button
        $('#btn-start').css('display', 'none');

        // Use setInterval to start the count here and set the clock to running.
        //intervalId = setInterval(count, 1000);
        
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
        });
        
        $gameDiv.html(questionArr.join(""));

        slides = document.querySelectorAll(".slide");
        pagination(0);
        
    });
    

    var pagination = function(n){
        slides[currSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currSlide = n;
    }

    var showResult = function(letter){
        console.log("correct answer is " + letter);
    }

    var isCorrect = function(){
        // code here
        var questionNumber = parseInt($(this).attr("data-number"));
        var correctAnsLetter = myQuestions[questionNumber].correctAns;
        var correctAnswerString = myQuestions[questionNumber].answers[correctAnsLetter];
        var userChoice = $(this).attr("data-answer");

        if ((userChoice === correctAnsLetter) ? pagination(currSlide + 1) : showResult(correctAnswerString));
    }

    // Generic function for displaying the movieInfo
    $(document).on("click", ".answer", isCorrect);

    

    

    function count() {
        //  TODO: increment time by 1, remember we cant use "this" here.
        
    
        //  TODO: Get the current time, pass that into the stopwatch.timeConverter function,
        //        and save the result in a variable.
        //var time = stopwatch.timeConverter(stopwatch.time);
    
        //  TODO: Use the variable you just created to show the converted time in the "display" div.
        $timeRemainingDiv = $('#time-remaining');
        $timeRmn = $(`<h3>Time Remaining: ${timeRemaining} seconds</h3>`);
        
        // display rule #1
        $timeRemainingDiv.html($timeRmn);
        timeRemaining--;
        if(timeRemaining == -1)
            clearInterval(intervalId);
    
    }
});