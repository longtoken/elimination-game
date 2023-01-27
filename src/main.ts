import Counter from './counter';
import GameZone from './gameZone';
import Reset from './resetting';
import './style.css'

class EliminationGame {
  constructor() {    
    this.init();
  }
  init() {
    // 创建棋盘
    const mainland = new GameZone();
    // 创建分数显示区域
    new Counter();
    // 创建重置按钮
    new Reset(mainland);
  }
}

new EliminationGame();

