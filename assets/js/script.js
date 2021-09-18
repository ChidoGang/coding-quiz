var main = document.querySelector("#main");
var homepage = document.querySelector("#landing-page");
var start = document.querySelector("#start");
var spanTime = document.querySelector("#time");
var exitPage = document.querySelector(".exit-page");
var spanFinalScore = document.querySelector("#final-score");
var submitName = document.querySelector("#submit-name");
var initials = document.querySelector("#initials");
var highscore = document.querySelector("#highscore");


var quesArr=[
     {
          ques: "String values must be enclosed within ___ when being assigned to variables?",
          ans: ["commas", "curly brackets", "quotes", "paraenthesis"],
          correctAns: "3",
     },

     {
          ques: "Arrays in JavaScript can be used to store ?",
          ans: ["numbers and strings", "other arrays", "booleans", "all of the above"],
          correctAns: "4",
     },

     {
          ques: "Which of these is NOT a programming language ?",
          ans: ["ISO", "pYTHON", "Java", "HTML"],
          correctAns: "1",
     },

     {
          ques: "What are people who write computer code called?",
          ans: ["programmers","Cryptographers","Professors","Technicians"],
          correctAns: "1",
     },

     {
          ques: "What is computer coding ?",
          ans: ["A TV show", "A radio wave ", "telling a computer what to do", "A list of functions"],
          correctAns: "3",
     }
];
var index = 0;
var timer = parseInt(quesArr.length*10);
var timeInterval;

spanTime.textContent = timer;

var score = [];


submitName.addEventListener("submit", function(event){

     event.preventDefault();
     console.log("sumit score");
     console.log(initials.value);

     score.push({"name": initials.value, "score": spanFinalScore.textContent});
     localStorage.setItem("score", JSON.stringify(score));
     //JSON.parse(localStorage.getItem("score"));

     // var emptyOrNot = localStorage.getItem("score");
     // var oldScores;

     // if(emptyOrNot === null){ 
     //      oldScores="";
     
     // }
     // else{
     //      oldScores = JSON.parse(emptyOrNot);
     // }
     exitPage.classList.add("hide");
     homepage.classList.remove("hide");

     index = 0;
     timer = parseInt(quesArr.length*15);
     spanTime.textContent = timer;
});


function startTime(){
     timeInterval = setInterval(function(){

          timer--;
          spanTime.textContent = timer;

          if(index === quesArr.length || timer < 0){
               clearInterval(timeInterval);
               spanFinalScore.textContent = timer;
               exitPage.classList.remove("hide");
          }
     }, 1000);
}

function createAndLoadQues(){
     var div = document.createElement("div");
     main.appendChild(div);
     div.setAttribute("class", "ques");

     var h1 = document.createElement("h1");
     div.appendChild(h1);
     h1.textContent = quesArr[index].ques;

     var btnsDiv = document.createElement("div");
     div.appendChild(btnsDiv);
     btnsDiv.setAttribute("class", "choices")

     var answers = quesArr[index].ans;

     for (var i = 0; i < answers.length; i++) {

          var btn = document.createElement("button");
          btnsDiv.appendChild(btn);
          btn.setAttribute("type", "button");
          btn.setAttribute("data-answer", (i+1));
          btn.textContent = answers[i];

          btn.addEventListener("click", function(){

               if(this.dataset.answer === quesArr[index].correctAns){
                    alert("Correct!!");
               }
               else{
                    alert("Wrong Answer!!")
                    timer -= 10;
               }
               this.parentElement.parentElement.classList.add("hide");
               index++;

               if(index !== quesArr.length)
                    createAndLoadQues();
          });

     }
};


start.addEventListener("click", function(){
     homepage.classList.add("hide");
     startTime();
     createAndLoadQues();
});

highscore.addEventListener("click", function(){

     var allScores = JSON.parse(localStorage.getItem("score"));

     for (var i = 0; i < allScores.length; i++) {
          alert("Highscores\n"+allScores[i].name +": "+allScores[i].score);
     }
});
