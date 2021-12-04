import GameItem from './GameItem.js';
import KeyboardListener from './KeyboardListener.js';
export default class Bird extends GameItem {
    keyBoardListener;
    ySpeed;
    constructor(xPos, yPos, image) {
        super(xPos, yPos, image);
        this.ySpeed = 1;
        this.keyBoardListener = new KeyboardListener();
    }
    setYSpeed(ySpeed) {
        this.ySpeed += ySpeed;
    }
    getYSpeed() {
        return this.ySpeed;
    }
    handleKeyBoard() {
        if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_UP)) {
            this.yPosition -= 12;
            this.ySpeed = 1;
        }
    }
    hzCollidesWithBlock(blocks) {
        let collides = false;
        blocks.forEach((block) => {
            if (this.xPosition < block.getXPos() + block.getImage().width
                && this.xPosition + this.image.width > block.getXPos()
                && this.yPosition < block.getYPos() + block.getImage().height
                && this.yPosition + this.image.height > block.getYPos()) {
                console.log('Collision with block!');
                collides = true;
            }
        });
        return collides;
    }
    hzCollidesWithSide(canvas) {
        if (this.yPosition < 0 || this.yPosition + this.image.height > canvas.height) {
            console.log('Collision with side!');
            return true;
        }
        return false;
    }
    move() {
        this.yPosition += this.ySpeed;
    }
}
//# sourceMappingURL=Bird.js.map