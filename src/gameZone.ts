import Counter from "./counter";
import { cel, getRoot, memoElement, shuffle } from "./utils/common";

class GameZone {
  private col = 4;
  private row = 3;
  private totalScore = 0;
  private range: string[] = [];
  private clicked: boolean = false;
  private collection: string[] = [];
  private limit = 2;
  constructor() {
    this.init();
  }
  private init() {
    this.initRange();
    this.createZone();
    this.renderZone();
    this.bindEvent();
  }
  private bindEvent() {
    const gameZoneElement = memoElement('.gameZone');
    if (gameZoneElement) {
      gameZoneElement.addEventListener('click', (e) => {
        const target = (e.target as Element & { dataset: { index?: string } });
        if (target && target.dataset?.index && !this.clicked) {
          const selected = target.querySelector('.text');
          if (selected && !selected.classList.contains('done')) {
            selected.classList.add('current');
            this.collection.push(target.dataset.index);
            if (this.collection.length === this.limit) {
              if (new Set(this.collection).size === this.limit) {
                // 两个数字不一样
                this.clicked = true;
                setTimeout(() => {
                  gameZoneElement.querySelectorAll('.text').forEach((item) => {
                    if (!item.classList.contains('done')) {
                      item.classList.remove('current', 'done');
                    }
                  });
                  this.clearCollection();
                  this.clicked = false;
                }, 1000);
              } else {
                // 一样
                gameZoneElement.querySelectorAll('.current').forEach(current => {
                  current.classList.add('done');
                });
                this.clearCollection();
                this.toCalculateScore();
              }
            }
          }
        }
      })
    }
  }
  private toCalculateScore() {
    const currentScore = Counter.getScore();
    Counter.settingScore(currentScore + 1);
    if (currentScore + 1 === this.totalScore) {
      setTimeout(() => alert('您获胜了'), 300)
    }
  }
  private initRange() {
    const total = this.col * this.row;
    this.totalScore = total / 2;
    this.range = Array.from({ length: total / 2 }, (v, k) => `${k + 1}`);
    this.range = this.range.concat([...this.range]).sort();
  }
  private createZone() {
    const gameZone = cel('div');
    gameZone.className = 'gameZone';
    getRoot()?.appendChild(gameZone);
  }
  public clear() {
    this.renderZone();
    this.clearCollection();
  }
  private clearCollection() {
    this.collection.length = 0;
  }
  private renderZone() {
    const gameZoneElement = memoElement('.gameZone');
    if (gameZoneElement) {
      gameZoneElement.innerHTML = this.getZoneDom();
    }
  }
  private getZoneDom() {
    const range = shuffle([...this.range]);

    let result = '';
    for (let i = 0; i < range.length; i++) {
      const current = range[i];
      result += `<div class="item" data-index="${current}"><span class="text">${current}</span></div>`;
      range.splice(i, 1);
      i--;
    }
    return result;
  }
}

export default GameZone;
export type { GameZone };