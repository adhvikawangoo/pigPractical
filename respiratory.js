// script.js

let questions = [
    {
        prompt: `The respiratory system is made up of the trachea, the lungs and the...`,
        options: [
            "liver",
            "diaphragm",
            "esophagus",
            "pancreas",
        ],
        answer: "diaphragm",
    },

    {
        prompt: `When you inhale your lungs...`,
        options: [
            "inflate",
            "deflate",
            "turn purple",
            "explode",
        ],
        answer: "inflate",
    },

    {
        prompt: `The tiny hairs that keep mucus and dirt out of your lungs are called:`,
        options: [
            "nostrils",
            "stubble",
            "lung hairs",
            "cilia",
        ],
        answer: "cilia",
    },

    {
        prompt: `The voice box is also known as the:`,
        options: [
            "pharynx",
            "nasopharynx",
            "larynx",
            "throat",
        ],
        answer: "larynx",
    },

    {
        prompt: `When you breathe in what happens to the diaphragm?`,
        options: [
            "contracts",
            "flattens",
            "stretches",
            "breaks",
        ],
        answer: "flattens",
    },
];

// Get Elements
//Cited: GeeksForGeeks.org
let questionsEl =
    document.querySelector("#questions");
let timerEl =
    document.querySelector("#timer");
let choicesEl =
    document.querySelector("#options");
let submitBtn = document.querySelector(
    "#submit-score"
);
let startBtn =
    document.querySelector("#start");
let nameEl =
    document.querySelector("#name");
let feedbackEl = document.querySelector(
    "#feedback"
);
let reStartBtn =
    document.querySelector("#restart");

// Quiz's initial state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start quiz and hide frontpage

function quizStart() {
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    let landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loop through array of questions and
// Answers and create list with buttons
function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let promptEl = document.getElementById("question-words");
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(
    function (choice, i) {
        let choiceBtn = document.createElement("button"); // create buttons around each answer choice
            choiceBtn.setAttribute("value", choice); //add answers to buttons
            choiceBtn.textContent = i + 1 + ". " + choice; // number each answer choice
            choiceBtn.onclick = questionClick; 
            choicesEl.appendChild(choiceBtn);
        }
    );
}

// Check for right answers and deduct
// Time for wrong answer, go to next question

function questionClick() {
    if (this.value != questions[currentQuestionIndex].answer) 
	{
        time -= 10; // decrease amount of time by 10 seconds for ever incorrect answer
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = `Wrong! The correct answer was 
        ${questions[currentQuestionIndex].answer}.`;
        feedbackEl.style.color = "red";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (
        currentQuestionIndex ==
        questions.length
    ) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// End quiz by hiding questions,
// Stop timer and show final score

function quizEnd() {
    clearInterval(timerId);
    let endScreenEl =
        document.getElementById(
            "quiz-end"
        );
    endScreenEl.removeAttribute(
        "class"
    );
    let finalScoreEl =
        document.getElementById(
            "score-final"
        );
    finalScoreEl.textContent = time;
    questionsEl.setAttribute(
        "class",
        "hide"
    );
}

// End quiz if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// Save score in local storage
// Along with users' name

function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores =
            JSON.parse(
                window.localStorage.getItem(
                    "highscores"
                )
            ) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem(
            "highscores",
            JSON.stringify(highscores)
        );
        alert(
            "Your Score has been Submitted"
        );
    }
}

// Save users' score after pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert(
            "Your Score has been Submitted"
        );
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;