const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistake = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')


// set values 

let timer ;
let maxTime = 60;
let timeLeft = maxTime ;
let charIndex = 0 ;
let mistakes = 0;
let isTyping = false;

function loadParagraph(){
    const paragraph = ["Success is not something to wait for, it is something to work for.","Always stand on principle, even if you stand alone.","What we know is a drop. What we don’t know is an ocean.","We are shaped by our thoughts, we become what we think."];

    const randomIndex = Math.floor(Math.random()*paragraph.length);
    
    console.log(typingText);
    
    typingText.innerHTML = '';
    for(const char of paragraph[randomIndex]){
        typingText.innerHTML += `<span>${char}</span>`;
    }

    typingText.querySelectorAll('span')[0].classList.add('active')

    document.addEventListener('keydown',()=>{
        input.focus()
    })

    typingText.addEventListener('click',()=>{
        input.focus()
    })
}

// handle user input 

function initTyping(){
    const char = typingText.querySelectorAll('span')

//    console.log();
   
   if(charIndex<char.length && timeLeft>0){
        const typedChar = input.value.charAt(charIndex)
        
        if(!isTyping){
            timer = setInterval(initTimer,1000);
            isTyping = true;
        }

        if(char[charIndex].innerText===typedChar){
            char[charIndex].classList.add('correct');
        }else{
            mistakes++
            char[charIndex].classList.add('incorrect');
        }
        charIndex++;

        if(charIndex<char.length)
         char[charIndex].classList.add('active');
        mistake.innerText = mistakes;
        cpm.innerText = charIndex-mistakes ;
   }else{
    if(charIndex===char.length){
        clearInterval(timer)
        return
    }
   }
}


function initTimer(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText = timeLeft;

        const wpmt = Math.round(((charIndex-mistakes)/5)/(maxTime-timeLeft)*60);
        wpm.innerText = wpmt ;
    }else{
        clearInterval(timer);
    }
}

input.addEventListener('input',initTyping);


btn.addEventListener('click',()=>{
    loadParagraph();
    clearInterval(timer);
    maxTime = 60;
    timeLeft = maxTime ;
    charIndex = 0 ;
    mistakes = 0;
    isTyping = false;
     wpm.innerText = '';
     cpm.innerText = '';
     mistake.innerText = '';
     time.innerText = timeLeft;
     input.value = '';
})

loadParagraph()