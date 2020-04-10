//canvas set up
const canvas = document.getElementById("scene");
const c = canvas.getContext("2d");

canvas.height = window.innerHeight * 0.5;
canvas.width = window.innerWidth * 0.5;

window.addEventListener("resize", function (e) {
    canvas.height = window.innerHeight * 0.5;
    canvas.width = window.innerWidth * 0.5;
});

//slider
var slider = document.getElementById("myRange");
slider.oninput = function () {
    numOfCircles = this.value;
    init();
};

// animation set up
var colorArray = ["#E7717D", "#C2CAD0", "#7E685A", "#AFD275"];
var circleArray = [];

var maxRadius = 70;
var numOfCircles = 1400;

var requestAnimation;
var mouseX;
var mouseY;
window.addEventListener("mousemove", function (e) {
    mouseX = e.x;
    mouseY = e.y;
});

function Circle(x, y, dy, dx, radius) {
    const randomIndexOfColorArray = Math.floor(
        Math.random() * colorArray.length
    );

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[randomIndexOfColorArray];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    };

    this.update = function () {
        this.ifCircleIsCloseToMouseIncreaseRadius();

        if (this.x + radius > canvas.width || this.x - radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + radius > canvas.height || this.y - radius <= 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    };

    this.ifCircleIsCloseToMouseIncreaseRadius = function () {
        if (
            mouseX - this.x < 35 &&
            mouseX - this.x > -35 &&
            mouseY - this.y < 35 &&
            mouseY - this.y > -35
        ) {
            if (this.radius < maxRadius) {
                this.radius += 2;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
    };
}

function init() {
    // var radius = Math.random() * 5 + 5;
    // var x = Math.random() * (canvas.width - 4 * radius) + 2 * radius;
    // var y = Math.random() * (canvas.height - 4 * radius) + 2 * radius;
    // var dx = 1;
    // var dy = 1;
    // circleArray.push(new Circle(x, y, dy, dx, radius));

    circleArray = [];
    for (let index = 0; index < numOfCircles; index++) {
        let radius = Math.random() * 5 + 5;
        let x = Math.random() * (canvas.width - 4 * radius) + 2 * radius;
        let y = Math.random() * (canvas.height - 4 * radius) + 2 * radius;
        let dx = (Math.random() - 0.5) * 8;
        let dy = (Math.random() - 0.5) * 8;
        circleArray.push(new Circle(x, y, dy, dx, radius));
    }
    cancelAnimationFrame(requestAnimation);
    animate();
}

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    circleArray.forEach((circle) => {
        circle.update();
    });

    requestAnimation = requestAnimationFrame(animate);
}

init();
