function initState() {
    let startX = Math.floor(Math.random() * 1000);
    let startY = Math.floor(Math.random() * 800);

    const state = {
        player: 'Player',
        wizard: {
            width: 82,
            height: 100, 
            posX:startX,
            posY:startY,
            speed: 10,
        },
        keys: {}
    }

    return state;
}