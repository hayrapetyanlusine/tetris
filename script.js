const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function draw() {
    
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();