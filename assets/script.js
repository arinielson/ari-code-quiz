var startBtn = document.getElementById('start');
var nextBtn = document.getElementById('next');
var submitBtn = document.getElementById('submit');
var startBox = document.getElementById('start-container');
var quizBox = document.getElementById('main-quiz-container');
var formBox = document.getElementById('form-container');
var hsBox = document.getElementById('hs-container');
var questionEl = document.getElementById('question');
var answerBtnsEl = document.getElementById('answer-btn');
var timerEl = document.getElementById('countdown');
var scoreEl = document.getElementById('score');
var initialsEl = document.getElementById('initials');
var interval;
var count = 45;
var highscores = [];
var score = 0;

let randomQuestions, currentQuestionIndex;

startBtn.addEventListener('click', startQuiz);

function startQuiz() {    
    startBox.classList.add('hide');        
    randomQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    quizBox.classList.remove('hide');    
    countdown();
    setNextQuestion();    
}

function setNextQuestion() {
    resetState();
    showQuestion(randomQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerBtnsEl.appendChild(button);
    })
}

answerBtnsEl.addEventListener('click', answerHandler);

function answerHandler(event) {
    var targetEl = event.target;

    if (targetEl.hasAttribute("data-correct")){
        score++;
        score = score + 100;
    } else {
        count = count - 10;
    }
}

submitBtn.addEventListener('click', function(event){
    event.preventDefault();  
    

    localStorage.setItem("score", score);
    localStorage.setItem("initials", initialsEl.value);
})

function resetState() {
    clearStatusClass(document.body);
    nextBtn.classList.add('hide');
    while (answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild(answerBtnsEl.firstChild);
    }
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;        
    setNextQuestion();        
})

function selectAnswer(e) {
    var selectBtn = e.target;
    var correct = selectBtn.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerBtnsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (randomQuestions.length > currentQuestionIndex + 1){        
        nextBtn.classList.remove('hide');
    } else {       
        clearInterval(interval);        
        quizBox.classList.add('hide');
        formBox.classList.remove('hide');         
    }      
}

function setStatusClass(element, correct) {    
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');         
    } else {                      
        element.classList.add('wrong');                
    }
}

function clearStatusClass(element) {    
    element.classList.remove('correct');        
    element.classList.remove('wrong');    
}

function countdown() {    
    interval = setInterval(function() {
        timerEl.innerHTML=count;
        count--;
        if (count === 0) {
            clearInterval(interval); 
            startBox.classList.add('hide');
            quizBox.classList.add('hide');
            hsBox.classList.add('hide');
            formBox.classList.remove('hide');           
        }
    }, 1000);
}

// Questions-Answers Array
var questions = [
    {
        question: `How do you declare a variable?`,
        answers: [
            {text: `var helloWorld`, correct: true},
            {text: `v helloWorld`, correct: false},
            {text: `variable helloWord`, correct: false},
            {text: `var = helloWorld`, correct: false}
        ]
    },
    {
        question: `How do you create a function in JavaScript?`,
        answers: [            
            {text: `function = myFunction()`, correct: false},
            {text: `function myFunction()`, correct: true},
            {text: `function:function`, correct: false},
            {text: `function()`, correct: false}
        ]
    },
    {
        question: `Which special character(s) add a comment`,
        answers: [
            {text: `//`, correct: true},
            {text: `<!-- -->`, correct: false},
            {text: `~`, correct: false},
            {text: `**`, correct: false}
        ]
    },
    {
        question: `How do you write "Hello!" in an alert box?`,
        answers: [            
            {text: `alertBox("Hello!");`, correct: false},
            {text: `message("Hello!");`, correct: false},
            {text: `box("Hello!");`, correct: false},
            {text: `alert("Hello!");`, correct: true}
        ]
    }
]