import Obstacle from './Obstacle.js';

export default class PowerUp extends Obstacle {
  private ySpeed: number;

  private canvasHeight: number;

  /**
   * Initialize the PowerUp
   *
   * @param xPos position on the x-axis
   * @param yPos position on the y-axis
   * @param image image of the PowerUp
   * @param xSpeed speed on the x-axis
   * @param canvasHeight height of the canvas
   * @param canvas canvas
   * @param type type of the element
   */
  constructor(
    xPos: number,
    yPos: number,
    image: HTMLImageElement,
    xSpeed: number,
    canvasHeight: number,
    canvas: HTMLCanvasElement,
    type: string,
  ) {
    super(xPos, yPos, image, xSpeed, canvas, type);
    this.ySpeed = 10;
    this.canvasHeight = canvasHeight;
  }

  /**
   * Move the obstacle
   */
  public move(): void {
    if (
      this.yPosition < 0 || this.yPosition + this.image.height > this.canvasHeight
    ) {
      this.ySpeed *= -1;
    }

    this.xPosition -= this.getXSpeed();
    this.yPosition += this.ySpeed;
  }
}
