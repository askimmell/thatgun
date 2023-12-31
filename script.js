const questions = [
    {
        question: "Question?",
        answers: [
            { text: "Big", correct: false},
            { text: "Very Big", correct: false},
            { text: "o", correct: false},
            { text: "e", correct: true},
        ]
    },
    {
        question: "Question??",
        answers: [
            { text: "Big", correct: false},
            { text: "Very Big", correct: false},
            { text: "o", correct: true},
            { text: "e", correct: false},
        ]
    },
    {
        question: "Question??",
        answers: [
            { text: "Big", correct: false},
            { text: "Very Big", correct: true},
            { text: "o", correct: false},
            { text: "e", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

var audio = document.getElementById('audio');
var playPauseBTN = document.getElementById('playPauseBTN');
var count = 0;

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Score: ${score}/${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

function playPause(){
    if(count == 0){
        count = 1;
        audio.play();
        playPauseBTN.innerHTML = "Pause &#9208;";
    }else{
        count = 0;
        audio.pause();
        playPauseBTN.innerHTML = "Play &#9208;";
    }
}

startQuiz();

