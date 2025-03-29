import { 
  BOARD_WIDTH, 
  BOARD_HEIGHT, 
  BLOCK_SIZE, 
  TetrominoType, 
  GameState,
  POINTS,
  COLORS,
  INITIAL_LEVEL,
  INITIAL_SPEED,
  SPEED_DECREMENT,
  MIN_SPEED,
  LINES_PER_LEVEL
} from './constants';
import { Tetromino } from './tetromino';

export class TetrisGame {
  private canvas: HTMLCanvasElement;
  private nextCanvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private nextCtx: CanvasRenderingContext2D;
  private board: number[][] = [];
  private currentPiece: Tetromino | null = null;
  private nextPiece: Tetromino | null = null;
  private gameState: GameState = GameState.IDLE;
  private score: number = 0;
  private level: number = INITIAL_LEVEL;
  private lines: number = 0;
  private dropInterval: number = INITIAL_SPEED;
  private lastDropTime: number = 0;
  private dropCounter: number = 0;
  private gameLoopId: number | null = null;
  private scoreElement: HTMLElement;
  private levelElement: HTMLElement;
  private linesElement: HTMLElement;
  
  constructor() {
    this.canvas = document.getElementById('game-board') as HTMLCanvasElement;
    this.nextCanvas = document.getElementById('next-piece') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.nextCtx = this.nextCanvas.getContext('2d')!;
    
    this.scoreElement = document.getElementById('score')!;
    this.levelElement = document.getElementById('level')!;
    this.linesElement = document.getElementById('lines')!;
    
    this.resetGame();
    this.setupEventListeners();
  }
  
  // 初始化游戏状态
  private resetGame(): void {
    // 创建空棋盘
    this.board = Array(BOARD_HEIGHT).fill(0).map(() => Array(BOARD_WIDTH).fill(0));
    
    // 初始化游戏状态
    this.gameState = GameState.IDLE;
    this.score = 0;
    this.level = INITIAL_LEVEL;
    this.lines = 0;
    
    // 设置下落速度
    this.dropInterval = INITIAL_SPEED;
    this.lastDropTime = 0;
    this.dropCounter = 0;
    
    // 清除定时器
    if (this.gameLoopId !== null) {
      cancelAnimationFrame(this.gameLoopId);
      this.gameLoopId = null;
    }
    
    // 创建方块
    this.createNewPiece();
    
    // 更新UI
    this.updateScore();
    this.draw();
  }
  
  // 创建新方块
  private createNewPiece(): void {
    // 如果有下一个方块，则使用它
    if (this.nextPiece) {
      this.currentPiece = this.nextPiece;
    } else {
      // 随机创建一个方块
      const types = Object.values(TetrominoType).filter(v => !isNaN(Number(v))) as number[];
      const randomType = types[Math.floor(Math.random() * types.length)] as TetrominoType;
      this.currentPiece = new Tetromino(randomType);
    }
    
    // 生成下一个方块
    const types = Object.values(TetrominoType).filter(v => !isNaN(Number(v))) as number[];
    const randomType = types[Math.floor(Math.random() * types.length)] as TetrominoType;
    this.nextPiece = new Tetromino(randomType);
    
    // 检查游戏是否结束
    if (!this.currentPiece.canMove(this.board, 0, 0)) {
      this.gameState = GameState.GAME_OVER;
    }
    
    // 绘制下一个方块预览
    this.drawNextPiece();
  }
  
  // 开始游戏
  start(): void {
    if (this.gameState === GameState.IDLE || this.gameState === GameState.GAME_OVER) {
      this.resetGame();
      this.gameState = GameState.PLAYING;
      this.gameLoop(0);
    } else if (this.gameState === GameState.PAUSED) {
      this.gameState = GameState.PLAYING;
      this.gameLoop(0);
    }
  }
  
