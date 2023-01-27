import Counter from "./counter";
import type GameZone from "./gameZone";
import { $, cel, getRoot } from "./utils/common";
import { initScore } from "./utils/constant";

class Resetting {
  constructor(zoneInstance: GameZone) {
    this.init(zoneInstance);
  }
  private init(zoneInstance: GameZone) {
    this.createResetting();
    this.bindEvent(zoneInstance);
  }
  private createResetting() {
    const reset = cel('div');
    reset.className = 'reset';
    reset.innerHTML = '<button id="resetButton">重置</button>'
    getRoot()?.appendChild(reset);
  }
  private bindEvent(zoneInstance: GameZone) {
    $('#resetButton')?.addEventListener('click', () => {
      Counter.settingScore(initScore);
      zoneInstance.clear();
    });
  } 
}

export default Resetting;