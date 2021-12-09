import Block from './Block.js';
import Game from './Game.js';
import GameItem from './GameItem.js';
import KeyboardListener from './KeyboardListener.js';

export default class Bird extends GameItem {
  private ySpeed:number;

  private keyBoardListener: KeyboardListener;

  /**
   *
   * @param canvas
   * @param ctx
   * @param imageSrc
   */
  constructor(canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D, imageSrc:string, game:Game) {
    super(canvas, game);
    this.keyBoardListener = new KeyboardListener();
    this.image = Game.loadNewImage(imageSrc);
    this.xPosition = 100;
    this.yPosition = this.canvas.height / 2;
    this.ySpeed = 1;
    this.canvas = canvas;
  }

  /**
   *
   */
  public getYspeed():number {
    return this.ySpeed;
  }

  /**
   *
   */
  public setYspeed():void {
    this.ySpeed += 1;
  }

  /**
   * Method to move the HZ bird and blocks
   */
  public move():void {
    this.yPosition += this.ySpeed;
  }

  /**
   * Handle the UP key on the keyboard to give the player the ability to move the HZ bird up
   */
  public handleKeyBoard():void {
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_UP)) {
      this.yPosition -= 12;
      this.ySpeed = 1;
    }
  }

  /**
   * Method to determine whether the HZ bird collides with the top or bottom of the screen
   *
   * @returns true or false
   */
  public hzCollidesWithSide(): boolean {
    if (
      this.yPosition < 0 || this.yPosition + this.image.height > this.canvas.height
    ) {
      console.log('Collision with side!');
      return true;
    }

    return false;
  }

  /**
   * Method to determine of the HZ bird is colliding with a block
   *
   * @returns true or false
   */
  public hzCollidesWithBlock(blocks:Block[]): boolean {
    let collides: boolean = false;
    blocks.forEach((block:Block) => {
      if (
        this.xPosition < block.getXPosBlock() + block.getImageBlock().width
        && this.xPosition + this.image.width > block.getXPosBlock()
        && this.yPosition < block.getYposBlock() + block.getImageBlock().height
        && this.yPosition + this.image.height > block.getYposBlock()
      ) {
        console.log('Collision with block!');
        collides = true;
      }
    });
    return collides;
  }
}
