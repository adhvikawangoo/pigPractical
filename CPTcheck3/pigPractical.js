let questions = [
    {
        prompt: 'What are the names of the little pouches in the lungs responsible for gas exchange?',
        options: [
            "Alveoli",
            "Bronchioles",
            "Bronchi",
            "Lungs",
        ],
        answer: "Alveoli",
    },

    {
        prompt: 'What is the name of the long-term lung condition caused by damage to alveoli that results in shortness of breath?',
        options: [
            "Asthma",
            "Emphysema",
            "bronchitis",
            "stroke",
        ],
        answer: "Emphysema",
    },

    {
        prompt: 'Bronchitis is caused by the ____________ of bronchial tubes in the lungs',
        options: [
            "bleeding",
            "inflammation",
            "bursting",
            "rotting",
        ],
        answer: "inflammation",
    },

];

// Get Dom Elements

let questionsEl = document.querySelector("#questions");
let choicesEl = document.querySelector("#options");
let submitBtn = document.querySelector("#submit-score");
let answerEl = document.querySelector("#answer");

// Quiz's initial state
let currentQuestionIndex = 0;

// Loop through array of questions and
// Answers and create list with buttons
function getQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let promptEl = document.getElementById("question-words");
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(
        function (choice, i) {
            let choiceBtn =
                document.createElement(
                    "button"
                );
            choiceBtn.setAttribute(
                "value",
                choice
            );
            choiceBtn.textContent =
                i + 1 + ". " + choice;
            choiceBtn.onclick =
                questionClick;
            choicesEl.appendChild(
                choiceBtn
            );
        }
    );
}

// Check for right answers and deduct
// Time for wrong answer, go to next question

function questionClick() {
    if (
        this.value !==
        questions[currentQuestionIndex]
            .answer
    ) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = 'Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.';
        feedbackEl.style.color = "red";
    } else {
        feedbackEl.textContent =
            "Correct!";
        feedbackEl.style.color =
            "green";
    }
    feedbackEl.setAttribute(
        "class",
        "feedback"
    );
    setTimeout(function () {
        feedbackEl.setAttribute(
            "class",
            "feedback hide"
        );
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

// Save score in local storage
// Along with users' name

function saveHighscore() {
    let name = nameEl.value.trim();
    if (name != "") {
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
    if (event.key == "Enter") {
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

function openModal(src) {
            document.getElementById("modalImage").src = src;
            document.getElementById("myModal").style.display = "block";
        }

        function closeModal() {
            document.getElementById("myModal").style.display = "none";
        }