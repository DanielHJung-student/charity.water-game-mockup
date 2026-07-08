const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const pointreadout = document.getElementById('pointreadout');
pointreadout.innerText = "1000000";

const background = new Image();
background.src = 'assets/Basic Mountains.png';

function drawScene() { //TODO rework backgrounds/sky, add paralax
    // reset canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    //draw sky
    ctx.fillStyle = '#79bdd8';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    //draw background
    //ctx.drawImage(background, -charpos.x/5, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(background, mod(window.innerWidth-parallax.x/5, 2*window.innerWidth)-window.innerWidth, parallax.y/5, window.innerWidth, window.innerHeight);
    ctx.save();
    ctx.scale(-1, 1);
    //ctx.drawImage(background, charpos.x/5-window.innerWidth, 0, -window.innerWidth, window.innerHeight)
    ctx.drawImage(background, mod(parallax.x/5, -2*window.innerWidth)+window.innerWidth, parallax.y/5, -window.innerWidth, window.innerHeight);
    ctx.restore();

    //draw terrain
    ctx.beginPath();
    ctx.moveTo(-parallax.x, window.innerHeight+parallax.y);
    for (let i = 0; i < floor.length; i++) {
        const x = i*floorstep;
        const y = window.innerHeight*3/4 - floor[i];
        ctx.lineTo(x-parallax.x, y+parallax.y);
    }
    ctx.lineTo(window.innerWidth, window.innerHeight); //go to bottom right corner
    ctx.lineTo(0, window.innerHeight); //go to bottom left corner
    ctx.closePath();
    ctx.fillStyle = '#BF6C56';
    ctx.fill();


    //draw objects

    if (document.getElementById('gameplay').style.display === 'block') {
        const charRadius = 20;
        ctx.beginPath();
        ctx.arc(charpos.x-parallax.x, window.innerHeight*3/4+(parallax.y-charpos.y)-charRadius, charRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#FF0000';
        ctx.closePath();
        ctx.fill();
    }
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

function startPlaying() {
    document.getElementById('homepage').style.display = 'none';
    document.getElementById('store').style.display = 'none';
    document.getElementById('gameplay').style.display = 'block';
}
function returnHome() {
    document.getElementById('homepage').style.display = 'block';
    document.getElementById('store').style.display = 'none';
    document.getElementById('gameplay').style.display = 'none';
}
function showStore() {
    document.getElementById('homepage').style.display = 'none';
    document.getElementById('store').style.display = 'block';
    document.getElementById('gameplay').style.display = 'none';
}
returnHome();