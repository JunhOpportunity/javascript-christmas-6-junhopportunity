import { MENU } from "./constants/menu";
import {
  ERROR_DATE_VALIDATE,
  ERROR_MENU_VALIDATE,
  ERROR_ORDER_ONLY_DRINK,
} from "./constants/messages";
import {
  FIRST_SEPARATE_TOKEN,
  INDEX_MENU_NAME,
  INDEX_MENU_PRICE,
  MAX_ORDER_NUMBER,
  MAX_RANGE_DATE,
  MIN_ORDER_NUMBER,
  MIN_RANGE_DATE,
  SECOND_SPPARATE_TOKEN,
} from "./constants/standards";

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
    if (inputDate > MAX_RANGE_DATE || inputDate < MIN_RANGE_DATE) {
      throw new Error(ERROR_DATE_VALIDATE);
    }
  }

  #validateNumberType(inputDate) {
    if (isNaN(inputDate)) {
      throw new Error(ERROR_DATE_VALIDATE);
    }
  }

  confirmedDate() {
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
    this.#validateOnlyDrink(separateMenu);
  }

  #separateMenu(inputMenu) {
    const separateMenu = inputMenu.split(FIRST_SEPARATE_TOKEN).map((menu) => {
      return menu.split(SECOND_SPPARATE_TOKEN);
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

  #getMenuNames(menu) {
    return Object.keys(menu);
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
    const sumMenuTotalNumber = separateMenu.reduce((acc, cur) => {
      if (cur[INDEX_MENU_PRICE] < MIN_ORDER_NUMBER) {
        throw new Error(ERROR_MENU_VALIDATE);
      }
      if (isNaN(cur[INDEX_MENU_PRICE])) {
        throw new Error(ERROR_MENU_VALIDATE);
      }
      return acc + +cur[INDEX_MENU_PRICE];
    }, 0);
    if (sumMenuTotalNumber > MAX_ORDER_NUMBER) {
      throw new Error(ERROR_MENU_VALIDATE);
    }
  }
  #validateDuplication(separateMenu) {
    const menuNames = separateMenu.map((menu) => {
      return menu[INDEX_MENU_NAME];
    });

    const validatedMenuNames = new Set(menuNames);
    if (menuNames.length !== validatedMenuNames.size) {
      throw new Error(ERROR_MENU_VALIDATE);
    }
  }
  #validateOnlyDrink(separateMenu) {
    const menuNames = separateMenu.map((menu) => {
      return menu[INDEX_MENU_NAME];
    });
    const drikNames = this.#getMenuNames(MENU.DRINK);

    const result = menuNames.filter((name) => !drikNames.includes(name));
    if (result.length == 0) {
      throw new Error(ERROR_ORDER_ONLY_DRINK);
    }
  }

  confirmedMenu() {
    return this.#menu;
  }
}

export { SelectDate, SelectMenu };
