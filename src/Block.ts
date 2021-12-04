import Obstacle from './Obstacle.js';

export default class Block extends Obstacle {
  /**
   * Initialize the Block
   *
   * @param xPos postion on the x-axis
   * @param yPos position on the y-axis
   * @param image image of the block
   * @param xSpeed speed on the x-axis
   * @param canvas canvas element
   * @param type type of the element
   */
  public constructor(
    xPos: number,
    yPos: number,
    image: HTMLImageElement,
    xSpeed: number,
    canvas: HTMLCanvasElement,
    type: string,
  ) {
    super(xPos, yPos, image, xSpeed, canvas, type);
  }

  /**
   * Move the block
   */
  public move(): void {
    this.xPosition -= this.getXSpeed();
  }
}
