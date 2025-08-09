
(function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    document.body.prepend(canvas);
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-1";
    canvas.style.background = "black";

    let stars = [];
    const numStars = 140;
    let w, h, centerX, centerY;

    // Satellite position
    let sat = { x: 0, y: 0, targetX: 0, targetY: 0 };

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        centerX = w / 2;
        centerY = h / 2;
        sat.x = centerX;
        sat.y = centerY;
        sat.targetX = centerX;
        sat.targetY = centerY;
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h,
                z: Math.random() * w,
                color: Math.random() < 0.7 ? "white" : "yellow"
            });
        }
    }

    let isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (!isMobile) {
        window.addEventListener("mousemove", e => {
            sat.targetX = e.clientX;
            sat.targetY = e.clientY;
        });
    } else {
        // Mobile: orbiting movement
        setInterval(() => {
            const t = Date.now() / 1000;
            sat.targetX = centerX + Math.cos(t) * 150;
            sat.targetY = centerY + Math.sin(t) * 80;
        }, 50);
    }

    function drawSatellite() {
        sat.x += (sat.targetX - sat.x) * 0.05;
        sat.y += (sat.targetY - sat.y) * 0.05;

        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🛰", sat.x, sat.y);
    }

    function animate() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, w, h);

        for (let star of stars) {
            star.z -= 0.5;
            if (star.z <= 0) {
                star.x = Math.random() * w;
                star.y = Math.random() * h;
                star.z = w;
            }

            let k = 128.0 / star.z;
            let px = star.x + (sat.x - centerX) * 0.004 - centerX;
            let py = star.y + (sat.y - centerY) * 0.004 - centerY;
            px = px * k + centerX;
            py = py * k + centerY;

            if (px >= 0 && px <= w && py >= 0 && py <= h) {
                let size = (1 - star.z / w) * 2;
                ctx.beginPath();
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.fill();
            }
        }

        drawSatellite();
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    resize();
    animate();
})();
