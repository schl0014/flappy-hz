import KeyboardListener from './KeyboardListener.js';
class Game {
    blocks;
    bird;
    score;
    blockSpeed = 5;
    canvas;
    ctx;
    keyBoardListener;
    constructor(canvasId) {
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext('2d');
        this.blocks = [];
        this.score = 0;
        this.keyBoardListener = new KeyboardListener();
        this.bird = this.insertHzBird();
        console.log(this.bird);
        this.loop();
    }
    loop = () => {
        this.increaseGravity();
        this.insertExtraBlock();
        this.increaseBlockSpeed();
        this.blockOutOfCanvas();
        this.handleKeyBoard();
        this.move();
        this.draw();
        const collidesWithBlock = this.hzCollidesWithBlock();
        const collidesWithSide = this.hzCollidesWithSide();
        if (collidesWithBlock || collidesWithSide) {
            this.drawGameOver();
        }
        else {
            this.score += 1;
            requestAnimationFrame(this.loop);
        }
    };
    increaseGravity() {
        if (this.score % 8 === 0) {
            this.bird.ySpeed += 1;
        }
    }
    insertExtraBlock() {
        if (this.score === 0 || this.score % Math.round(500 / this.blockSpeed) === 0) {
            this.blocks.push(this.createBlock());
        }
    }
    createBlock() {
        const image = Game.loadNewImage('./assets/block.png');
        let yPos;
        const randomNumber = Game.randomNumber(0, 1);
        if (randomNumber === 0) {
            yPos = 0;
        }
        else {
            yPos = this.canvas.height - image.height;
        }
        return {
            xPos: this.canvas.width,
            yPos: yPos,
            xSpeed: this.blockSpeed,
            image: image,
        };
    }
    increaseBlockSpeed() {
        if (this.score % 400 === 0) {
            this.blockSpeed += 2;
            this.blocks.forEach((block) => {
                block.xSpeed = this.blockSpeed;
            });
        }
    }
    blockOutOfCanvas() {
        this.blocks.forEach((block, index) => {
            if (block.xPos + block.image.width < 0) {
                this.blocks.splice(index, 1);
            }
        });
    }
    handleKeyBoard() {
        if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_UP)) {
            this.bird.yPos -= 12;
            this.bird.ySpeed = 1;
        }
    }
    drawGameOver() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(`Game over! Your score is: ${this.score}`, 40, this.canvas.width / 2, this.canvas.height / 2);
    }
    insertHzBird() {
        const image = Game.loadNewImage('./assets/logo.png');
        return {
            xPos: 100,
            yPos: this.canvas.height / 2,
            ySpeed: 1,
            image: image,
        };
    }
    hzCollidesWithBlock() {
        let collides = false;
        this.blocks.forEach((block) => {
            if (this.bird.xPos < block.xPos + block.image.width &&
                this.bird.xPos + this.bird.image.width > block.xPos &&
                this.bird.yPos < block.yPos + block.image.height &&
                this.bird.yPos + this.bird.image.height > block.yPos) {
                console.log('Collision with block!');
                collides = true;
            }
        });
        return collides;
    }
    hzCollidesWithSide() {
        if (this.bird.yPos < 0 || this.bird.yPos + this.bird.image.height > this.canvas.height) {
            console.log('Collision with side!');
            return true;
        }
        return false;
    }
    move() {
        this.bird.yPos += this.bird.ySpeed;
        this.blocks.forEach((block) => {
            block.xPos -= block.xSpeed;
        });
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawHZBird();
        this.drawBlocks();
        this.writeTextToCanvas(`Score is: ${this.score}`, 40, this.canvas.width / 2, 40);
    }
    drawHZBird() {
        this.ctx.drawImage(this.bird.image, this.bird.xPos, this.bird.yPos);
    }
    drawBlocks() {
        this.blocks.forEach((block) => {
            this.ctx.drawImage(block.image, block.xPos, block.yPos);
        });
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'white') {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
const init = () => new Game(document.getElementById('canvas'));
window.addEventListener('load', init);
//# sourceMappingURL=app.js.map