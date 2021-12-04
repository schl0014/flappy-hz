import GameItem from './GameItem.js';
export default class Block extends GameItem {
    xSpeed;
    canvas;
    constructor(xPos, yPos, image, xSpeed, canvas) {
        super(xPos, yPos, image);
        this.canvas = canvas;
        this.xSpeed = xSpeed;
        const randomNumber = Block.randomNumber(0, 1);
        if (randomNumber === 0) {
            this.yPosition = 0;
        }
        else {
            this.yPosition = this.canvas.height - this.image.height;
        }
    }
    setXSpeed(xSpeed) {
        this.xSpeed = xSpeed;
    }
    getXSpeed() {
        return this.xSpeed;
    }
    move() {
        this.xPosition -= this.xSpeed;
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=Block.js.map