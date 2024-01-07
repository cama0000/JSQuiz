const questions = [
    {
        question: "How many planets are there?",
        answers: [
            { text: "9", correct: false},
            { text: "5", correct: false},
            { text: "8", correct: true},
            { text: "7", correct: false},
        ]
    },
    {
        question: "Which is NOT a C variant?",
        answers: [
            { text: "C++", correct: false},
            { text: "C--", correct: true},
            { text: "C#", correct: false},
        ]
    },
    {
        question: "How do you print a statement in JavaScript?",
        answers: [
            { text: "System.out.print()", correct: false},
            { text: "cout", correct: false},
            { text: "console.log()", correct: true},
            { text: "print()", correct: false},
        ]
    },
    {
        question: "What year is it?",
        answers: [
            { text: "2024", correct: true},
            { text: "2023", correct: false},
            { text: "1993", correct: false},
        ]
    },
    {
        question: "How many letters in the English alphabet?",
        answers: [
            { text: "28", correct: false},
            { text: "25", correct: false},
            { text: "5", correct: false},
            { text: "26", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const messageCorrect = document.getElementById("message");
const usernameBox = document.getElementById("username-box");
const usernameBtn = document.getElementById("usernameBtn");

let currentQuestionIndex = 0;
let score = 0;
let hiScore = 0;
let username;

//use only for testing
//localStorage.clear();

function addUsername(){
    if(usernameBox.value != ""){
        nextButton.disabled = false;
        username = usernameBox.value;
    }
    else{
        alert("Enter a username.");
    }
}

function begin(){
    nextButton.disabled = true;
    usernameBox.style.display = "block";
    usernameBtn.style.display = "block";
    questionElement.innerHTML = "Welcome to the quiz. Set a username then begin!";

    if(localStorage.getItem("userScore") != null){
        questionElement.innerHTML += "<br> Username: " + localStorage.getItem("username");
        questionElement.innerHTML += "<br> High Score: " + localStorage.getItem("userScore");
    }

    nextButton.innerHTML = "Begin Quiz";
    nextButton.style.display = "block";
}

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next Question";
    usernameBox.style.display = "none";
    usernameBtn.style.display = "none";

    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        
        messageCorrect.innerHTML = "You are CORRECT";
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
        messageCorrect.innerHTML = "You are INCORRECT";
    }

    messageCorrect.style.display = "block";

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function resetState(){
    nextButton.style.display = "none";
    messageCorrect.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showScore(){
    resetState();
    let message = username + ", ";

    if(score > questions.length - 2){
        message += "you are so smart.";
    }
    else{
        message += "you are really dumb.";
    }
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! <br> ${message}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

    if(hiScore <= score){
        hiScore = score;
        localStorage.setItem("userScore", hiScore);
        localStorage.setItem("username", username);
    }
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(nextButton.innerHTML === "Begin Quiz"){
        startQuiz();
    }
    else if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        begin();
    }
});

begin();