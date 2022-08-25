function start(state, game) {
    game.createWizard(state.wizard)

    window.requestAnimationFrame(timestamp => gameLoop(state, game, timestamp))
}

function gameLoop(state, game, timestamp) {
    const { wizard } = state;
    const { wizardElement } = game;

    modifyWizardPosition(state, game)

    if(state.keys.Space){
        wizardElement.style.backgroundImage = 'url("/src/images/wizard-fire.png")';

        game.createFireBall(wizard, state.fireBall)
    } else {
        wizardElement.style.backgroundImage = 'url("/src/images/wizard.png")';
    }

    //Spawn bug
    if (timestamp > state.bugState.nextSpawnTimestamp) {
        game.createBug(state.bugState);
        state.bugState.nextSpawnTimestamp = timestamp + Math.random() * state.bugState.maxSpawnInterval
    };


    //Render bugs
    document.querySelectorAll('.bug').forEach(bug => {
        let posX = parseInt(bug.style.left);
        if (posX > 0) {
            bug.style.left = posX - state.bugState.speed + 'px'
        } else {
            bug.remove()
        }
    });
    

    //Render fireball
    document.querySelectorAll('.fireball').forEach(fireball => {
        let posX = parseInt(fireball.style.left);
        if (posX > game.gameScreen.offsetWidth) {
            fireball.remove()
        } else {
            fireball.style.left = posX + state.fireBall.speed + 'px'
        }
    })


    //Render
    wizardElement.style.left = wizard.posX + 'px';
    wizardElement.style.top = wizard.posY + 'px';
    window.requestAnimationFrame(gameLoop.bind(null, state, game))
}

function modifyWizardPosition(state, game) {
    const { wizard } = state
    if (state.keys.KeyA) {
        wizard.posX = Math.max(wizard.posX - wizard.speed, 0)
    };

    if (state.keys.KeyS) {
        wizard.posY = Math.min(wizard.posY + wizard.speed, game.gameScreen.offsetHeight - wizard.height)
    };

    if (state.keys.KeyD) {
        wizard.posX = Math.min(wizard.posX + wizard.speed, game.gameScreen.offsetWidth - wizard.width)
    };

    if (state.keys.KeyW) {
        wizard.posY = Math.max(wizard.posY - wizard.speed, 0)
    };
};

