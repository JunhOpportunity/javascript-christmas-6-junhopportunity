import Benefit from "./Benefit";
import InputView from "./InputView";
import OutputView from "./OutputView";

class App {
  async run() {
    const date = await InputView.readDate();
    const menus = await InputView.readMenu();

    const benefit = new Benefit(date, menus);
    const benefitRecipt = benefit.get();

    OutputView.printMenu(menus);
    OutputView.printTotalPaymentBeforeDiscount(benefitRecipt.beforePayment);
    OutputView.printGiftMenu(benefitRecipt.beforePayment);
    OutputView.printBenefitDetails(
      benefitRecipt.beforePayment,
      benefitRecipt.benefitDetails
    );
    OutputView.printTotalBenefit(
      benefitRecipt.beforePayment,
      benefitRecipt.totalBenefit
    );
    OutputView.printExpectedPayment(benefitRecipt.afterPayment);
    OutputView.printEventBedge(benefitRecipt.bedge);
  }
}

export default App;
