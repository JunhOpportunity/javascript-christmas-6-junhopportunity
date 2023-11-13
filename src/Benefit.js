import { SPECIAL_DISCOUNT } from "./constants/calendar";
import { MAX_RANGE_DATE } from "./constants/standards";
import { MENU } from "./constants/menu";
import { WEEKEND_DISCOUNT } from "./constants/calendar";

class Benefit {
  #totalBenefit;
  #totalDiscount;
  #beforePayment;
  #afterPayment;
  #date;
  #menus;

  constructor(date, menus) {
    this.#date = +date;
    this.#menus = menus;
  }

  #discountVisitDate() {
    if (this.#date <= MAX_RANGE_DATE) {
      this.#totalDiscount = this.#totalDiscount - 1000 - 100 * (n - 1);
    }
  }

  // depth 리팩토링
  #discountVisitWeekend() {
    const weekendMenu = Object.keys(MENU.MAIN);
    if (WEEKEND_DISCOUNT.includes(this.#date)) {
      this.#menus.map((menu) => {
        if (weekendMenu.includes(menu[0])) {
          this.#totalDiscount = this.#totalDiscount - 2023 * menu[1];
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
          this.#totalDiscount = this.#totalDiscount - 2023 * menu[1];
          this.#totalBenefit = this.#totalBenefit - 2023 * menu[1];
        }
      });
    }
  }

  #discountSpecialDay() {
    if (SPECIAL_DISCOUNT.includes(this.#date)) {
      this.#totalDiscount = this.#totalDiscount - 1000;
      this.#totalBenefit = this.#totalBenefit - 1000;
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

  #calculateExpectedPayment() {
    this.#afterPayment = this.#beforePayment + this.#totalDiscount;
  }

  #giftEvent() {
    if (this.#beforePayment >= 120000) {
      this.#totalBenefit = this.#totalBenefit - MENU.DRINK.샴페인;
    }
  }

  // 이름 변경
  get() {
    this.#discountVisitDate();
    this.#discountVisitWeekday();
    this.#discountVisitWeekend();
    this.#discountSpecialDay();
    this.#calculateTotalPayment();
    this.#calculateExpectedPayment();
    this.#giftEvent();
  }
}
