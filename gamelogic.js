var floor;

function generateTerrain() {
    floor = [];
    const segments = 200;

    for (let i = 0; i < segments; i++) {
        const t = i / (segments - 1);
        const smoothWave = Math.sin(t * Math.PI * 2) * 0.15 + Math.cos(t * Math.PI * 4) * 0.05;
        const noise = (Math.sin((i + 1) * 1.7) + Math.cos((i + 3) * 0.9)) * 0.08;
        floor.push(smoothWave + noise);
    }
}

generateTerrain();
console.log(floor);
drawScene();