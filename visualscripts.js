const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const pointreadout = document.getElementById('pointreadout');
pointreadout.innerText = "123";

const background = new Image();
background.src = 'assets/Basic Mountains.png';

function drawScene() {
    // reset canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    //draw sky
    ctx.fillStyle = '#79bdd8';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    //draw background
    ctx.drawImage(background, -charpos.x/5, 0, window.innerWidth, window.innerHeight);
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(background, charpos.x/5-window.innerWidth, 0, -window.innerWidth, window.innerHeight);
    ctx.restore();

    //draw terrain
    ctx.beginPath();
    ctx.moveTo(0, window.innerHeight);
    for (let i = 0; i < floor.length; i++) {
        const x = i*floorstep;
        const y = window.innerHeight*3/4 - (floor[i] * window.innerHeight/2);
        ctx.lineTo(x, y);
    }
    ctx.lineTo(window.innerWidth, window.innerHeight);
    ctx.closePath();
    ctx.fillStyle = '#BF6C56';
    ctx.fill();


    //draw objects
}

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawScene();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();


var animationFrameId = null;
var lastFrameTime = 0;

function tickScene(timestamp) {
     if (!lastFrameTime) {
         lastFrameTime = timestamp;
     }

    const elapsed = timestamp - lastFrameTime;
    if (elapsed >= 16) {
        drawScene();
        lastFrameTime = timestamp;
    }

    animationFrameId = window.requestAnimationFrame(tickScene);
}

function startGameLoop() {
    if (animationFrameId !== null) {
        return;
    }
    
    drawScene();
    animationFrameId = window.requestAnimationFrame(tickScene);
}

function stopGameLoop() {
    if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopGameLoop();
    } else {
        startGameLoop();
    }
});
startGameLoop();