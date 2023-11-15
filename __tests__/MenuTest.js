import { SelectMenu } from "../src/Select";

describe("메뉴 예약 테스트", () => {
  test("메뉴판에 없는 메뉴를 입력한 경우에 대한 예외 처리", () => {
    expect(() => {
      new SelectMenu("해물로제파스타-3");
    }).toThrow("[ERROR]");
  });

  test.each(["해산물파스타-2,레드와인-a", "초코케이크-0,레드와인-1"])(
    "1 이상의 숫자가 아닌 값 입력에 대한 예외 처리",
    (input) => {
      expect(() => {
        new SelectMenu(input);
      }).toThrow("[ERROR]");
    }
  );

  test("같은 메뉴를 여러 번 입력한 경우에 대한 예외 처리", () => {
    expect(() => {
      new SelectMenu("해산물파스타-1,해산물파스타-3,레드와인-1");
    }).toThrow("[ERROR]");
  });

  test.each(["해산물파스타2,레드와인-a", "초코케이크-0 레드와인-1"])(
    "메뉴 형식이 예시와 다른 경우에 대한 예외 처리",
    (input) => {
      expect(() => {
        new SelectMenu(input);
      }).toThrow("[ERROR]");
    }
  );

  test("총 주문 개수가 20개를 초과한 경우에 대한 예외 처리", () => {
    expect(() => {
      new SelectMenu(
        "해산물파스타-10,레드와인-1,제로콜라-3,양송이수프-5,티본스테이크-4"
      );
    }).toThrow("[ERROR]");
  });

  test("음료만 주문한 경우에 대한 예외 처리", () => {
    expect(() => {
      new SelectMenu("제로콜라-4,레드와인-1");
    }).toThrow("[ERROR]");
  });

  test("입력한 메뉴와 개수가 배열 형태로 잘 분리되는지 확인", () => {
    const selectMenu = new SelectMenu("해산물파스타-3,레드와인-1");
    const comfirmedMenu = selectMenu.confirmedMenu();

    expect(comfirmedMenu).toEqual([
      ["해산물파스타", "3"],
      ["레드와인", "1"],
    ]);
  });
});
