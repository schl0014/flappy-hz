import Game from './Game.js';
import GameItem from './GameItem.js';
export default class Block extends GameItem {
    xSpeed;
    blockspeed;
    constructor(canvas, ctx, imageSrc, blockspeed, game) {
        super(canvas, game);
        this.image = Game.loadNewImage(imageSrc);
        this.createYpos();
        this.xPosition = this.canvas.width;
        this.xSpeed = blockspeed;
        this.blockspeed = this.game.getBlockspeed();
        console.log(ctx.drawImage(this.image, this.xPosition, this.yPosition));
    }
    getXspeedBlock() {
        return this.xSpeed;
    }
    getXPosBlock() {
        return this.xPosition;
    }
    getYposBlock() {
        return this.yPosition;
    }
    getImageBlock() {
        return this.image;
    }
    setXspeed() {
        this.xSpeed = this.blockspeed;
    }
    createYpos() {
        const randomNumber = Game.randomNumber(0, 1);
        if (randomNumber === 0) {
            this.yPosition = 0;
        }
        else {
            this.yPosition = this.canvas.height - this.image.height;
        }
    }
    move() {
        this.xPosition -= this.xSpeed;
    }
}
//# sourceMappingURL=Block.js.map