/* eslint-disable */
const Lotto = require('./Lotto.js');
const { Console, Random } = require('@woowacourse/mission-utils');

const isDividedBy1000 = (amount) => {
  if (amount % 1000 !== 0) throw new Error('[ERROR] 구입 금액은 1000단위로 입력해주세요.');

  return amount / 1000;
};

const isNotNumeric = (amount) => {
  if (Number.isNaN(Number(amount))) throw new Error('[ERROR] 숫자를 입력해주세요.');
};

const isValidateAmount = (amount) => {
  isNotNumeric(amount);
  return isDividedBy1000(amount);
};
class App {
  lottoNumberArray;
  lottoCreateCount;
  winningNumberSet;
  bonusNumber;
  resultMap;
  constructor() {
    // const lotto = new Lotto();
    this.lottoNumberArray = [];
    this.resultMap = {
      '3개': 0,
      '4개': 0,
      '5개': 0,
      '5개+보너스': 0,
      '6개': 0,
    };
  }
  play() {
    Console.readLine('구입금액을 입력해 주세요.\n', (amount) => {
      this.lottoCreateCount = isValidateAmount(amount);
      for (let i = 0; i < this.lottoCreateCount; i += 1) {
        const lottoNumber = Random.pickUniqueNumbersInRange(1, 45, 6);
        const lotto = new Lotto(lottoNumber);
        this.lottoNumberArray.push(lotto);
      }
      Console.print(`${this.lottoCreateCount}개를 구매했습니다.`);
      this.lottoNumberArray.forEach((el) => el.printLottoNumber());
      this.test();
    });
  }

  test() {
    Console.readLine('당첨 번호를 입력해 주세요.\n', (winningNumber) => {
      this.winningNumberSet = new Set(winningNumber.split(',').map(Number));
      this.getBonusNumber();
    });
  }

  getBonusNumber() {
    Console.readLine('보너스 번호를 입력해 주세요.\n', (bonusNumber) => {
      this.bonusNumber = Number(bonusNumber);
      this.lottoNumberArray.forEach((el) => {
        let count = 0;
        let bonusCount = 0;
        let test = el.getLottoNumber();
        test.forEach((element) => {
          if (this.winningNumberSet.has(element)) count += 1;
          if (element === this.bonusNumber) bonusCount += 1;
        });
        if (count === 3) {
          this.resultMap['3개'] = this.resultMap['3개'] + 1;
        }
        if (count === 4) {
          this.resultMap['4개'] = this.resultMap['4개'] + 1;
        }
        if (count === 5 && bonusCount === 0) {
          this.resultMap['5개'] = this.resultMap['5개'] + 1;
        }
        if (count === 5 && bonusCount === 1) {
          this.resultMap['5개+보너스'] = this.resultMap['5개+보너스'] + 1;
        }
        if (count === 6) {
          this.resultMap['6개'] = this.resultMap['6개'] + 1;
        }
      });
      let total =
        5_000 * this.resultMap['3개'] +
        50_000 * this.resultMap['4개'] +
        1_500_000 * this.resultMap['5개'] +
        30_000_000 * this.resultMap['5개+보너스'] +
        2_000_000_000 * this.resultMap['6개'];
      Console.print(`당첨 통계`);
      Console.print(`---`);
      Console.print(`3개 일치 (5,000원) - ${this.resultMap['3개']}개`);
      Console.print(`4개 일치 (50,000원) - ${this.resultMap['4개']}개`);
      Console.print(`5개 일치 (1,500,000원) - ${this.resultMap['5개']}개`);
      Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${this.resultMap['5개+보너스']}개`);
      Console.print(`6개 일치 (2,000,000,000원) - ${this.resultMap['6개']}개`);
      Console.print(`총 수익률은 ${((total / (this.lottoCreateCount * 1000)) * 100).toFixed(1)}%입니다.`);
    });
  }
}

const app = new App();
app.play();

module.exports = App;
