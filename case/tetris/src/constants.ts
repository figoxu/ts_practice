// 游戏常量
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const BLOCK_SIZE = 30;
export const COLORS = [
  '#000000', // 空白
  '#FF0000', // 红色 - I
  '#00FF00', // 绿色 - J
  '#0000FF', // 蓝色 - L
  '#FFFF00', // 黄色 - O
  '#FF00FF', // 紫色 - S
  '#00FFFF', // 青色 - T
  '#FFA500'  // 橙色 - Z
];

// 初始等级
export const INITIAL_LEVEL = 1;
// 初始下落速度（毫秒）
export const INITIAL_SPEED = 1000;
// 每上升一个等级减少的毫秒数
export const SPEED_DECREMENT = 100;
// 最小下落速度
export const MIN_SPEED = 100;
// 消除行数升级点
export const LINES_PER_LEVEL = 10;

// 方块类型
export enum TetrominoType {
  I = 1,
  J = 2,
  L = 3,
  O = 4,
  S = 5,
  T = 6,
  Z = 7
}

// 方块形状定义
export const TETROMINOS = {
  [TetrominoType.I]: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [TetrominoType.J]: [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0]
  ],
  [TetrominoType.L]: [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]
  ],
  [TetrominoType.O]: [
    [4, 4],
    [4, 4]
  ],
  [TetrominoType.S]: [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]
  ],
  [TetrominoType.T]: [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0]
  ],
  [TetrominoType.Z]: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]
  ]
};

// 游戏状态
export enum GameState {
  IDLE,
  PLAYING,
  PAUSED,
  GAME_OVER
}

// 分数规则
export const POINTS = {
  SINGLE: 100,   // 消除1行
  DOUBLE: 300,   // 消除2行
  TRIPLE: 500,   // 消除3行
  TETRIS: 800,   // 消除4行
  SOFT_DROP: 1,  // 软降（按下键）每格1分
  HARD_DROP: 2   // 硬降（按空格）每格2分
}; 