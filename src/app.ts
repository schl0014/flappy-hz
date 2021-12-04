import KeyboardListener from './KeyboardListener.js';

class Game {
  // Properties for game elements
  private blocks: any[];

  private bird: any;

  private score: number;

  // Property to keep track of the current block speed
  private blockSpeed = 5;

  // Properties for canvas and keyboard
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private keyBoardListener: KeyboardListener;

  /**
   * Initialize the Game
   *
   * @param canvasId the id of the canvas
   */
  public constructor(canvasId: HTMLCanvasElement) {
    // Construct all of the canvas
    this.canvas = canvasId;
    this.canvas.width = window.innerWidth;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext('2d');
    this.blocks = [];
    this.score = 0;

    this.keyBoardListener = new KeyboardListener();

    this.bird = this.insertHzBird();
    console.log(this.bird);

    this.loop();
  }

  /**
   * Method for the Game Loop
   */
  private loop = () => {
    this.increaseGravity();
    this.insertExtraBlock();
    this.increaseBlockSpeed();
    this.blockOutOfCanvas();
    this.handleKeyBoard();

    this.move();
    this.draw();

    const collidesWithBlock = this.hzCollidesWithBlock();
    const collidesWithSide = this.hzCollidesWithSide();

    if (collidesWithBlock || collidesWithSide) {
      // The game loop ends on game over (the requestAnimationFrame is no longer called).
      // Draw the game over text as last frame.
      this.drawGameOver();
    } else {
      this.score += 1;
      requestAnimationFrame(this.loop);
    }
  };

  /**
   * Increase gravity (the downward motion of the HZ bird) every few frames
   */
  private increaseGravity() {
    if (this.score % 8 === 0) {
      this.bird.ySpeed += 1;
    }
  }

  /**
   * Every few frames, insert a new block in the playing field
   */
  private insertExtraBlock() {
    if (
      this.score === 0 || this.score % Math.round(500 / this.blockSpeed) === 0
    ) {
      this.blocks.push(this.createBlock());
    }
  }

  /**
   * Create a new block which can be added to the playing field
   *
   * @returns The block
   */
  private createBlock(): any {
    const image = Game.loadNewImage('./assets/block.png');
    let yPos: number;

    const randomNumber = Game.randomNumber(0, 1);
    if (randomNumber === 0) {
      yPos = 0;
    } else {
      yPos = this.canvas.height - image.height;
    }

    return {
      xPos: this.canvas.width,
      yPos: yPos,
      xSpeed: this.blockSpeed,
      image: image,
    };
  }

  /**
   * Every few frames, increase the speed of the blocks so the game becomes harder
   */
  private increaseBlockSpeed() {
    if (this.score % 400 === 0) {
      this.blockSpeed += 2;
      this.blocks.forEach((block) => {
        block.xSpeed = this.blockSpeed;
      });
    }
  }

  /**
   * Method to determine of a block has fully left the window and remove it from the array.
   */
  private blockOutOfCanvas() {
    this.blocks.forEach((block, index) => {
      if (block.xPos + block.image.width < 0) {
        this.blocks.splice(index, 1);
      }
    });
  }

  /**
   * Handle the UP key on the keyboard to give the player the ability to move the HZ bird up
   */
  private handleKeyBoard() {
    if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_UP)) {
      this.bird.yPos -= 12;
      this.bird.ySpeed = 1;
    }
  }

  /**
   * Draw the game over screen
   */
  private drawGameOver() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // write the current score
    this.writeTextToCanvas(
      `Game over! Your score is: ${this.score}`,
      40,
      this.canvas.width / 2,
      this.canvas.height / 2,
    );
  }

  /**
   * Method to create the HZ bird object
   *
   * @returns returns a HZ bird
   */
  private insertHzBird(): any {
    const image = Game.loadNewImage('./assets/logo.png');
    return {
      xPos: 100,
      yPos: this.canvas.height / 2,
      ySpeed: 1,
      image: image,
    };
  }

  /**
   * Method to determine of the HZ bird is colliding with a block
   *
   * @returns true or false
   */
  private hzCollidesWithBlock(): any {
    let collides: boolean = false;
    this.blocks.forEach((block) => {
      if (
        this.bird.xPos < block.xPos + block.image.width &&
        this.bird.xPos + this.bird.image.width > block.xPos &&
        this.bird.yPos < block.yPos + block.image.height &&
        this.bird.yPos + this.bird.image.height > block.yPos
      ) {
        console.log('Collision with block!');
        collides = true;
      }
    });
    return collides;
  }

  /**
   * Method to determine whether the HZ bird collides with the top or bottom of the screen
   *
   * @returns true or false
   */
  private hzCollidesWithSide(): any {
    if (
      this.bird.yPos < 0 || this.bird.yPos + this.bird.image.height > this.canvas.height
    ) {
      console.log('Collision with side!');
      return true;
    }

    return false;
  }

  /**
   * Method to move the HZ bird and blocks
   */
  private move() {
    this.bird.yPos += this.bird.ySpeed;
    this.blocks.forEach((block) => {
      block.xPos -= block.xSpeed;
    });
  }

  /**
   * Draws all the necessary elements to the canvas
   */
  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawHZBird();
    this.drawBlocks();

    // write the current score
    this.writeTextToCanvas(
      `Score is: ${this.score}`,
      40,
      this.canvas.width / 2,
      40
    );
  }

  /**
   * Method to draw the HZ bird
   */
  private drawHZBird() {
    this.ctx.drawImage(this.bird.image, this.bird.xPos, this.bird.yPos);
  }

  /**
   * Method to draw all the blocks
   */
  private drawBlocks() {
    this.blocks.forEach((block) => {
      this.ctx.drawImage(block.image, block.xPos, block.yPos);
    });
  }

  /**
   * Writes text to the canvas
   *
   * @param text - Text to write
   * @param fontSize - Font size in pixels
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param alignment - Where to align the text
   * @param color - The color of the text
   */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = 'center',
    color: string = 'white',
  ): void {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Method to load an image
   *
   * @param source the source
   * @returns HTMLImageElement - returns an image
   */
  public static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
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

/*
 * Start the game whenever the entire DOM is loaded
 */
const init = () => new Game(document.getElementById('canvas') as HTMLCanvasElement);

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', init);
