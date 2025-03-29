import { TETROMINOS, TetrominoType, BOARD_WIDTH, BOARD_HEIGHT } from './constants';

export interface Position {
  x: number;
  y: number;
}

export class Tetromino {
  type: TetrominoType;
  matrix: number[][];
  position: Position;
  
  constructor(type: TetrominoType) {
    this.type = type;
    this.matrix = this.copyMatrix(TETROMINOS[type]);
    
    // 设置初始位置（居中在顶部）
    const width = this.matrix[0].length;
    this.position = {
      x: Math.floor((BOARD_WIDTH - width) / 2),
      y: 0
    };
  }
  
  // 复制矩阵以避免引用问题
  private copyMatrix(matrix: number[][]): number[][] {
    return matrix.map(row => [...row]);
  }
  
  // 获取旋转后的矩阵
  rotate(): number[][] {
    const size = this.matrix.length;
    const rotated: number[][] = Array(size).fill(0).map(() => Array(size).fill(0));
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        rotated[i][j] = this.matrix[size - j - 1][i];
      }
    }
    
    return rotated;
  }
  
  // 应用旋转
  applyRotation(): void {
    this.matrix = this.rotate();
  }
  
  // 检查是否可以移动到指定位置
  canMove(board: number[][], offsetX: number, offsetY: number): boolean {
    const newX = this.position.x + offsetX;
    const newY = this.position.y + offsetY;
    
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        if (this.matrix[y][x] !== 0) {
          const boardX = newX + x;
          const boardY = newY + y;
          
          // 检查边界
          if (
            boardX < 0 || 
            boardX >= BOARD_WIDTH || 
            boardY >= BOARD_HEIGHT
          ) {
            return false;
          }
          
          // 检查与已有方块的碰撞（只有当方块在棋盘上时）
          if (boardY >= 0 && board[boardY][boardX] !== 0) {
            return false;
          }
        }
      }
    }
    
    return true;
  }
  
  // 检查是否可以旋转
  canRotate(board: number[][]): boolean {
    const rotated = this.rotate();
    
    for (let y = 0; y < rotated.length; y++) {
      for (let x = 0; x < rotated[y].length; x++) {
        if (rotated[y][x] !== 0) {
          const boardX = this.position.x + x;
          const boardY = this.position.y + y;
          
          // 检查边界
          if (
            boardX < 0 || 
            boardX >= BOARD_WIDTH || 
            boardY >= BOARD_HEIGHT
          ) {
            return false;
          }
          
          // 检查与已有方块的碰撞（只有当方块在棋盘上时）
          if (boardY >= 0 && board[boardY][boardX] !== 0) {
            return false;
          }
        }
      }
    }
    
    return true;
  }
  
  // 移动方块
  move(offsetX: number, offsetY: number): void {
    this.position.x += offsetX;
    this.position.y += offsetY;
  }
  
  // 创建克隆
  clone(): Tetromino {
    const clone = new Tetromino(this.type);
    clone.matrix = this.copyMatrix(this.matrix);
    clone.position = { ...this.position };
    return clone;
  }
} 