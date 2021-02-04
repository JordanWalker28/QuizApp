const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion ={};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions =[];

let questions = [

    {
        question: "Who wrote Star Wars?",
        choice1:"George Lucas",
        choice2:"Matt Hancock",
        choice3:"Hayden Christianson",
        choice4:"Harrison Ford",
        answer: 1
    },
    {
        question: "What is 10 * 10?",
        choice1:"10",
        choice2:"100",
        choice3:"1000",
        choice4:"10000",
        answer: 2
    },
    {
        question: "Where is Blencathra?",
        choice1:"Cumbria",
        choice2:"Scotland",
        choice3:"Wales",
        choice4:"Ireland",
        answer: 1
    }
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        return window.location.assign("end.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e =>{

        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"]

        const classToApply = (selectedAnswer == currentQuestion.answer) ? 'correct' : 'incorrect';

        if(classToApply ==='correct'){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        },2000);
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();