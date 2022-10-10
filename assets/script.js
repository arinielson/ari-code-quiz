var startBtn = document.getElementById('start');
var startBox = document.getElementById('start-container');
var quizBox = document.getElementById('main-quiz-container');
var questionEl = document.getElementById('question');
var answerBtnsEl = document.getElementById('answer-btn')

let randomQuestions, currentQuestionIndex;

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    console.log('Started');
    startBox.classList.add('hide');
    randomQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    quizBox.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(randomQuestions[currentQuestionIndex])
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

function resetState() {
    while (answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild
        (answerBtnsEl.firstChild)
    }
}

function selectAnswer(e) {
    var selectBtn = e.target;
    var correct = selectBtn.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(answerBtnsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
}

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
        question: `What is the correct what to write an array?`,
        answers: [            
            {text: `var pets = cats, dogs, birds`, correct: false},
            {text: `var pets = (cats), (dogs), (birds)`, correct: false},
            {text: `var pets = ["cats", "dogs", "birds"]`, correct: true},
            {text: `var pets = ("cats", "dogs", "birds")`, correct: false}
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