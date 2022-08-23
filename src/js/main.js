let state = initState();
let game = initGameObjects()


game.startScreen.addEventListener('click',(e)=>{
    console.log('Start Game');
    game.startScreen.currentTarget.classList.add('hidden')
    game.gameScreen.classList.remove('hidden')
});
