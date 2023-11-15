import { SelectDate, SelectMenu } from "./Select";
import { Console } from "@woowacourse/mission-utils";
import { READ_DATE_MESSAGE, READ_MENU_MESSAGE } from "./constants/messages";

const InputView = {
  async readDate() {
    let date = null;
    while (!date) {
      try {
        const input = await Console.readLineAsync(READ_DATE_MESSAGE);
        date = new SelectDate(input);
      } catch (error) {
        Console.print(error.message);
      }
    }
    return date.confirmedDate();
  },

  async readMenu() {
    let menu = null;
    while (!menu) {
      try {
        const input = await Console.readLineAsync(READ_MENU_MESSAGE);
        menu = new SelectMenu(input);
      } catch (error) {
        Console.print(error.message);
      }
    }
    return menu.confirmedMenu();
  },
};

export default InputView;
