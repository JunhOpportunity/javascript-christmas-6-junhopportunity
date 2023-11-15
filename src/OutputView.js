import { MENU } from "./constants/menu";
import { Console } from "@woowacourse/mission-utils";
import {
  BENEFIT_DETAILS,
  CRISTMAS_D_DAY_DISCOUNT,
  EVENT_BEDGE,
  EXPECTED_PAYMENT,
  GIFT_EVENT,
  GIFT_EVENT_PRODUCT,
  GIFT_MENU,
  ORDER_MENU_MESSAGE,
  PREVIEW_EVENT_MESSAGE,
  PREVIEW_EVENT_MONTH,
  SPECIAL_DISCOUNT,
  TOTAL_BENEFIT_PRICE,
  TOTAL_PAYMENT_BEFORE_DISCOUNT,
  WEEKDAY_DISCOUNT,
  WEEKEND_DISCOUNT,
} from "./constants/preview";
import {
  MIN_APPLICABLE_PRICE,
  MIN_GIFT_MENU_APPLIED_PRICE,
} from "./constants/standards";
import { CONDITION_NOT_MET, PRICE_UNIT } from "./constants/messages";

const OutputView = {
  printPreviewDate(date) {
    Console.print(`${PREVIEW_EVENT_MONTH} ${date}${PREVIEW_EVENT_MESSAGE}`);
  },
  printMenu(menus) {
    Console.print(ORDER_MENU_MESSAGE);
    menus.map((menu) => {
      Console.print(`${menu[0]} ${menu[1]}개`);
    });
  },
  printTotalPaymentBeforeDiscount(beforePayment) {
    Console.print(TOTAL_PAYMENT_BEFORE_DISCOUNT);
    Console.print(beforePayment.toLocaleString() + PRICE_UNIT);
  },
  printGiftMenu(beforePayment) {
    Console.print(GIFT_MENU);
    beforePayment > MIN_GIFT_MENU_APPLIED_PRICE
      ? Console.print(GIFT_EVENT_PRODUCT)
      : Console.print(CONDITION_NOT_MET);
  },
  printBenefitDetails(beforePayment, benefitDetails) {
    Console.print(BENEFIT_DETAILS);
    if (beforePayment < MIN_APPLICABLE_PRICE) {
      Console.print(CONDITION_NOT_MET);
    } else {
      Console.print(`
${CRISTMAS_D_DAY_DISCOUNT}: ${
        benefitDetails.cristmasDiscount == 0
          ? CONDITION_NOT_MET
          : (-benefitDetails.cristmasDiscount).toLocaleString() + PRICE_UNIT
      }
${
  benefitDetails.weekdayDiscount == 0
    ? WEEKEND_DISCOUNT +
      (-benefitDetails.weekendDiscount).toLocaleString() +
      PRICE_UNIT
    : WEEKDAY_DISCOUNT +
      (-benefitDetails.weekdayDiscount).toLocaleString() +
      PRICE_UNIT
}
${SPECIAL_DISCOUNT}${
        benefitDetails.specialDiscount == 0
          ? CONDITION_NOT_MET
          : (-benefitDetails.specialDiscount).toLocaleString() + PRICE_UNIT
      }
${GIFT_EVENT}${
        beforePayment < MIN_GIFT_MENU_APPLIED_PRICE
          ? CONDITION_NOT_MET
          : (-MENU.DRINK.샴페인).toLocaleString() + PRICE_UNIT
      }
      `);
    }
  },
  printTotalBenefit(beforePayment, totalBenefit) {
    Console.print(TOTAL_BENEFIT_PRICE);
    Console.print(
      `${
        beforePayment < MIN_APPLICABLE_PRICE
          ? 0 + PRICE_UNIT
          : (-totalBenefit).toLocaleString() + PRICE_UNIT
      }`
    );
  },
  printExpectedPayment(afterPayment) {
    Console.print(EXPECTED_PAYMENT);
    Console.print(afterPayment.toLocaleString() + PRICE_UNIT);
  },
  printEventBedge(bedge) {
    Console.print(EVENT_BEDGE);
    Console.print(bedge);
  },
};

export default OutputView;
