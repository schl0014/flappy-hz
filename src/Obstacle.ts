import GameItem from './GameItem.js';

export default abstract class Obstacle extends GameItem {
  private xSpeed: number;

  private type: string;

  private canvas: HTMLCanvasElement;

  /**
   * Intialize the Obstacle
   *
   * @param xPos position on the x-axis
   * @param yPos position on the y-axis
   * @param image image of the GameItem
   * @param xSpeed speed on the x-axis
   * @param canvas canvas
   * @param type type of the element
   */
  constructor(
    xPos: number,
    yPos: number,
    image: HTMLImageElement,
    xSpeed: number,
    canvas: HTMLCanvasElement,
    type: string,
  ) {
    super(xPos, yPos, image);
    this.xSpeed = xSpeed;
    this.canvas = canvas;
    this.type = type;

    // const randomPosition = Obstacle.randomNumber(0, 1);
    // if (randomPosition === 0) {
    //   yPos = 0;
    // } else {
    //   yPos = this.canvas.height - image.height;
    // }
  }

  public abstract move(): void;

  /**
   * Get the speed of the x-axis
   *
   * @returns the speed on the x-axis
   */
  public getXSpeed(): number {
    return this.xSpeed;
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
   * get the type of the Obstacle
   *
   * @returns the type of the obstacle
   */
  public getType(): string {
    return this.type;
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
