class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
  }

  validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
  }

  printLottoNumber() {
    // 클래스 안에서 일반함수 화살표 함수 this 차이 꼭 짚고 넘어가지.
    console.log(`[${this.#numbers.join(', ')}]`);
  }

  getLottoNumber() {
    return this.#numbers;
  }

  // TODO: 추가 기능 구현
}

module.exports = Lotto;
