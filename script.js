document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const maxConfettis = 150;
    const particles = [];
    const possibleColors = [
        "DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue",
        "Gold", "Violet", "PaleGreen", "SteelBlue", "SandyBrown",
        "Chocolate", "Crimson"
    ];

    function randomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    function ConfettiParticle() {
        this.x = Math.random() * W; // x
        this.y = Math.random() * H - H; // y
        this.r = randomFromTo(10, 30); // radius
        this.d = Math.random() * maxConfettis + 10; // density
        this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
        this.tilt = Math.floor(Math.random() * 10) - 10;
        this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
        this.tiltAngle = 0;

        this.draw = function() {
            ctx.beginPath();
            ctx.lineWidth = this.r / 2;
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.x + this.tilt + this.r / 4, this.y);
            ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 4);
            return ctx.stroke();
        };
    }

    function Draw() {
        const results = [];

        requestAnimationFrame(Draw);

        ctx.clearRect(0, 0, W, window.innerHeight);

        for (let i = 0; i < maxConfettis; i++) {
            results.push(particles[i].draw());
        }

        let particle = {};
        let remainingFlakes = 0;
        for (let i = 0; i < maxConfettis; i++) {
            particle = particles[i];

            particle.tiltAngle += particle.tiltAngleIncremental;
            particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
            particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

            if (particle.y <= H) remainingFlakes++;

            // If a confetti has fluttered out of view,
            // bring it back to the top and randomize its columns
            if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
                particle.x = Math.random() * W;
                particle.y = -30;
                particle.tilt = Math.floor(Math.random() * 10) - 20;
            }
        }
        return results;
    }

    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    });

    // Push new confetti objects to `particles[]`
    for (let i = 0; i < maxConfettis; i++) {
        particles.push(new ConfettiParticle());
    }

    //Initialize
    Draw();
});