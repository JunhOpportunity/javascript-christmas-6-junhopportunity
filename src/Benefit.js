import { SPECIAL_DISCOUNT } from "./constants/calendar";
import { MAX_RANGE_DATE } from "./constants/standards";
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

  // 크리스마스 디데이 할인
  #discountCristmasDday() {
    if (this.#date <= MAX_RANGE_DATE) {
      this.#cristmasDiscount = this.#cristmasDiscount + 1000 + 100 * (this.#date - 1);
    }
  }

  // depth 리팩토링
  #discountVisitWeekend() {
    const weekendMenu = Object.keys(MENU.MAIN);
    if (WEEKEND_DISCOUNT.includes(this.#date)) {
      this.#menus.map((menu) => {
        if (weekendMenu.includes(menu[0])) {
          this.#weekdayDiscount = this.#weekdayDiscount + 2023 * menu[1];
        }
      });
    }
  }

  // depth 리팩토링
  #discountVisitWeekday() {
    const weekdayMenu = Object.keys(MENU.DESSERT);
    if (!WEEKEND_DISCOUNT.includes(this.#date)) {
      this.#menus.map((menu) => {
        if (weekdayMenu.includes(menu[0])) {
          this.#weekendDiscount = this.#weekendDiscount + 2023 * menu[1];
        }
      });
    }
  }

  #discountSpecialDay() {
    if (SPECIAL_DISCOUNT.includes(this.#date)) {
      this.#specialDiscount = this.#specialDiscount + 1000;
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
      this.#bedge = "없음";
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

  // 이름 변경
  get() {
    this.#discountCristmasDday();
    this.#discountVisitWeekday();
    this.#discountVisitWeekend();
    this.#discountSpecialDay();
    this.#calculateTotalPayment();
    const totalDiscount = this.#calculateTotalDiscount();
    let totalBenefit = totalDiscount;
    if (this.#beforePayment > 120000) {
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
