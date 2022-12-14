function start(state, game) {
    game.createWizard(state.wizard)

    window.requestAnimationFrame(timestamp => gameLoop(state, game, timestamp))
}

function gameLoop(state, game, timestamp) {
    const { wizard } = state;
    const { wizardElement } = game;

    game.scoreScreen.textContent = `${state.score} pts.`

    modifyWizardPosition(state, game)

    if (state.keys.Space) {
        wizardElement.style.backgroundImage = 'url("/src/images/wizard-fire.png")';
        if (timestamp > state.fireBall.nextSpawnTimestamp) {
            game.createFireBall(wizard, state.fireBall);
            state.fireBall.nextSpawnTimestamp = timestamp + state.fireBall.fireRate
        }

    } else {
        wizardElement.style.backgroundImage = 'url("/src/images/wizard.png")';
    };



    //Spawn bug
    if (timestamp > state.bugState.nextSpawnTimestamp) {
        game.createBug(state.bugState);
        state.bugState.nextSpawnTimestamp = timestamp + Math.random() * state.bugState.maxSpawnInterval
    };


    //Render bugs
    let bugElements = document.querySelectorAll('.bug')
    bugElements.forEach(bug => {
        let posX = parseInt(bug.style.left);

        //Detect collision with wizard
        if (detectCollision(wizardElement, bug)) {
            state.gameOver = true;
            // wizardElement.remove()
        }
        if (posX > 0) {
            bug.style.left = posX - state.bugState.speed + 'px'
        } else {
            bug.remove()
        }
    });


    //Render fireball
    document.querySelectorAll('.fireball').forEach(fireball => {
        let posX = parseInt(fireball.style.left);

        //Detect fireball collision
        bugElements.forEach(bug => {
            if (detectCollision(bug, fireball)) {
                state.score += state.scoreRate;
                bug.remove();
                fireball.remove()
            }
        })


        if (posX > game.gameScreen.offsetWidth) {
            fireball.remove()
        } else {
            fireball.style.left = posX + state.fireBall.speed + 'px'
        }
    })


    //Render
    wizardElement.style.left = wizard.posX + 'px';
    wizardElement.style.top = wizard.posY + 'px';

    if (state.gameOver) {
        alert(`GameOver - ${state.score}pts.`)
    } else {
        // state.score += state.scoreRate;
        window.requestAnimationFrame(gameLoop.bind(null, state, game))
    }

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


function detectCollision(objecA, objecB) {
    let first = objecA.getBoundingClientRect();
    let second = objecB.getBoundingClientRect();

    let hasCollision = !(first.top > second.bottom
        || first.bottom < second.bottom
        || first.right < second.left
        || first.left > second.right);

    return hasCollision;
}
