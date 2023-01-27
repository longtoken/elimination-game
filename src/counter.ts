import { cel, getRoot, getScore } from "./utils/common";
import { initScore } from "./utils/constant";

class Counter {
  static score: number = 0;
  constructor() {
    this.init()
  }
  private init() {
    this.createCounter();
  }
  private createCounter() {
    const counter = cel('div');
    counter.className = 'counter';
    counter.innerHTML = `得分：<span id="score">${initScore}</span>`
    getRoot()?.appendChild(counter);
  }
  static settingScore(value: number) {
    this.setScore(value);
    this.setScoreToView(value);
  }
  static setScore(value: number) {
    this.score = value;
  }
  static setScoreToView(value: number) {
    const score = getScore();
    if (score) {
      score.innerHTML = `${value}`;
    }
  }
  static getScore() {
    return this.score
  }
}

export default Counter;