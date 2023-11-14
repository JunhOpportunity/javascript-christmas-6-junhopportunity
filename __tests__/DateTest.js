import { SelectDate } from "../src/Select";

describe("날짜 예약 테스트", () => {
  test("예약 날짜가 1 ~ 31 사이가 아닌 예외에 대한 처리", () => {
    expect(() => {
      new SelectDate(32);
    }).toThrow("[ERROR]");
  });

  test.each([[32], [-5], ["1a"]])(
    "예약 날짜가 1 ~ 31 사이가 아닌 예외에 대한 처리",
    (input) => {
      expect(() => {
        new SelectDate(input);
      }).toThrow("[ERROR]");
    }
  );
});
