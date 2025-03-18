// start variables
let rootStyles = getComputedStyle(document.documentElement);
let primaryColor = rootStyles.getPropertyValue('--primary-color');
let flashcardGradient = rootStyles.getPropertyValue('--flashcard-gradient');
let data = undefined; 
let current = 1;    
let front_up = true;
const card = document.getElementById('flashcard');
const next_btn = document.getElementById('next_btn');
const previous_btn = document.getElementById('previous_btn');
let front = '';
let back = '';
let menu_is_open = false;
const hamb_icon = document.getElementById('hamb_icon')
const hamb_content = document.getElementById('hamb_content');

//start fetching flashcards data and storing them in an js array
fetch('data.json')
.then(res => {
    if (!res.ok){
        throw new Error('HTTP ERROR \n status:${res.status}');
    }
    card.innerHTML = 'Loading ...'
    return res.json();
})
.then(flashcard_data => {
    data = flashcard_data;
    show();
})

//start show function and storing current card in varuables
function show(){
    front = data[current].question;
    back = data[current].answer;
    card.innerHTML = front;
}

//start function for reseting look of the card
function reset_look(){
    card.style.background = flashcardGradient;
    card.style.transform = "none"
    card.style.color = 'whitesmoke';
}

//start flipping flashcard function
function flip(){
    if (front_up){
        card.style.transformOrigin="center";
        card.style.transform = "rotateY(90deg) scaleX(-0.5)";
        setTimeout(function(){
            card.innerHTML = back;
            card.style.transform = "rotateY(180deg) scaleX(-1)";
            card.style.background = primaryColor;
            card.style.color = "#eeeeee";
            card.style.boxShadow = "none";
        },150)
    }
    else{
        card.style.transformOrigin="center";
        card.style.transform = "rotateY(90deg) scaleX(-0.5)";
        setTimeout(function(){
            card.innerHTML = front;
            reset_look();
        },250)
    }
    front_up = !front_up;
}

//start next card function
function next(){
    reset_look();
    front_up = true;
    current++;
    show();
    if(current==9){
        next_btn.disabled=true;
        next_btn.style.cursor="not-allowed"
    }
    else if (current==1){
        previous_btn.disabled = false;
        previous_btn.style.cursor="pointer"
    }
}

//start previous card function
function previous(){
    reset_look();
    front_up = true;
    current--;
    show();
    if(current==0){
        previous_btn.disabled = true;
        previous_btn.style.cursor="not-allowed"
    }
    else if (current==8){
        next_btn.disabled = false;
        next_btn.style.cursor = "pointer";
    }
}
