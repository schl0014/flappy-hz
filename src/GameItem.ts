export default class GameItem {
  protected xPosition: number;

  protected yPosition: number;

  protected image: HTMLImageElement;

  /**
   * Initalize the GameItem
   *
   * @param xPos position on the x-axis
   * @param yPos position on the y-axis
   * @param image image of the GameItem
   */
  constructor(xPos: number, yPos: number, image: HTMLImageElement) {
    this.xPosition = xPos;
    this.yPosition = yPos;
    this.image = image;
  }

  /**
   * Get the image
   *
   * @returns the image of  the GameItem
   */
  public getImage(): HTMLImageElement {
    return this.image;
  }

  /**
   * Set the image of the GameItem
   *
   * @param image the image of the GameItem
   */
  public setImage(image: HTMLImageElement): void {
    this.image = image;
  }

  /**
   * Get the position on the x-axis
   *
   * @returns the position on the x-axis
   */
  public getXPos(): number {
    return this.xPosition;
  }

  /**
   * Set the position on the x-axis
   *
   * @param xPos the position on the x-axis
   */
  public setXPos(xPos: number): void {
    this.xPosition = xPos;
  }

  /**
   * Get the position on the y-axis
   *
   * @returns the position on the y-axis
   */
  public getYPos(): number {
    return this.yPosition;
  }

  /**
   * Set the position on the y-axis
   *
   * @param yPos the position on the y-axis
   */
  public setYPos(yPos: number): void {
    this.yPosition = yPos;
  }

  /**
   * Draw the GameItem on the canvas
   *
   * @param ctx rendering context
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.xPosition, this.yPosition);
  }
}
