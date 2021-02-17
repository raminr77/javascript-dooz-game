const mask = document.querySelector('.mask')
const resetBtn = document.querySelector('.js-reset')
const container = document.querySelector('.container')

// Sounds
const winSound = new Audio('./sounds/win.mp3')
const initSound = new Audio('./sounds/init.mp3')
const errorSound = new Audio('./sounds/error.mp3')
const unknownSound = new Audio('./sounds/unknown.mp3')

// Game Data
let lastClickCount = 0
let lastClickIsBlue = false

// Play Sound Function
const playSound = (action = 'init') => {
    if(action === 'error'){
        errorSound.play()
    } else if(action === 'unknown'){
        unknownSound.play()
    } else if(action === 'win'){
        winSound.play()
    } else { initSound.play() }
}

// on click Function
const onClick = (e) => {
    let element = e.target
    let id = element.getAttribute('data-id')

    console.log(lastClickCount);
    if(lastClickCount === 9) {
        finishGame()
        return
    };

    if(element.className !== 'box') {
        playSound('error')
        return
    }

    if(lastClickIsBlue){
        element.classList.add('yellow')
    } else {
        element.classList.add('blue')
    }

    checkGameStatus(id)

    lastClickCount++
    lastClickIsBlue = !lastClickIsBlue
}

// Check Game Status
const checkGameStatus = (id) => {
    if(lastClickCount < 4) return;
    let boxes = document.querySelectorAll('.container .box')
    let currentColor = lastClickIsBlue ? 'yellow' : 'blue'
    let currentColorItems = []
    boxes.forEach(box => {
        if(box.classList.contains(currentColor)){
            currentColorItems.push(parseInt(box.getAttribute('data-id')))
        }
    })
    if(isWinner(currentColorItems)){
        finishGame(true , !lastClickIsBlue , `${currentColor} won ${lastClickIsBlue ? '😋': '😝'}`)
    }
}

// Check Win
const isWinner = (nodes = []) => {
    if(   (nodes.includes(1) && nodes.includes(2) && nodes.includes(3))
       || (nodes.includes(4) && nodes.includes(5) && nodes.includes(6))
       || (nodes.includes(7) && nodes.includes(8) && nodes.includes(9))
       || (nodes.includes(1) && nodes.includes(4) && nodes.includes(7))
       || (nodes.includes(2) && nodes.includes(5) && nodes.includes(8))
       || (nodes.includes(3) && nodes.includes(6) && nodes.includes(9))
       || (nodes.includes(1) && nodes.includes(5) && nodes.includes(9))
       || (nodes.includes(3) && nodes.includes(5) && nodes.includes(7))
    ) return true
    return false
}

// Finish Game Function
const finishGame = (hasWinner = false , winnerIsBlue = false , message = 'Game Is Finished 😩') => {
    let playBtn = document.createElement('button')
    let maskText = document.createElement('p')
    
    if(hasWinner){
        let winner = document.createElement('div')
        winner.className = 'winner'
        mask.appendChild(winner)
        if(winnerIsBlue){
            winner.classList.add('bg-blue')
        } else {
            winner.classList.add('bg-yellow')
        }
        playSound('win')
    } else {
        playSound('unknown')
    }
    
    playBtn.className = 'play-btn'
    playBtn.innerHTML = 'Play Now'
    maskText.innerHTML = message

    mask.appendChild(maskText)
    mask.appendChild(playBtn)

    mask.classList.add('is-show')
    playBtn.addEventListener('click' , initGame)
}

// Init Game Function
const initGame = () => {
    winSound.pause()
    errorSound.pause()
    unknownSound.pause()
    lastClickCount = 0
    mask.innerHTML = ''
    lastClickIsBlue = false
    container.innerHTML = ''
    mask.classList.remove('is-show')
    for(let index = 0; index < 9; index ++){
        let box = document.createElement('div')
        box.className = 'box'
        box.innerHTML = index + 1
        box.setAttribute('data-id' , index + 1)
        box.addEventListener('click' , onClick)
        container.appendChild(box)
    }
}

// Reset Game
resetBtn.addEventListener('click' , () => {
    initGame()
    playSound()
})

// Start Game
initGame()

// Init Shortcuts
document.addEventListener("keydown", event => {
    if(event.which === 27) initGame()
    if(event.which === 49 || event.which === 97){ downKey(1) }
    if(event.which === 50 || event.which === 98){ downKey(2) }
    if(event.which === 51 || event.which === 99){ downKey(3) }
    if(event.which === 52 || event.which === 100){ downKey(4) }
    if(event.which === 53 || event.which === 101){ downKey(5) }
    if(event.which === 54 || event.which === 102){ downKey(6) }
    if(event.which === 55 || event.which === 103){ downKey(7) }
    if(event.which === 56 || event.which === 104){ downKey(8) }
    if(event.which === 57 || event.which === 105){ downKey(9) }
})

const downKey = keyNumber => {
    let btn = document.querySelector(`.box[data-id="${keyNumber}"]`)
    btn.click()
}

console.log(`%c
Ramin Rezaei \n 
https://raminrezaei.ir
\n`, 'color:#999')

/*
______
|  __ \               (_)      
| |__) |__ _ _ __ ___  _ _ __  
|  _  // _` | '_ ` _ \| | '_ \ 
| | \ \ (_| | | | | | | | | | |
|_|  \_\__,_|_| |_| |_|_|_| |_|

*/