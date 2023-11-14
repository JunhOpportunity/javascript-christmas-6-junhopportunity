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
};

export default OutputView;
