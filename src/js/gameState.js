function initState() {
    let startX = Math.floor(Math.random() * 1000);
    let startY = Math.floor(Math.random() * 800);

    const state = {
        player: 'Player',
        gameOver: false,
        score: 0,
        scoreRate: 1,
        wizard: {
            width: 82,
            height: 100,
            posX: startX,
            posY: startY,
            speed: 10,
        },
        bugState: {
            width: 50,
            height: 50,
            nextSpawnTimestamp: 0,
            maxSpawnInterval: 1500,
            speed: 5
        },
        fireBall: {
            width: 20,
            height: 20,
            speed: 10,
            nextSpawnTimestamp: 0,
            fireRate: 300
        },
        keys: {
            keyA: false,
            keyS: false,
            keyD: false,
            keyW: false,
            Space: false
        }
    }

    return state;
}