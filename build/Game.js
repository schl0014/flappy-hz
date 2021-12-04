import Block from './Block.js';
import Bird from './Bird.js';
export default class Game {
    blocks;
    bird;
    score;
    blockSpeed = 5;
    canvas;
    ctx;
    constructor(canvasId) {
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext('2d');
        this.blocks = [];
        this.score = 0;
        this.bird = this.insertHzBird();
        console.log(this.bird);
        this.loop();
    }
    loop = () => {
        this.increaseGravity();
        this.insertExtraBlock();
        this.increaseBlockSpeed();
        this.blockOutOfCanvas();
        this.bird.handleKeyBoard();
        this.move();
        this.draw();
        const collidesWithBlock = this.bird.hzCollidesWithBlock(this.blocks);
        const collidesWithSide = this.bird.hzCollidesWithSide(this.canvas);
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
            this.bird.setYSpeed(1);
        }
    }
    insertExtraBlock() {
        if (this.score === 0 || this.score % Math.round(500 / this.blockSpeed) === 0) {
            this.blocks.push(this.createBlock());
        }
    }
    createBlock() {
        const image = Game.loadNewImage('./assets/block.png');
        return new Block(this.canvas.width, 0, image, this.blockSpeed, this.canvas);
    }
    increaseBlockSpeed() {
        if (this.score % 400 === 0) {
            this.blockSpeed += 2;
            this.blocks.forEach((block) => {
                block.setXSpeed(this.blockSpeed);
            });
        }
    }
    blockOutOfCanvas() {
        this.blocks.forEach((block, index) => {
            if (block.getXPos() + block.getImage().width < 0) {
                this.blocks.splice(index, 1);
            }
        });
    }
    drawGameOver() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(`Game over! Your score is: ${this.score}`, 40, this.canvas.width / 2, this.canvas.height / 2);
    }
    insertHzBird() {
        const image = Game.loadNewImage('./assets/logo.png');
        return new Bird(100, this.canvas.height / 2, image);
    }
    move() {
        this.bird.move();
        this.blocks.forEach((block) => {
            block.move();
        });
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawHZBird();
        this.drawBlocks();
        this.writeTextToCanvas(`Score is: ${this.score}`, 40, this.canvas.width / 2, 40);
    }
    drawHZBird() {
        this.bird.draw(this.ctx);
    }
    drawBlocks() {
        this.blocks.forEach((block) => {
            block.draw(this.ctx);
        });
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = 'center', color = 'red') {
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
//# sourceMappingURL=Game.js.map