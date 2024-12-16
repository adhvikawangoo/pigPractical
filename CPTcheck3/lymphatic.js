// script.js

let questions = [
    {
        prompt: `The lymphatic system consists of: `,
        options: [
            "lymphatic vessels and lymphoid organs",
            "all of the plasma component of the bloodstream",
            "all fluids inside the body's cells",
            "all liquids in the body whether inside cells or in spaces between tissues",
        ],
        answer: "lymphatic vessels and lymphoid organs",
    },

    {
        prompt: `Lymph is prevented from flowing backwards by: `,
        options: [
            "blood pressure",
            "suction from contracting lymph nodes",
            "one-way valves",
            "cilia lining the lymphatic system",
        ],
        answer: "Diaphragm",
    },

    {
        prompt: `The subclavian veins are cardiovascular veins in the abdomen.`,
        options: [
            "true",
            "false",
        ],
        answer: "true",
    },

    {
        prompt: `Lymph flows from lymphatic capillaries into ever-larger lymphatic vessels and finally to a lymphatic duct.`,
        options: [
            "true",
            "false",
        ],
        answer: "true",
    },

    {
        prompt: `The tonsils and adenoids (pharyngeal tonsils) are composed of partly encapsulated lymph nodules.`,
        options: [
            "true",
            "false",
        ],
        answer: "true",
    },
    {
        prompt: `What organ belongs to the lymphatic system?`,
        options: ["Heart", "Spleen", "Stomach", "Lungs"],
        answer: "Spleen"
    },
    {
        prompt: `Where is the Thymus located?`,
        options: ["behind the ear", "in front of the sternum", "behind the sternum", "near the pelvis"],
        answer: "behind the sternum"
    },
    {
        prompt: `What is the shape of a lymph node?`,
        options: ["Oval", "Circle", "Semi-circle", "All of the above"],
        answer: "Oval"
    },
    {
        prompt: `What is lymph made of?`,
        options: ["red blood cells", "white blood cells", "calcium", "sodium"],
        answer: "white blood cells"
    },
    {
        prompt: `What system does the lymphatic system derive from in embryonic development?`,
        options: ["Digestive", "Integumentary", "Skeletal", "Circulatory"],
        answer: "Circulatory"
    },
    {
        prompt: `What is elephantiasis?`,
        options: ["Infection of the lymph vessels", "Allergy to elephants", "Infection of a mosquito bite", "All of the above"],
        answer: "Infection of the lymph vessels"
    },
    {
        prompt: `What does bone marrow do for the lymphatic system?`,
        options: ["Make red blood cells", "Make lymphocytes", "Support the body", "Metabolize lactic acid"],
        answer: "Make lymphocytes"
    },
    {
        prompt: `What pumps lymph through the muscles?`,
        options: ["The Heart", "Muscles", "The lymph pump", "All of the above"],
        answer: "Muscles"
    },
    {
        prompt: `Where are most of the lymph nodes located?`,
        options: ["The neck, armpit, and groin", "The arms and legs", "Hands and feet", "The fingernails"],
        answer: "The neck, armpit, and groin"
    },
    {
        prompt: `What do lymph nodes do?`,
        options: ["They store antibodies", "Make lymph", "All of the above", "None of the above"],
        answer: "They store antibodies"
    }
];

// Get Elements
//Cited: GeeksForGeeks.org
let questionsEl =
    document.querySelector(
        "#questions"
    );
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

//amount of time per question is 10, multiplied by number of questions
let currentQuestionIndex = 0;
let time = questions.length * 10;
let timerId;

// Function to randomize the questions array
function randomizeQuestions(questionsArray)
{
if(questionsArray.length < 1)
{
return "no questions for this topic";
}
else
{
for (let i = questionsArray.length - 1; i > 0; i--)
{
// Generate a random index from 0 to i
let randomIndex = Math.floor(Math.random() * (i + 1));

// Swap the current element with the random element
let temp = questionsArray[i];
questionsArray[i] = questionsArray[randomIndex];
questionsArray[randomIndex] = temp;
}
}
}

// Start quiz and hide frontpage
function quizStart() {
    // Randomize the questions before starting the quiz
    randomizeQuestions(questions);

    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;
    let landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loop through array of questions and answers and create list with buttons
function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let promptEl = document.getElementById("question-words");
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function (choice, i) {
        let choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Check for right answers and deduct time for wrong answer, go to next question
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
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
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// End quiz by hiding questions, Stop timer and show final score
function quizEnd() {
    clearInterval(timerId);
    let endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    let finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

// End quiz if timer reaches 0
function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quizEnd();
    }
}

// Save score in local storage along with users' name
function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        alert("Your Score has been Submitted");
    }
}

// Save users' score after pressing enter
function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert("Your Score has been Submitted");
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit
submitBtn.onclick = saveHighscore;

// Start quiz after clicking start quiz
startBtn.onclick = quizStart;
