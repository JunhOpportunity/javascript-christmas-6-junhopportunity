import { MENU } from "./constants/menu";
import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printMenu(menus) {
    Console.print("<주문 메뉴>");
    menus.map((menu) => {
      Console.print(`${menu[0]} ${menu[1]}개`);
    });
  },
  printTotalPaymentBeforeDiscount(beforePayment) {
    Console.print("<할인 전 총주문 금액>");
    Console.print(beforePayment.toLocaleString() + "원");
  },
  printGiftMenu(beforePayment) {
    Console.print("<증정 메뉴>");
    beforePayment > 120000
      ? Console.print("샴페인 1개")
      : Console.print("없음");
  },
};

export default OutputView;
