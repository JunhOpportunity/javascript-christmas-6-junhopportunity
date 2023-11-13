import { ERROR_DATE_VALIDATE } from "./constants/messages";
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

export { SelectDate };
