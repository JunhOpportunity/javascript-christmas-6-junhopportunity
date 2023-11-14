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
  printBenefitDetails(beforePayment, benefitDetails) {
    Console.print("<혜택 내역>");
    if (beforePayment < 10000) {
      Console.print("없음");
    } else {
      Console.print(`
크리스마스 디데이 할인: ${
        benefitDetails.cristmasDiscount == 0
          ? "없음"
          : (-benefitDetails.cristmasDiscount).toLocaleString() + "원"
      }
${
  benefitDetails.weekdayDiscount == 0
    ? "주말 할인: " + (-benefitDetails.weekendDiscount).toLocaleString() + "원"
    : "평일 할인: " + (-benefitDetails.weekdayDiscount).toLocaleString() + "원"
}
특별 할인: ${
        benefitDetails.specialDiscount == 0
          ? "없음"
          : (-benefitDetails.specialDiscount).toLocaleString() + "원"
      }
증정 이벤트: ${beforePayment < 120000 ? "없음" : (-MENU.DRINK.샴페인).toLocaleString() + "원"}
      `);
    }
  },
  printTotalBenefit(beforePayment, totalBenefit) {
    Console.print("<총혜택 금액>");
    Console.print(
      `${
        totalBenefit == 0 || beforePayment < 10000 ? "0원" : (-totalBenefit).toLocaleString() + "원"
      }`
    );
  },
};

export default OutputView;
