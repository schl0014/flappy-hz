import Game from './Game.js';

export default abstract class GameItem {
  protected xPosition:number;

  protected game: Game;

  protected yPosition:number;

  protected image:HTMLImageElement;

  protected canvas:HTMLCanvasElement;

  /**
   *
   *
   * @param canvas
   */
  constructor(canvas:HTMLCanvasElement, game:Game) {
    this.canvas = canvas;
    this.game = game;
    // console.log(this.canvas);
  }

  /**
   * Draws all the necessary elements to the canvas
   *
   * @param ctx
   */
  public draw(ctx:CanvasRenderingContext2D):void {
    // console.log(this.canvas);


    ctx.drawImage(this.image, this.xPosition, this.yPosition);

    // write the current score
    this.game.writeTextToCanvas(
      `Score is: ${this.game.getScore()}`,
      40,
      this.canvas.width / 2,
      40,
    );
  }

  public abstract move():void;
}
