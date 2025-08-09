// starfield.js
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
    const numStars = 140; // slightly more stars
    let w, h, centerX, centerY;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        centerX = w / 2;
        centerY = h / 2;
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

    let mouseX = 0, mouseY = 0;
    window.addEventListener("mousemove", e => {
        mouseX = e.clientX - centerX;
        mouseY = e.clientY - centerY;
    });

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
            let px = star.x + mouseX * 0.1004 - centerX; // doubled mouse sensitivity
            let py = star.y + mouseY * 0.1004 - centerY;
            px = px * k + centerX;
            py = py * k + centerY;

            if (px >= 0 && px <= w && py >= 0 && py <= h) {
                let size = (1 - star.z / w) * 2; // smaller stars
                ctx.beginPath();
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.fill();
            }
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    resize();
    animate();
})();
