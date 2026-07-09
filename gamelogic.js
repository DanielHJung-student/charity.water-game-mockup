var floor;
var playerPoints = 0;
const floorstep = 5;
const floorlength = 20000;
const floorFlatSpace = 100;
var charpos = {x:0, y:0};
var parallax = {x:0, y:0};
const moveSpeed = 0.35;
const gravity = 0.01;
var fallspeed=0;
const CHARWIDTHBUFFER = 30;
const CHARHEIGHTBUFFER = 100;
const pressedKeys = {left:false, right:false};
var daytime = 0;

window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key === 'arrowleft' || key === 'a') {
        pressedKeys.left = true;
        event.preventDefault();
    }
    if (key === 'arrowright' || key === 'd') {
        pressedKeys.right = true;
        event.preventDefault();
    }
});

window.addEventListener('keyup', (event) => {
    const key = event.key.toLowerCase();
    if (key === 'arrowleft' || key === 'a') {
        pressedKeys.left = false;
    }
    if (key === 'arrowright' || key === 'd') {
        pressedKeys.right = false;
    }
});

function tickScene(timestamp) {
     if (!lastFrameTime) {
         lastFrameTime = timestamp;
     }

    const elapsed = timestamp - lastFrameTime;
    if (elapsed >= 16) {
        drawScene();
        lastFrameTime = timestamp;
    }
    if (document.getElementById('gameplay').style.display === 'block') {
        //if in gameplay, do gameplay stuff
        charpos.x += (pressedKeys.right - pressedKeys.left) * moveSpeed*elapsed; // Move the character based on pressed keys
        
        //falling
        if (charpos.y>floor[Math.floor(charpos.x/floorstep)]) {
            fallspeed+= gravity*elapsed; // Increase fall speed due to gravity
            charpos.y -= fallspeed*elapsed; // Move the character up if above the floor
        } else {
            charpos.y = floor[Math.floor(charpos.x/floorstep)]; // Snap to the floor if below it
            fallspeed=0;
        }

        if (charpos.x < CHARWIDTHBUFFER) charpos.x = CHARWIDTHBUFFER; // Prevent the character from moving too far left
        if (charpos.x > floorlength-floorstep-CHARWIDTHBUFFER) charpos.x = floorlength-floorstep-CHARWIDTHBUFFER; // Prevent the character from moving too far right

        if (charpos.x > window.innerWidth/2) parallax.x = (charpos.x - window.innerWidth/2); // Parallax effect based on character position
        if (charpos.x > (floorlength-floorstep)-window.innerWidth/2) parallax.x = ((floorlength-floorstep) - window.innerWidth); // Parallax effect based on character position
        if (charpos.y < -CHARHEIGHTBUFFER) {
            parallax.y = CHARHEIGHTBUFFER + charpos.y;
        } else if (charpos.y > CHARHEIGHTBUFFER) {
            parallax.y = -CHARHEIGHTBUFFER + charpos.y;
        }
    }

    animationFrameId = window.requestAnimationFrame(tickScene);
}

function generateTerrain() {
    floor = [];
    for (i=0;i<floorlength/floorstep;i++) floor.push(0);

    var slope=0;
    for (let i = floorFlatSpace/floorstep; i < floor.length; i++) {
        slope+= (Math.random() - 0.5); // Random slope change
        slope = clamp(slope, -5, 5); // Limit slope to a certain range
        floor[i] = floor[i-1]+slope/floorstep;
        console.log(slope);
    }
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function LERP(a, b, t) {
    return a + (b - a) * t;
}
function RLERP(v, a, b) {
    return (v-b)/(a-b);
}
function mod(v,d) 
{
    return v-d*Math.floor(v/d);
}

generateTerrain();