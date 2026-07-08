const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function drawScene() {
    // reset canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    //draw sky
    ctx.fillStyle = '#77A8BB';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    //draw background

    //draw terrain
    ctx.beginPath();
    ctx.moveTo(0, window.innerHeight);
    for (let i = 0; i < floor.length; i++) {
        const x = (i / (floor.length - 1)) * window.innerWidth;
        const y = window.innerHeight/2 - (floor[i] * window.innerHeight);
        ctx.lineTo(x, y);
    }
    ctx.lineTo(window.innerWidth, window.innerHeight);
    ctx.closePath();
    ctx.fillStyle = '#1A1A1A';
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