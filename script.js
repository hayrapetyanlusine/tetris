const btn = document.getElementById("btn");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const pieces = [
    {
        piece: [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: "#4b0082"
    },
    {
        piece: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        color: "#437db3"
    },
    {
        piece: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0],
        ],
        color: "#ffa500"
    },
    {
        piece: [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ],
        color: "#f5f543"
    },
    {
        piece: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ],
        color: "#2e8b57"
    },
    {
        piece: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ],
        color: "#8b0000"
    },
    {
        piece: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        color: "#d2b48c"
    }
];

const options = {
    width: 13,
    height: 13,
    x: 5,
    y: 1,
};
options.sizeX = canvas.width / options.width;
options.sizeY = canvas.height / options.height;

let currentPiece;

function drawBoard() {
    ctx.strokeStyle = "gray";

    for (let i = 0; i < options.width; i++) {
        for (let j = 0; j < options.height; j++) {
            ctx.strokeRect(j * options.sizeX, i * options.sizeY, options.sizeX, options.sizeY);
        }
    }
}

function drawPiece() {
    for (let r = 0; r < currentPiece.piece.length; r++) {
        for (let c = 0; c < currentPiece.piece[r].length; c++) {
            if (currentPiece.piece[r][c]) {
                ctx.fillStyle = currentPiece.color;
                ctx.fillRect((c + currentPiece.x) * options.sizeX, (r + currentPiece.y) * options.sizeY, options.sizeX, options.sizeY);
            }
        }
    }
}

function getNextPiece() {
    const randomPiece = pieces[getRandomInt(pieces.length)];

    currentPiece = {
        ...randomPiece,
        x: options.x,
        y: options.y,
    };
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function draw() {
    drawPiece();
    drawBoard();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

btn.addEventListener("click", () => {
    getNextPiece();
    loop();
});