export default class GameItem {
    xPosition;
    game;
    yPosition;
    image;
    canvas;
    constructor(canvas, game) {
        this.canvas = canvas;
        this.game = game;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.xPosition, this.yPosition);
        this.game.writeTextToCanvas(`Score is: ${this.game.getScore()}`, 40, this.canvas.width / 2, 40);
    }
}
//# sourceMappingURL=GameItem.js.map