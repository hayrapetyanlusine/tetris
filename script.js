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
    y: -3,
    canMoveDown: true,
    dropInterval: 500
};
options.sizeX = canvas.width / options.width;
options.sizeY = canvas.height / options.height;

let currentPiece;
let board = Array(options.width + 1).fill([]).map(() => Array(options.height).fill(0));

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

function drawBoardPieces() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j]) {
                ctx.fillStyle = board[i][j].color;
                ctx.fillRect(j * options.sizeX, i * options.sizeY, options.sizeX, options.sizeY);
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

    options.dropInterval = 500;
    options.canMoveDown = true;
}

function stopAndCallNext() {
    options.canMoveDown = false;
    changeBoardState();
    removeFullRow();
    getNextPiece();
}

function pieceMoveDown() {
    const isEmptyBottom = currentPiece.piece[currentPiece.piece.length - 1].every((v) => v === 0);

    if (options.canMoveDown) {
        if (currentPiece.y === options.height - currentPiece.piece.length && isEmptyBottom) {
            currentPiece.y++;
            stopAndCallNext();
        } else if (currentPiece.y < options.height - currentPiece.piece.length) {
            currentPiece.y++;
        } else {
            stopAndCallNext();
        }
    }
}

function moveRight() {
    const rightMostCell = currentPiece.piece.reduce((acc, row) => {
        const lastCell = row.lastIndexOf(1);
        if (lastCell !== -1 && lastCell > acc) {
            acc = lastCell;
        }
        return acc;
    }, 0);

    if (currentPiece.x + rightMostCell < options.width - 1) {
        currentPiece.x++;
    }
}

function moveLeft() {
    const leftMostCell = currentPiece.piece.reduce((acc, row) => {
        const firstCell = row[0];
        if (firstCell > acc) {
            acc = firstCell;
        }
        return acc;
    }, 0);

    if (currentPiece.x === 0 && leftMostCell) {
        return;
    }

    if (currentPiece.x >= 0) {
        currentPiece.x--;
    }
}

function rotatePiece() {
    if (currentPiece.x < 0) {
        currentPiece.x++;
    }

    if (currentPiece.x + 2 > options.width - 1) {
        currentPiece.x--;
    }

    const rotatedPiece = currentPiece.piece.map((row, i) =>
        row.map((val, j) => currentPiece.piece[currentPiece.piece.length - 1 - j][i])
    );

    currentPiece.piece = rotatedPiece;
}

function quickMoveDown() {
    options.dropInterval = 30;
}

function intersect() {
    for (let r = 0; r < currentPiece.piece.length; r++) {
        for (let c = 0; c < currentPiece.piece[r].length; c++) {
            if (currentPiece.piece[r][c]) {
                const boardX = currentPiece.x + c;
                const boardY = currentPiece.y + r;

                if (currentPiece.y > 0 && board[boardY + 1][boardX]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function changeBoardState() {
    for (let i = 0; i < currentPiece.piece.length; i++) {
        const row = currentPiece.piece[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j] === 1) {
                board[currentPiece.y + i][currentPiece.x + j] = {
                    color: currentPiece.color,
                    n: 1,
                };
            }
        }
    }
}

function removeFullRow() {
    for (let i = 0; i < board.length - 1; i++) {
        if (!board[i].includes(0)) {
            for (let k = i; k > 0; k--) {
                board[k] = board[k - 1];
            }
            board[0] = new Array(options.width).fill(0);
        }
    }
}

function gameOver() {
    for (let i = 0; i < board[1].length; i++) {
        if (board[1][5] || board[1][6] || board[1][7]) {
            return true;
        }
    }
    return false;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (intersect()) {
        stopAndCallNext();
    }

    if (gameOver()) {
        alert("Game Over!");
    }
}

function draw() {
    drawPiece();
    drawBoardPieces();
    drawBoard();
}

let dropStart = Date.now();
function loop() {
    let now = Date.now();
    let delta = now - dropStart;

    if (delta > options.dropInterval) {
        pieceMoveDown();
        dropStart = Date.now();
    }

    update();
    draw();
    requestAnimationFrame(loop);
}

// user actions
btn.addEventListener("click", () => {
    getNextPiece();
    loop();
});

document.addEventListener("keydown", e => {
    if (e.code === "ArrowRight") { moveRight() }
    else if (e.code === "ArrowLeft") { moveLeft() }
    else if (e.code === "ArrowUp") { rotatePiece() }
    else if (e.code === "ArrowDown") { quickMoveDown() }
});