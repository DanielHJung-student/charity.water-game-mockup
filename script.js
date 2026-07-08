const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function drawScene() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 100);

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.strokeRect(150, 10, 100, 100);

    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width-10, canvas.height-10,10,10);
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