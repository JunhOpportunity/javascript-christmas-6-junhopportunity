import { MENU } from "./constants/menu";
import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printMenu(menus) {
    Console.print("<주문 메뉴>");
    menus.map((menu) => {
      Console.print(`${menu[0]} ${menu[1]}개`);
    });
  },
};

export default OutputView;
