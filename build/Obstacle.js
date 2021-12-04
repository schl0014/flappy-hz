import GameItem from './GameItem.js';
export default class Obstacle extends GameItem {
    xSpeed;
    type;
    canvas;
    constructor(xPos, yPos, image, xSpeed, canvas, type) {
        super(xPos, yPos, image);
        this.xSpeed = xSpeed;
        this.canvas = canvas;
        this.type = type;
    }
    getXSpeed() {
        return this.xSpeed;
    }
    setXSpeed(xSpeed) {
        this.xSpeed = xSpeed;
    }
    getType() {
        return this.type;
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=Obstacle.js.map