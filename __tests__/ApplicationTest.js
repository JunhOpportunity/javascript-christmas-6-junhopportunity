import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe("기능 테스트", () => {
  test("모든 타이틀 출력", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["3", "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "<주문 메뉴>",
      "<할인 전 총주문 금액>",
      "<증정 메뉴>",
      "<혜택 내역>",
      "<총혜택 금액>",
      "<할인 후 예상 결제 금액>",
      "<12월 이벤트 배지>",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("혜택 내역 타이틀과 없음 출력", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["26", "타파스-1,제로콜라-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["<혜택 내역>" + LINE_SEPARATOR + "없음"];

    expectLogContains(getOutput(logSpy), expected);
  });
});

describe("예외 테스트", () => {
  test("날짜 예외 테스트", async () => {
    // given
    const INVALID_DATE_MESSAGE =
      "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.";
    const INPUTS_TO_END = ["1", "해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(["a", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_DATE_MESSAGE)
    );
  });

  test("주문 예외 테스트", async () => {
    // given
    const INVALID_ORDER_MESSAGE =
      "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";
    const INPUTS_TO_END = ["해산물파스타-2"];
    const logSpy = getLogSpy();
    mockQuestions(["3", "제로콜라-a", ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_ORDER_MESSAGE)
    );
  });

  test("날짜와 메뉴 재입력 테스트", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions([
      "-4",
      "3",
      "해산물파스타-0,제로콜라-2",
      "티본스테이크-1,레드와인-1",
    ]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!",
      "티본스테이크 1개",
      "레드와인 1개",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("주문 메뉴 테스트", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["5", "크리스마스파스타-2,초코케이크-3,레드와인-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["크리스마스파스타 2개", "초코케이크 3개", "레드와인 1개"];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("혜택 내역 테스트", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["25", "해산물파스타-2,초코케이크-3,레드와인-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      "크리스마스 디데이 할인: -3,400원",
      "평일 할인: -6,069원",
      "특별 할인: -1,000원",
      "증정 이벤트: -25,000원",
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  test("배지 테스트", async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(["4", "해산물파스타-1,바비큐립-1,초코케이크-2,레드와인-1"]);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ["산타"];

    expectLogContains(getOutput(logSpy), expected);
  });
});
