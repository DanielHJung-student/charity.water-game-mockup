const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

var secondWell = new Image();
secondWell.src = 'assets/Well.png';

function drawScene() { //TODO rework backgrounds/sky, add paralax
    // reset canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    //draw sky
    ctx.fillStyle = '#79bdd8';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    parallaxItems.sort((a, b) => a.ZIndex - b.ZIndex); // Sort parallax items by ZIndex
    for (const parallaxObject of parallaxItems) {
        //image, speed, tileMirronOnX, tileNormallyOnX
        const offset = {x: EAR(parallaxObject.offset.x), y: EAR(parallaxObject.offset.y)};
        var x=offset.x - parallax.x*EAR(parallaxObject.speed);
        var y=offset.y + parallax.y*EAR(parallaxObject.speed);
        const width = (EAR(parallaxObject.scaleToWindow)) ? window.innerWidth : EAR(parallaxObject.image).width;
        const height = (EAR(parallaxObject.scaleToWindow)) ? window.innerHeight : EAR(parallaxObject.image).height;

        const shouldTile = Boolean(EAR(parallaxObject.tileMirrorOnX) || EAR(parallaxObject.tileNormallyOnX));
        const shouldMirror = Boolean(EAR(parallaxObject.tileMirrorOnX));
        const tileWidth = width;

        if (shouldTile) {
            x = mod(x, tileWidth);
        }

        const tilePositions = shouldTile ? [x - tileWidth, x, x + tileWidth] : [x];
        for (const tileX of tilePositions) {
            ctx.drawImage(EAR(parallaxObject.image), tileX, y, width, height);
        }

        if (shouldMirror) {
            ctx.save();
            ctx.scale(-1, 1);
            for (const tileX of tilePositions) {
                ctx.drawImage(EAR(parallaxObject.image), -tileX - tileWidth, y, -width, height);
            }
            ctx.restore();
        }
    }

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
    const well = new Image();
    well.src = 'assets/Well.png';
    for (const waterLocation of waterLocations) {
        const waterX = waterLocation - parallax.x;
        const waterY = window.innerHeight*3/4 - floor[Math.floor(waterLocation/floorstep)] + parallax.y;
        ctx.drawImage(well, waterX - well.width/2, waterY - well.height);
    }

    const gameplayButton = document.getElementById('wellButton');
    if (gameplayButton) {
        const wellX = 500 - parallax.x - secondWell.width/2;
        const wellY = window.innerHeight*3/4 - floor[Math.floor(500/floorstep)] + parallax.y - secondWell.height;
        gameplayButton.style.display = 'block';
        gameplayButton.style.left = `${wellX}px`;
        gameplayButton.style.top = `${wellY}px`;
        ctx.drawImage(secondWell, wellX, wellY);
    }

    //draw character
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
    document.getElementById('store').style.display = 'flex';
    document.getElementById('gameplay').style.display = 'none';
}
returnHome();

function toggleStoreSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.toggle('open');
    }
}
