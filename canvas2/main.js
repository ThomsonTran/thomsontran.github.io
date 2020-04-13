const canvas = document.getElementById("scene");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: undefined,
    y: undefined,
};

const colorsArray = ["#E68E99", "#7888E6", "#E8C75D", "#6CE686", "#6074E6"];
let circlesArray = [];

// global functions

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colorsArray.length)];
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Event Listeners
addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    init();
});
addEventListener("touchmove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    init();
});

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

// Objects
class Circle {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update() {
        this.radius -= 0.2;
        this.radius = Math.max(0, this.radius);
        this.draw();
    }
}

// Implementation
function init() {
    let x;
    let y;
    let radius;
    let color;
    let dx = 0;
    let dy;

    for (let i = 0; i < 2; i++) {
        x = mouse.x + randomIntFromRange(-1, 1) * randomIntFromRange(1, 50);
        y = mouse.y + randomIntFromRange(-1, 1) * randomIntFromRange(1, 50);
        dy = randomIntFromRange(1, 5);
        dx = randomIntFromRange(1, 5);
        radius = randomIntFromRange(1, 25);
        color = randomColor(colorsArray);
        circlesArray.push(new Circle(x, y, dx, dy, radius, color));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    circlesArray.forEach((circle) => {
        circle.update();
    });
}

init();
animate();
