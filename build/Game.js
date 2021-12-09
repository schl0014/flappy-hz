import Bird from './Bird.js';
import Block from './Block.js';
export default class Game {
    blocks;
    bird;
    score;
    gameItem;
    blockSpeed;
    canvas;
    ctx;
    constructor(canvasId) {
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext('2d');
        this.blocks = [];
        this.score = 0;
        this.blockSpeed = 5;
        this.bird = new Bird(this.canvas, this.ctx, './assets/logo.png', this);
        console.log(this.bird);
        this.loop();
    }
    getScore() {
        return this.score;
    }
    getBlockspeed() {
        return this.blockSpeed;
    }
    loop = () => {
        this.increaseGravity();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.blocks.length; i++) {
            this.blocks[i].draw(this.ctx);
            this.blocks[i].move();
        }
        this.bird.draw(this.ctx);
        this.bird.move();
        this.blockOutOfCanvas();
        this.insertExtraBlock();
        this.increaseBlockSpeed();
        this.bird.handleKeyBoard();
        const collidesWithBlock = this.bird.hzCollidesWithBlock(this.blocks);
        const collidesWithSide = this.bird.hzCollidesWithSide();
        if (collidesWithBlock || collidesWithSide) {
            this.drawGameOver();
        }
        else {
            this.score += 1;
            requestAnimationFrame(this.loop);
        }
    };
    insertExtraBlock() {
        if (this.score === 0 || this.score % Math.round(500 / this.getBlockspeed()) === 0) {
            this.blocks.push(new Block(this.canvas, this.ctx, './assets/block.png', this.getBlockspeed(), this));
        }
    }
    increaseBlockSpeed() {
        if (this.score % 400 === 0) {
            this.blockSpeed += 2;
            this.blocks.forEach((block) => {
                block.setXspeed();
            });
        }
    }
    blockOutOfCanvas() {
        this.blocks.forEach((block, index) => {
            if (block.getXPosBlock() + block.getImageBlock().width < 0) {
                this.blocks.splice(index, 1);
            }
        });
    }
    drawGameOver() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(`Game over! Your score is: ${this.score}`, 40, this.canvas.width / 2, this.canvas.height / 2);
    }
    increaseGravity() {
        if (this.score % 8 === 0) {
            this.bird.setYspeed();
        }
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