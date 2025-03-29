import { TetrisGame } from './game';

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 创建并初始化游戏
  const game = new TetrisGame();
  
  console.log('俄罗斯方块游戏已初始化');
}); 