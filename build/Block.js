import Obstacle from './Obstacle.js';
export default class Block extends Obstacle {
    constructor(xPos, yPos, image, xSpeed, canvas, type) {
        super(xPos, yPos, image, xSpeed, canvas, type);
    }
    move() {
        this.xPosition -= this.getXSpeed();
    }
}
//# sourceMappingURL=Block.js.map