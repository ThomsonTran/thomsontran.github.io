const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let mouse = {
    x: undefined,
    y: undefined,
    radius: 10,
};

let color = "white";
let particles = [];
let smallParticles = [];
let timer = 0;

function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Particle {
    constructor(x, y, speedx, speedy, radius, color) {
        this.x = x;
        this.y = y;
        this.speed = {
            x: speedx,
            y: speedy,
        };
        this.radius = radius;
        this.color = color;
        this.gravity = 1;
        this.friction = 0.8;
    }

    break() {
        for (let index = 0; index < 8; index++) {
            let smallradius = this.radius / 4;
            let speedx = randomIntBetween(-15, 15);
            let speedy = randomIntBetween(-15, 15);
            smallParticles.push(
                new SmallParticle(
                    this.x,
                    this.y,
                    speedx,
                    speedy,
                    smallradius,
                    "white"
                )
            );
        }
        this.radius = Math.max(0, this.radius - 3);
    }

    draw() {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, Math.abs(this.radius), 0, Math.PI * 2, false);

        c.shadowColor = "#E3EAEF";
        c.shadowBlur = 20;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;

        c.fillStyle = "#E3EAEF";
        c.fill();
        c.closePath();
        c.restore();
    }

    update() {
        if (
            this.x + this.radius + this.speed.x >= canvas.width ||
            this.x - this.radius + this.speed.x <= 0
        ) {
            this.speed.x = -this.speed.x;
            this.break();
        }
        if (this.y + this.radius + this.speed.y >= canvas.height) {
            this.speed.y = -this.speed.y * this.friction;
            this.break();
        } else {
            this.speed.y += this.gravity;
        }
        this.y += this.speed.y;
        this.x += this.speed.x * this.friction;
        this.draw();
    }
}

class SmallParticle extends Particle {
    constructor(x, y, speedx, speedy, radius, color) {
        super(x, y, speedx, speedy, radius, color);
        this.gravity = randomIntBetween(0.1, 0.8);
        this.opacity = 1;
    }
    draw() {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, Math.abs(this.radius), 0, Math.PI * 2, false);
        c.globalAlpha = this.opacity;
        c.shadowColor = "#E3EAEF";
        c.shadowBlur = 20;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;

        c.fillStyle = "#E3EAEF";
        c.fill();
        c.closePath();
        c.restore();
    }

    update() {
        if (this.y + this.radius + this.speed.y >= canvas.height) {
            this.speed.y = -this.speed.y * this.friction;
        } else {
            this.speed.y += this.gravity;
        }
        this.x += this.speed.x;
        this.y += this.speed.y;
        this.decreaseOpacity();
        this.draw();
    }

    decreaseOpacity() {
        this.opacity -= 0.01;
        if (this.opacity <= 0) {
            this.opacity = 0;
        }
    }
}

function init() {
    let x = randomIntBetween(50, canvas.width - 50);
    let dx = randomIntBetween(-10, 10);

    particles.push(new Particle(x, 0, dx, 20, 15, color));
}

var backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
// backgroundGradient.addColorStop(0, "#171e26");
// backgroundGradient.addColorStop(1, "#3f586b"); 171e26

// backgroundGradient.addColorStop(0, "#101a3b");
// backgroundGradient.addColorStop(1, "#363a6a");

backgroundGradient.addColorStop(0, "#0b2139");
backgroundGradient.addColorStop(1, "#101a3b");
function animate() {
    timer++;

    if (timer % 150 == 0) {
        init();
    }
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = backgroundGradient;
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        if (particle.radius <= 0) {
            particles.splice(index, 1);
        }
        particle.update();
    });

    smallParticles.forEach((particle, index) => {
        particle.update();

        if (particle.opacity <= 0) {
            smallParticles.splice(index, 1);
        }
    });
}

init();
animate();