  // 暂停游戏
  pause(): void {
    if (this.gameState === GameState.PLAYING) {
      this.gameState = GameState.PAUSED;
      if (this.gameLoopId !== null) {
        cancelAnimationFrame(this.gameLoopId);
        this.gameLoopId = null;
      }
    }
  }
  
  // 游戏主循环
  private gameLoop(time: number): void {
    const deltaTime = time - this.lastDropTime;
    this.dropCounter += deltaTime;
    this.lastDropTime = time;
    
    if (this.dropCounter > this.dropInterval) {
      this.moveDown();
      this.dropCounter = 0;
    }
    
    this.draw();
    
    if (this.gameState === GameState.PLAYING) {
      this.gameLoopId = requestAnimationFrame(this.gameLoop.bind(this));
    }
  }
  
  // 绘制游戏状态
  private draw(): void {
    // 清空画布
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 绘制棋盘
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        const value = this.board[y][x];
        if (value !== 0) {
          this.drawBlock(this.ctx, x, y, value);
        }
      }
    }
    
    // 绘制当前方块
    if (this.currentPiece) {
      const { matrix, position } = this.currentPiece;
      for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
          if (matrix[y][x] !== 0) {
            this.drawBlock(
              this.ctx,
              position.x + x,
              position.y + y,
              matrix[y][x]
            );
          }
        }
      }
    }
    
    // 绘制网格线
    this.drawGrid();
  }
  
  // 绘制下一个方块预览
  private drawNextPiece(): void {
    if (!this.nextPiece) return;
    
    // 清空预览画布
    this.nextCtx.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
    
    const blockSize = 24; // 预览中方块大小
    const { matrix } = this.nextPiece;
    const offsetX = (this.nextCanvas.width - matrix[0].length * blockSize) / 2;
    const offsetY = (this.nextCanvas.height - matrix.length * blockSize) / 2;
    
    // 绘制下一个方块
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] !== 0) {
          this.nextCtx.fillStyle = COLORS[matrix[y][x]];
          this.nextCtx.fillRect(
            offsetX + x * blockSize,
            offsetY + y * blockSize,
            blockSize,
            blockSize
          );
          this.nextCtx.strokeStyle = '#ffffff';
          this.nextCtx.strokeRect(
            offsetX + x * blockSize,
            offsetY + y * blockSize,
            blockSize,
            blockSize
          );
        }
      }
    }
  }
  
  // 绘制单个方块
  private drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number, value: number): void {
    ctx.fillStyle = COLORS[value];
    ctx.fillRect(
      x * BLOCK_SIZE,
      y * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(
      x * BLOCK_SIZE,
      y * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
  }
  
  // 绘制网格线
  private drawGrid(): void {
    this.ctx.strokeStyle = '#333333';
    this.ctx.lineWidth = 0.5;
    
    // 垂直线
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * BLOCK_SIZE, 0);
      this.ctx.lineTo(x * BLOCK_SIZE, BOARD_HEIGHT * BLOCK_SIZE);
      this.ctx.stroke();
    }
    
    // 水平线
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y * BLOCK_SIZE);
      this.ctx.lineTo(BOARD_WIDTH * BLOCK_SIZE, y * BLOCK_SIZE);
      this.ctx.stroke();
    }
  }
  
  // 按键处理
  private handleKeyDown(e: KeyboardEvent): void {
    if (this.gameState !== GameState.PLAYING || !this.currentPiece) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowRight':
        this.moveRight();
        break;
      case 'ArrowDown':
        this.moveDown();
        // 软降加分
        this.addScore(POINTS.SOFT_DROP);
        break;
      case 'ArrowUp':
        this.rotate();
        break;
      case ' ': // 空格
        this.hardDrop();
        break;
    }
  }
  
  // 向左移动
  private moveLeft(): void {
    if (!this.currentPiece) return;
    
    if (this.currentPiece.canMove(this.board, -1, 0)) {
      this.currentPiece.move(-1, 0);
    }
  }
  
  // 向右移动
  private moveRight(): void {
    if (!this.currentPiece) return;
    
    if (this.currentPiece.canMove(this.board, 1, 0)) {
      this.currentPiece.move(1, 0);
    }
  }
  
  // 向下移动
  private moveDown(): boolean {
    if (!this.currentPiece) return false;
    
    if (this.currentPiece.canMove(this.board, 0, 1)) {
      this.currentPiece.move(0, 1);
      return true;
    } else {
      this.lockPiece();
      return false;
    }
  }
  
  // 旋转方块
  private rotate(): void {
    if (!this.currentPiece) return;
    
    if (this.currentPiece.canRotate(this.board)) {
      this.currentPiece.applyRotation();
    }
  }
  
  // 硬降（直接落到底部）
  private hardDrop(): void {
    if (!this.currentPiece) return;
    
    let dropDistance = 0;
    while (this.currentPiece.canMove(this.board, 0, 1)) {
      this.currentPiece.move(0, 1);
      dropDistance++;
    }
    
    // 硬降加分
    this.addScore(POINTS.HARD_DROP * dropDistance);
    
    this.lockPiece();
  }
  
  // 锁定方块并生成新方块
  private lockPiece(): void {
    if (!this.currentPiece) return;
    
    const { matrix, position } = this.currentPiece;
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] !== 0) {
          const boardY = position.y + y;
          if (boardY < 0) continue; // 超出顶部的部分不处理
          
          this.board[boardY][position.x + x] = matrix[y][x];
        }
      }
    }
    
    // 检查并消除完成的行
    this.clearLines();
    
    // 生成新方块
    this.createNewPiece();
  }
  
  // 清除已完成的行
  private clearLines(): void {
    let linesCleared = 0;
    
    for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
      if (this.board[y].every(value => value !== 0)) {
        // 将当前行以上的所有行下移
        for (let curY = y; curY > 0; curY--) {
          this.board[curY] = [...this.board[curY - 1]];
        }
        
        // 顶部行设为空
        this.board[0] = Array(BOARD_WIDTH).fill(0);
        
        // 增加已清除行计数
        linesCleared++;
        
        // 由于行已向下移动，我们需要重新检查当前行
        y++;
      }
    }
    
    // 根据清除的行数加分
    if (linesCleared > 0) {
      let points = 0;
      switch (linesCleared) {
        case 1:
          points = POINTS.SINGLE;
          break;
        case 2:
          points = POINTS.DOUBLE;
          break;
        case 3:
          points = POINTS.TRIPLE;
          break;
        case 4:
          points = POINTS.TETRIS;
          break;
      }
      
      // 加上等级倍数
      this.addScore(points * this.level);
      
      // 增加已消除行数并检查升级
      this.lines += linesCleared;
      this.checkLevelUp();
      
      // 更新UI
      this.updateScore();
    }
  }
  
  // 检查是否可以升级
  private checkLevelUp(): void {
    const newLevel = Math.floor(this.lines / LINES_PER_LEVEL) + 1;
    if (newLevel > this.level) {
      this.level = newLevel;
      // 加快下落速度
      this.dropInterval = Math.max(
        INITIAL_SPEED - (this.level - 1) * SPEED_DECREMENT,
        MIN_SPEED
      );
    }
  }
  
  // 增加分数
  private addScore(points: number): void {
    this.score += points;
    this.updateScore();
  }
  
  // 更新显示的分数
  private updateScore(): void {
    this.scoreElement.textContent = this.score.toString();
    this.levelElement.textContent = this.level.toString();
    this.linesElement.textContent = this.lines.toString();
  }
  
  // 设置事件监听器
  private setupEventListeners(): void {
    // 键盘控制
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    // 按钮控制
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    if (startBtn) {
      startBtn.addEventListener('click', () => this.start());
    }
    
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => this.pause());
    }
    
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetGame());
    }
  }
} 