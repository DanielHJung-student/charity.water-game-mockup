var floor;
const floorstep = 5;
const floorlength = 20000;
var charpos = {x:0, y:0};

function generateTerrain(offset = 0) {
    floor = [];
    for (i=0;i<floorlength/floorstep;i++) floor.push(0);

    for (let i = 0; i < floor.length; i++) {
        const t = i / (floor.length - 1);
        const phase = offset + t * Math.PI * 2;
        const smoothWave = Math.sin(phase) * 0.15 + Math.cos(phase * 2) * 0.05;
        const noise = (Math.sin((i + 1) * 1.7 + offset) + Math.cos((i + 3) * 0.9 - offset)) * 0.08;
        floor[i] = smoothWave + noise;
    }
}

generateTerrain();