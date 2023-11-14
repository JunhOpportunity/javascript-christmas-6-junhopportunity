import { SPECIAL_DISCOUNT } from "./constants/calendar";
import {
  INDEX_MENU_NAME,
  INDEX_MENU_PRICE,
  MAX_RANGE_DATE,
  MIN_GIFT_MENU_APPLIED_PRICE,
} from "./constants/standards";
import { MENU } from "./constants/menu";
import { WEEKEND_DISCOUNT } from "./constants/calendar";
import {
  MIN_SANTA_BENEFIT,
  MIN_STAR_BENEFIT,
  MIN_TREE_BENEFIT,
  SANTA_BEDGE,
  STAR_BEDGE,
  TREE_BEDGE,
} from "./constants/bedge";
import {
  CRISTMAS_ADDITIONAL_DISCOUNT,
  CRISTMAS_BASIC_DISCOUNT,
  DAY_OF_WEEK_DISCOUNT,
  SPECIAL_DISCOUNT_PRICE,
} from "./constants/dicount";
import { CONDITION_NOT_MET } from "./constants/messages";

class Benefit {
  #beforePayment = 0;
  #cristmasDiscount = 0;
  #weekdayDiscount = 0;
  #weekendDiscount = 0;
  #specialDiscount = 0;
  #bedge;
  #date;
  #menus;

  constructor(date, menus) {
    this.#date = +date;
    this.#menus = menus;
  }

  #discountCristmasDday() {
    if (this.#date <= MAX_RANGE_DATE) {
      this.#cristmasDiscount =
        this.#cristmasDiscount +
        CRISTMAS_BASIC_DISCOUNT +
        CRISTMAS_ADDITIONAL_DISCOUNT * (this.#date - 1);
    }
  }

  #calculateDiscountPriceOfDay(menus, discountMenu) {
    let discountPrice = 0;

    menus.forEach((menu) => {
      if (discountMenu.includes(menu[INDEX_MENU_NAME])) {
        discountPrice += DAY_OF_WEEK_DISCOUNT * menu[INDEX_MENU_PRICE];
      }
    });

    return discountPrice;
  }

  #discountVisitWeekend() {
    const weekendMenu = Object.keys(MENU.MAIN);
    if (WEEKEND_DISCOUNT.includes(this.#date)) {
      this.#weekdayDiscount += this.#calculateDiscountPriceOfDay(
        this.#menus,
        weekendMenu
      );
    }
  }

  #discountVisitWeekday() {
    const weekdayMenu = Object.keys(MENU.DESSERT);
    if (!WEEKEND_DISCOUNT.includes(this.#date)) {
      this.#weekendDiscount += this.#calculateDiscountPriceOfDay(
        this.#menus,
        weekdayMenu
      );
    }
  }

  #discountSpecialDay() {
    if (SPECIAL_DISCOUNT.includes(this.#date)) {
      this.#specialDiscount += SPECIAL_DISCOUNT_PRICE;
    }
  }

  #calculateTotalPayment() {
    const menuAndPrice = Object.entries(MENU)
      .map((menu) => Object.entries(menu[1]))
      .flat(2);

    this.#menus.forEach((menu) => {
      const menuIndex = menuAndPrice.indexOf(menu[0]);
      this.#beforePayment += menuAndPrice[menuIndex + 1] * menu[1];
    });
  }

  #calculateTotalDiscount() {
    let totalDiscount =
      this.#cristmasDiscount +
      this.#weekdayDiscount +
      this.#weekendDiscount +
      this.#specialDiscount;

    return totalDiscount;
  }

  #giveBedge(totalBenefit) {
    if (totalBenefit < MIN_STAR_BENEFIT) {
      this.#bedge = CONDITION_NOT_MET;
    }
    if (totalBenefit >= MIN_STAR_BENEFIT && totalBenefit < MIN_TREE_BENEFIT) {
      this.#bedge = STAR_BEDGE;
    }
    if (totalBenefit >= MIN_TREE_BENEFIT && totalBenefit < MIN_SANTA_BENEFIT) {
      this.#bedge = TREE_BEDGE;
    }
    if (totalBenefit >= MIN_SANTA_BENEFIT) {
      this.#bedge = SANTA_BEDGE;
    }
  }

  benefitRecipt() {
    this.#discountCristmasDday();
    this.#discountVisitWeekday();
    this.#discountVisitWeekend();
    this.#discountSpecialDay();
    this.#calculateTotalPayment();
    const totalDiscount = this.#calculateTotalDiscount();
    let totalBenefit = totalDiscount;
    if (this.#beforePayment > MIN_GIFT_MENU_APPLIED_PRICE) {
      totalBenefit += MENU.DRINK.샴페인;
    }
    this.#giveBedge(totalBenefit);

    return {
      totalBenefit: totalBenefit,
      totalDiscount: totalDiscount,
      beforePayment: this.#beforePayment,
      afterPayment: this.#beforePayment - totalDiscount,
      bedge: this.#bedge,
      benefitDetails: {
        cristmasDiscount: this.#cristmasDiscount,
        weekdayDiscount: this.#weekdayDiscount,
        weekendDiscount: this.#weekendDiscount,
        specialDiscount: this.#specialDiscount,
      },
    };
  }
}

export default Benefit;
