import GameItem from './GameItem.js';

export default class Block extends GameItem {
  protected xSpeed: number;

  private canvas: HTMLCanvasElement;

  /**
   *
   * @param xPos postion on the x-axis
   * @param yPos position on the y-axis
   * @param image image of the block
   * @param xSpeed speed on the x-axis
   * @param canvas canvas element
   */
  constructor(
    xPos: number,
    yPos: number,
    image: HTMLImageElement,
    xSpeed: number,
    canvas: HTMLCanvasElement,
  ) {
    super(xPos, yPos, image);
    this.canvas = canvas;
    this.xSpeed = xSpeed;

    // check to see if the blocks are on the top or the bottom of the canvas
    const randomNumber = Block.randomNumber(0, 1);
    if (randomNumber === 0) {
      this.yPosition = 0;
    } else {
      this.yPosition = this.canvas.height - this.image.height;
    }
  }

  /**
   * Set the speed on the x-axis
   *
   * @param xSpeed speed on the x-axis
   */
  public setXSpeed(xSpeed: number): void {
    this.xSpeed = xSpeed;
  }

  /**
   * Get the speed on the x-axis
   *
   * @returns speed on the x-axis
   */
  public getXSpeed(): number {
    return this.xSpeed;
  }

  /**
   * Move the block on the x-axis
   */
  public move(): void {
    this.xPosition -= this.xSpeed;
  }

  /**
   * Returns a random number between min and max
   *
   * @param min - lower boundary
   * @param max - upper boundary
   * @returns a random number between min and max
   */
  public static randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}
