const canvas = document.getElementById("scene");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: 0,
    y: 0,
};

const colorsArray = ["#E0E79F", "#6CAA84", "#3E595F", "#493A4D", "#21172E"];
let circlesArray;

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
        this.y += this.dy;
        this.draw();
    }
}

// Implementation
function init() {
    circlesArray = [];
    let x = canvas.width / 2;
    let y = 0;
    let radius;
    let color;
    let dx = 0;
    let dy;

    for (let i = 0; i < 500; i++) {
        dy = randomIntFromRange(1, 550) / 7;
        radius = randomIntFromRange(1, 15);
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
