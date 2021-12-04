import Obstacle from './Obstacle.js';
export default class PowerUp extends Obstacle {
    ySpeed;
    canvasHeight;
    constructor(xPos, yPos, image, xSpeed, canvasHeight, canvas, type) {
        super(xPos, yPos, image, xSpeed, canvas, type);
        this.ySpeed = 10;
        this.canvasHeight = canvasHeight;
    }
    move() {
        if (this.yPosition < 0 || this.yPosition + this.image.height > this.canvasHeight) {
            this.ySpeed *= -1;
        }
        this.xPosition -= this.getXSpeed();
        this.yPosition += this.ySpeed;
    }
}
//# sourceMappingURL=PowerUp.js.map