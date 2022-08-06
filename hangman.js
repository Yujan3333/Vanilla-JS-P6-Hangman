const anime_collection=[
    "naruto",
    "onepiece",
    "deathnote",
    "blackclover"
];

let answer='';
let rightWordArray=[];
let maxWrong=6;
let userWord=null

let mistakes=0;


//getting the answer
const randomAnswer= ()=>{
    answer=anime_collection[Math.floor(Math.random()*anime_collection.length)];
    console.log(answer);
};


//making the keyboard to get user input
const generateKeyboard= ()=>{
    // let alphabet='abcdefghijklmnopqrstuvwxyz';
    html='abcdefghijklmnopqrstuvwxyz'.split('').map((letter)=>{
    return(
    `
    <button
        class="btn btn-lg btn-primary m-2"
        id='${letter}'
        onClick="userGuessLetterF('${letter}')"
    >
        ${letter}
    </button>
    `
    )}).join("");
    document.getElementById("keyboard").innerHTML=html;
}

//Funtion that runs after being clicked on the keyboard
const userGuessLetterF=(letter)=>{
    rightWordArray.indexOf(letter) ===-1 ? rightWordArray.push(letter):null;
    document.getElementById(letter).setAttribute("disabled",true);

    if(answer.indexOf(letter) >= 0){
        displayWord();
        conditionGameWon();
    } 
    else if(answer.indexOf(letter) ===-1){
        mistakes++;
        updateMistakes();
        conditionGameLost();
        updateHangmanPicture();
    };
};

const displayWord = ()=>{
    userWord=answer.split('')
        .map((letter)=>rightWordArray.indexOf(letter) >=0? letter:' _ ' )
        .join('');
    document.getElementById('guessWord').innerHTML= userWord;
};

// winning condition
const conditionGameWon= ()=>{
    if(userWord === answer){
        document.getElementById('keyboard').innerHTML="You Win";
    };
};
//losing condition
const conditionGameLost= ()=>{
    if(mistakes === maxWrong){
        document.getElementById('keyboard').innerHTML="You Lost";
    };
};
//updating the picture in the DOM
const updateHangmanPicture= ()=>{
    document.getElementById('hangmanPicture').src=`/images/${mistakes}.png`;
};

//Updating the mistakes in the DOM
const updateMistakes= ()=>{
    document.getElementById('error').innerHTML=mistakes;
};


//go back to default state
const playAgain = ()=>{
    mistakes=0;
    rightWordArray=[];
    document.getElementById('hangmanPicture').src= `/images/${mistakes}.png`;
    randomAnswer();
    generateKeyboard();
    displayWord();
};

//Default condition
randomAnswer();
generateKeyboard();
displayWord();