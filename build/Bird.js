import Game from './Game.js';
import GameItem from './GameItem.js';
import KeyboardListener from './KeyboardListener.js';
export default class Bird extends GameItem {
    ySpeed;
    keyBoardListener;
    constructor(canvas, ctx, imageSrc, game) {
        super(canvas, game);
        this.keyBoardListener = new KeyboardListener();
        this.image = Game.loadNewImage(imageSrc);
        this.xPosition = 100;
        this.yPosition = this.canvas.height / 2;
        this.ySpeed = 1;
        this.canvas = canvas;
    }
    getYspeed() {
        return this.ySpeed;
    }
    setYspeed() {
        this.ySpeed += 1;
    }
    move() {
        this.yPosition += this.ySpeed;
    }
    handleKeyBoard() {
        if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_UP)) {
            this.yPosition -= 12;
            this.ySpeed = 1;
        }
    }
    hzCollidesWithSide() {
        if (this.yPosition < 0 || this.yPosition + this.image.height > this.canvas.height) {
            console.log('Collision with side!');
            return true;
        }
        return false;
    }
    hzCollidesWithBlock(blocks) {
        let collides = false;
        blocks.forEach((block) => {
            if (this.xPosition < block.getXPosBlock() + block.getImageBlock().width
                && this.xPosition + this.image.width > block.getXPosBlock()
                && this.yPosition < block.getYposBlock() + block.getImageBlock().height
                && this.yPosition + this.image.height > block.getYposBlock()) {
                console.log('Collision with block!');
                collides = true;
            }
        });
        return collides;
    }
}
//# sourceMappingURL=Bird.js.map