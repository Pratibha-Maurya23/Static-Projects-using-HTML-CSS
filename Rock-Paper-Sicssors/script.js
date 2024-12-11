let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
 const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");


const getCompChoice = () => {
    const options = ["rock","paper","scissors"];
    //rock , paper ,scissors
   const randIdx = Math.floor(Math.random() * 3);
   return options[randIdx];
}

const drawGame = () => {
    msg.innerText = "Game Was Draw . Play again";
};
const showWinner = (userwin,userChoice,compChoice) => {
    if(userwin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! your  ${userChoice}  beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else{
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}


const playGame = (userChoice) =>{
console.log("user Choice = ",userChoice);
//Gereate computer choie -> modular
  const compChoice = getCompChoice();
  console.log("comp Choice =",compChoice);

  if(userChoice === compChoice){
    drawGame();
  }
  else{
    let userwin = true;
    if(userChoice === "rock"){
        //option available for comp = scissors, paper
        userwin = compChoice === "paper" ? false : true ;
    }
    else if (userChoice === "paper"){
        // option available for comp = paper, scissors
        userwin = compChoice === "scissors" ? false :true;
    }
    else{
        // option available for comp = rock paper
        userwin = compChoice === "rock" ? false :true;
    }
   showWinner(userwin,userChoice,compChoice);
  }
};


choices.forEach((choice) =>{
    choice.addEventListener("click",() =>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice)
    });
});