import { MENU } from "./constants/menu";
import { ERROR_DATE_VALIDATE, ERROR_MENU_VALIDATE } from "./constants/messages";
import { MAX_RANGE_DATE, MIN_RANGE_DATE } from "./constants/standards";

class SelectDate {
  #date;

  constructor(inputDate) {
    this.#validate(inputDate);
    this.#date = inputDate;
  }

  #validate(inputDate) {
    this.#validateNumberRange(inputDate);
    this.#validateNumberType(inputDate);
  }

  #validateNumberRange(inputDate) {
    if (inputDate < MAX_RANGE_DATE || inputDate > MIN_RANGE_DATE) {
      throw new Error(ERROR_DATE_VALIDATE);
    }
  }

  #validateNumberType(inputDate) {
    if (isNaN(inputDate)) {
      throw new Error(ERROR_DATE_VALIDATE);
    }
  }

  getValidatedDate() {
    return this.#date;
  }
}

class SelectMenu {
  #menu;

  constructor(inputMenu) {
    this.#validate(inputMenu);
    this.#menu = this.#separateMenu(inputMenu);
  }

  #validate(inputMenu) {
    const separateMenu = this.#separateMenu(inputMenu);
    this.#validateDuplication(separateMenu);
    this.#validateMenuNumber(separateMenu);
    this.#validateMenuName(separateMenu);
  }

  #separateMenu(inputMenu) {
    const separateMenu = inputMenu.split(",").map((menu) => {
      return menu.split("-");
    });
    return separateMenu;
  }

  #getAllMenuNames() {
    const allMenuNames = [];
    Object.entries(MENU).map((menu) => {
      allMenuNames.push(...Object.keys(menu[1]));
    });
    return allMenuNames;
  }

  #validateMenuName(separateMenu) {
    const allMenuNames = this.#getAllMenuNames();
    separateMenu.map((menu) => {
      if (allMenuNames.includes(menu[0]) !== true) {
        throw new Error(ERROR_MENU_VALIDATE);
      }
    });
  }
  #validateMenuNumber(separateMenu) {
    separateMenu.map((menu) => {
      if (menu[1] < 1) {
        throw new Error(ERROR_MENU_VALIDATE);
      }
      if (isNaN(menu[1])) {
        throw new Error(ERROR_MENU_VALIDATE);
      }
    });
  }
  #validateDuplication(separateMenu) {
    const menuNames = separateMenu.map((menu) => {
      return menu[0];
    });

    const validatedMenuNames = new Set(menuNames);
    if (menuNames.length !== validatedMenuNames.size) {
      throw new Error(ERROR_MENU_VALIDATE);
    }
  }
  getValidatedMenu() {
    return this.#menu;
  }
}

export { SelectDate, SelectMenu };
