$(document).ready(function() {

    $("#time-remaining").hide();

    //  Variable that will hold our setInterval that runs the stopwatch
    var intervalId = "";

    // prevents the clock from being sped up unnecessarily
    var clockRunning = false;
    var countdown = 20;

    var slides;
    let currSlide = 0;

    var correctAnswerString = "";
    var correctAnsLetter = "";

    var labelText;

    let delay = 3000;

    let message = "";

    var wins = 0;
    var losses = 0;
    var unAns = 0;

    // create game as object
    // create an object containing arrays for each possible question

    var myQuestions = [
        {
            question : "How many times has Ross been divorced?",
            answers : {
                a : "5",
                b : "2",
                c : "1",
                d : "3"
            },
            correctAns : "d"
        },
        {
            question : 'How many types of towels does Monica have?',
            answers : {
                a : "3",
                b : "11",
                c : "8",
                d : "6"
            },
            correctAns : "b"
        },
        {
            question : "What does Joey love to eat?",
            answers : {
                a : "Apples",
                b : "Sandwiches",
                c : "Fish",
                d : "Cake"
            },
            correctAns : "b"
        },
        {
            question : "Who is actually a chef?",
            answers : {
                a : "Monica",
                b : "Chandler",
                c : "Ross",
                d : "Rachel"
            },
            correctAns : "a"
        },
        {
            question : "Who stole Monica's thunder after she got engaged?",
            answers : {
                a : "Rachel",
                b : "Phoebe",
                c : "Emily",
                d : "Carol"
            },
            correctAns : "a"
        },
        {
            question : "Who hates Thanksgiving?",
            answers : {
                a : "Ross",
                b : "Rachel",
                c : "Chandler",
                d : "Joey"
            },
            correctAns : "c"
        },
        {
            question : "Who thinks they're always the last to find out everything?",
            answers : {
                a : "Ross",
                b : "Phoebe",
                c : "Monica",
                d : "Chandler"
            },
            correctAns : "b"
        }
    ];

    $('#btn-start').on('click', function(){
       startGame();
    });

    function startGame(){

        currSlide = 0;
        index = 0;
        var questionArr = [];
        [wins, losses, unAns] = [0, 0, 0];
        clearInterval(intervalId);

        // show timer div
        $("#time-remaining").show();

        // show game div
        $(".quiz-container").show();
        
        // hide button
        $('#btn-start').hide();
        
        var $gameDiv = $('#quiz');

        myQuestions.sort( () => Math.random() - 0.5);
        

        myQuestions.forEach((currQuestion, questionIndex) => { // value, index!!!
            const answers = [];
            for(letter in currQuestion.answers){

                 answers.push(
                            `<li class="answer" data-number="${questionIndex}" data-answer="${letter}"><a>${currQuestion.answers[letter]}</a></li>`
                        );
            }
            questionArr.push(`
                            <div class="slide">
                            <div class="question">${currQuestion.question}</div>
                            <div class="answers"><ul>${answers.join("")}</ul></div></div>`);
        });
        
        $gameDiv.html(questionArr.join(""));

        slides = document.querySelectorAll(".slide");
        nextQuestion(0);
    }

    /**
     * nextQuestion
     */
    var nextQuestion = function(n){
        
        countdown = 14;
        $("#countdown").removeClass("last-seconds");
        $("#countdown").removeClass("beating");
        $("#countdown").text(countdown);

        // to prevent timer speed up
        if(!clockRunning){
            count();
            intervalId = setInterval(count, 1000);
        }
        
        // slide to next question if there is any
        if(n !== slides.length){
            slides[currSlide].classList.remove('active-slide');
            slides[n].classList.add('active-slide');
            currSlide = n;
        }
        else {
            clearInterval(intervalId);
            var $gameDiv = $('#quiz');
            $gameDiv.html(`<h2>All Done here is how you did!</h2>
                           <p>Correct Answers: ${wins}</p>
                           <p>Incorrect Answers: ${losses}</p>
                           <p>Unanswered: ${unAns}</p>
                           <a class="button">Start Over?</a>`);
        }
        
    }

    function count() {
        var hidden = $("#help");
        if(countdown > -1 && currSlide < Object.keys(myQuestions).length){
            $('#countdown').text(countdown);
            
            countdown--;
            if(countdown === 9){
                hidden.animate({"left":"0px"}, "slow").removeClass('visible');
            }
            if(countdown === 4){
                $('#countdown').addClass('last-seconds');
                $('#countdown').addClass('beating');
            }
        }
        else if(countdown === -1){ // === 0
            
            hidden.animate({"left":"-360px"}, "slow").addClass('visible');

            unAns++;
            clearInterval(intervalId);

            var resultsDiv = $("#result");
            resultsDiv.empty();

            message = "<h2>Out of Time!</h2>";
            resultsDiv.append(message);
            labelText = `<p>The correct answer was: ${correctAnswerString}</p>`;
            resultsDiv.append(labelText);
            var gif = $('<img>');
            gif.attr('src', "https://media.giphy.com/media/yoJC2oBVm4Dqhuidzy/giphy.gif");
            resultsDiv.append(gif);

            // inmediate result div
            $("#quiz").hide();
            resultsDiv.show();
            setTimeout(quickSlide, delay);
        }
        
    }

    /**
     * showResult
     */
    var showResult = function(){

        var hidden = $("#help");
        hidden.animate({"left":"-360px"}, "slow").addClass('visible');
        
        correctAnsLetter = myQuestions[currSlide].correctAns;
        correctAnswerString = myQuestions[currSlide].answers[correctAnsLetter];

        var resultsDiv = $("#result");
        resultsDiv.empty();
        var gif = $('<img>');

        // is correct
        if($(this).attr("data-answer") === correctAnsLetter){
            wins++;
            clearInterval(intervalId);
            
            message = "<h2>Correct!</h2>";
            resultsDiv.append(message);
            gif.attr('src', "https://media.giphy.com/media/lI6nHr5hWXlu0/giphy.gif");
            resultsDiv.append(gif);

            // inmediate result div
            $("#quiz").hide();
            resultsDiv.show();
            setTimeout(quickSlide, delay);
        }
        // is not correct
        else if($(this).attr("data-answer") != correctAnsLetter) { 
            losses++;
            clearInterval(intervalId);
            
            message = "<h2>Nope!</h2>";
            resultsDiv.append(message);
            labelText = `<p>The correct answer was: ${correctAnswerString}</p>`;
            resultsDiv.append(labelText);
            gif.attr('src', "https://media.giphy.com/media/rVouyGkIQYsnu/giphy.gif");
            resultsDiv.append(gif);

            // inmediate result div
            $("#quiz").hide();
            resultsDiv.show();
            setTimeout(quickSlide, delay);
        }

    }

    // method to remove previous question results and options
    var quickSlide = function(){

        // hide results
        $("#result").hide()
        $("#quiz").show();
        
        // begin next question
        nextQuestion(currSlide+1);
        
    }

    var hint = function(){
        // a
        //correctAnsLetter = myQuestions[currSlide].correctAns;
        //var test = $(".button").data("data-number", correctAnsLetter).data();
        
    }

   
    // Generic function for displaying the movieInfo
    $(document).on("click", ".answer", showResult);
    $(document).on("click", ".button", startGame);
        
});