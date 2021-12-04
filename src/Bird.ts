import GameItem from './GameItem.js';
import KeyboardListener from './KeyboardListener.js';
import Obstacle from './Obstacle.js';

export default class Bird extends GameItem {
  private keyBoardListener: KeyboardListener;

  private ySpeed: number;

  /**
   * Initialize the bird
   *
   * @param xPos xPosition on the x-axis
   * @param yPos yPosition on the y-axis
   * @param image image of the Bird
   */
  constructor(xPos: number, yPos: number, image: HTMLImageElement) {
    super(xPos, yPos, image);
    this.ySpeed = 1;
    this.keyBoardListener = new KeyboardListener();
  }

  /**
   * Set the speed on the y-axis
   *
   * @param ySpeed speed on the y-axis
   */
  public setYSpeed(ySpeed: number): void {
    this.ySpeed += ySpeed;
  }

  /**
   * Get the speed on the y-axis
   *
   * @returns the speed on the y-axis
   */
  public getYSpeed(): number {
    return this.ySpeed;
  }

  /**
   * Handle the UP key on the keyboard to give the player the ability to move the HZ bird up
   */
  public handleKeyBoard(): void {
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_UP)) {
      this.yPosition -= 12;
      this.ySpeed = 1;
    }
  }

  /**
   * Method to determine of the HZ bird is colliding with a block
   *
   * @param obstacles all the obstacles
   * @returns The colliding obstacle or null
   */
  public hzCollidesWithObstacle(obstacles: Obstacle[]): Obstacle {
    let collides: Obstacle = null;
    obstacles.forEach((obstacle) => {
      if (
        this.xPosition < obstacle.getXPos() + obstacle.getImage().width
        && this.xPosition + this.image.width > obstacle.getXPos()
        && this.yPosition < obstacle.getYPos() + obstacle.getImage().height
        && this.yPosition + this.image.height > obstacle.getYPos()
      ) {
        console.log('Collision with obstacle!');
        collides = obstacle;
      }
    });
    return collides;
  }

  /**
   * Method to determine whether the HZ bird collides with the top or bottom of the screen
   *
   * @param canvas the canvas element
   * @returns true or false
   */
  public hzCollidesWithSide(canvas: HTMLCanvasElement): boolean {
    if (
      this.yPosition < 0 || this.yPosition + this.image.height > canvas.height
    ) {
      console.log('Collision with side!');
      return true;
    }

    return false;
  }

  /**
   * Move the bird
   */
  public move(): void {
    this.yPosition += this.ySpeed;
  }
}
