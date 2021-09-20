/* Functions for the Startbtn, Load a Question and hide the start button */

const startBtn = document.getElementById("startBtn");
const highscoreBtn = document.getElementById("highscoreBtn");
const submitBtn = document.getElementById("submitBtn");
const homeBtn = document.getElementById("homeBtn");
const clearBtn = document.getElementById("clearBtn");

/* Screen display for each page */
const introScreen = document.getElementById("introScreen");
const quizScreen = document.getElementById("quizScreen");
const submitScreen = document.getElementById("submitScreen");
const highscoreScreen = document.getElementById("highscoreScreen");

/* Text display inputs the text into Html */
const scoreEl = document.getElementById("scoreEl");
const timerEl = document.getElementById("timerEl");
const question = document.getElementById("question");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");
const initialEl = document.getElementById("initialEl");
const finalscoreEl = document.getElementById("finalscoreEl");
const highscoreList = document.getElementById("highscoreList");

var currentQuestion = 0;
var questionCounter = 1;
var score = 0;

/* Questions Which include an array of questions */
let questions = [
     {
          question: "String values must be enclosed within ___ when being assigned to variables?",
          answer1: "commas", 
          answer2: "curly brackets", 
          answer3: "quotes", 
          answer4: "paraenthesis",
          correct: "3"
     },
     {
          question: "Arrays in JavaScript can be used to store ?",
          answer1: "numbers and strings", 
          answer2: "other arrays", 
          answer3: "booleans", 
          answer4: "all of the above",
          correct: "4"
     },
     {
          question: "Which of these is NOT a programming language ?",
          answer1: "ISO", 
          answer2: "PYTHON", 
          answer3: "Java", 
          answer4: "HTML",
          correct: "1",
     },
     {
          question: "What are people who write computer code called?",
          answer1: "programmers",
          answer2: "Cryptographers",
          answer3: "Professors",
          answer4: "Technicians",
          correct: "1",
     },
     {
          question: "What is computer coding ?",
          answer1: "A TV show", 
          answer2: "A radio wave ", 
          answer3: "telling a computer what to do",
          answer4: "A list of functions",
          correct: "3",
     }
];
/*End of multiple choice questions */

/*Start of function*/ 
function startQuiz() {
     scoreEl.innerHTML = "Score: " + 0;
     timerEl.innerHTML = "Time: " + 75;
     score = 0;
     index = 0;
     questionCounter = 1;
     introScreen.style.display = "none";
     questionPage();
     timer();
     quizScreen.style.display = "flex";
     scoreEl.style.display = "block";
     timerEl.style.display = "block";
}

/* Question displayed */
function questionPage() {
     if (questionCounter > 5) {
          clearInterval(timeInterval);
          submitPage();
     }

     /*Click for answer */
     let q = questions[currentQuestion];
     question.innerHTML = q.question;
     answer1.innerHTML = q.answer1;
     answer2.innerHTML = q.answer2;
     answer3.innerHTML = q.answer3;
     answer4.innerHTML = q.answer4;
}

/* Check if the answer is correct,wrong,or if the questions is timed out */
function checkAnswer(answer){
     if (answer === questions[currentQuestion].correct){
          score++;
          questionCounter++;
          setCounterText();
     } else {
          questionCounter++;
     }

     if (currentQuestion < questionCounter) {
          currentQuestion++;
          questionPage();
     }
}

/* Display scores */
function setCounterText() {
     scoreEl.textContent = "Score: " + score;
 }

 /* Timer display */
function timer() {
     timeLeft = 75;
     timeInterval = setInterval(function() {
         if (timeLeft >= 0) { 
             timerEl.innerText = "Time: " + timeLeft;
             timeLeft--
         } else {
             clearInterval(timeInterval);
             submissionScreen();
         }
     }, 1000);
 }
/* Displays home page*/
function homePage() {
     introScreen.style.display = "flex";
     quizScreen.style.display = "none";
     submitScreen.style.display = "none";
     highscoreScreen.style.display = "none";
     scoreEl.style.display = "none";
     timerEl.style.display = "none";
}
/* Initals inserted here */
function submitPage() {
     finalscoreEl.innerHTML = score;
     introScreen.style.display = "none";
     quizScreen.style.display = "none";
     submitScreen.style.display = "flex";
     highscoreScreen.style.display = "none";
     scoreEl.style.display = "none";
     timerEl.style.display = "none";
}

/* Check the highest score of each player */ 
function highscorePage() {
     for(let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          const value = localStorage.getItem(key)
          highscoreList.innerHTML += `${key}: ${value} <br>`;
      }
     introScreen.style.display = "none";
     quizScreen.style.display = "none";
     submitScreen.style.display = "none";
     highscoreScreen.style.display = "flex";
     scoreEl.style.display = "none";
     timerEl.style.display = "none";
}


submitBtn.onclick = function() {
     const name = initialEl.value;
     const finalScore = finalscoreEl.textContent;
     if (name) {
         localStorage.setItem(name, finalScore);
         homePage();
     }
 }

clearBtn.onclick = function() {
     localStorage.clear();
     location.reload();
}

startBtn.addEventListener("click", startQuiz);
highscoreBtn.addEventListener("click", highscorePage);
homeBtn.addEventListener("click", homePage);
