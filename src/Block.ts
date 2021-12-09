import Game from './Game.js';
import GameItem from './GameItem.js';

export default class Block extends GameItem {
  private xSpeed:number;

  private blockspeed:number;

  // Property to keep track of the current block speed

  /**
   * @param canvas
   * @param ctx
   * @param imageSrc
   * @param blockspeed
   */
  constructor(canvas:HTMLCanvasElement,
    ctx:CanvasRenderingContext2D, imageSrc:string, blockspeed:number, game:Game) {
    super(canvas, game);
    this.image = Game.loadNewImage(imageSrc);
    this.createYpos();
    this.xPosition = this.canvas.width;

    this.xSpeed = blockspeed;
    this.blockspeed = this.game.getBlockspeed();
    console.log(ctx.drawImage(this.image, this.xPosition, this.yPosition));
  }

  /**
   *
   */
  public getXspeedBlock():number {
    return this.xSpeed;
  }

  /**
   *
   */
  public getXPosBlock():number {
    return this.xPosition;
  }

  /**
   *
   */
  public getYposBlock():number {
    return this.yPosition;
  }

  /**
   *
   */
  public getImageBlock():HTMLImageElement {
    return this.image;
  }

  /**
   *
   */
  public setXspeed():void {
    this.xSpeed = this.blockspeed;
  }


  private createYpos():void {
    const randomNumber = Game.randomNumber(0, 1);
    if (randomNumber === 0) {
      this.yPosition = 0;
    } else {
      this.yPosition = this.canvas.height - this.image.height;
    }
  }

   /**
   * Method to move the HZ bird and blocks
   */
    public move() {
      this.xPosition -= this.xSpeed;
  }
}
