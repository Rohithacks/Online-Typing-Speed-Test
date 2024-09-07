let typingtext = document.querySelector('.typing-text p');
let input = document.querySelector('.text');
let time = document.querySelector('.time span');
let mistakes = document.querySelector('.mistakes span');
let wpm = document.querySelector('.wpm span');
let cpm = document.querySelector('.cpm span');
let tryagain = document.querySelector('button');

let timer;
let maxTime = 60;
let timeleft = maxTime;
let mistake = 0;
let charIndex = 0;
let isTyping = false;

//loading paragraphs in the array to show
function loadParagraph(){
    const para = ["The journey of a thousand miles begins with a single step.",
    "In the middle of every difficulty lies opportunity.",
    "The best way to predict the future is to create it.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "Happiness is not something ready-made. It comes from your own actions.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    "Doubt kills more dreams than failure ever will.",
    "It always seems impossible until it’s done.",
    "Believe you can and you're halfway there."];

    //selecting random index from para array
    const randomIndex = Math.floor(Math.random()*para.length);
    typingtext.innerHTML = '';
    //adding each char of the stirng choosen from randomindex of para string
    for(const char of para[randomIndex]){
        typingtext.innerHTML += `<span>${char}</span>`
    }
    //making the first char of the string active
    typingtext.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener("keydown",()=>input.focus());
    typingtext.addEventListener("click",()=>input.focus());
}
loadParagraph();

tryagain.addEventListener("click",function(){
       loadParagraph();
       clearInterval(timer);
       timeleft = maxTime;
       input.value = '';
       time.innerText = timeleft;
       charIndex=0;
       mistake = 0;
       isTyping = false;
       wpm.innerText = 0;
       cpm.innerText = 0;
       mistakes.innerText = mistake;
});

function inittyping(){
    const char = typingtext.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    if(charIndex < char.length && timeleft>0){
        //tbhi ho skta h kaam

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping = true;
        }
        if(char[charIndex].innerText===typedChar){
            //ab char k charindex ko correct wale class m daldo
            char[charIndex].classList.add('correct');
        }
        else{
            char[charIndex].classList.add('incorrect');
            mistake++;
        }
        charIndex++;
        mistakes.innerHTML = mistake;
        char[charIndex].classList.add('active');
        cpm.innerText = charIndex - mistake;
    }
    else{
        clearInterval(timer);
        input.value = '';
    }
}

input.addEventListener("input",inittyping);

function initTime(){
    if(timeleft > 0){
        timeleft--;
        time.innerText = timeleft;
        let wpm_val = Math.round((((charIndex - mistake)/5)/(maxTime - timeleft)*60));
        wpm.innerText = wpm_val;
    }
    else{
        clearInterval(timer)
    }
}