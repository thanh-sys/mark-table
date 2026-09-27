import { MESSAGES } from "../shared/messages.js";
import { isDateNotInFuture, isInputNotBetween1to10, isInputNotEmpty } from "../shared/validation.js";

export class MarkTableRow {
  constructor({ checkbox, firstName, lastName, dateOfBirth, mark, coe }) {
    this.checkbox = checkbox;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.mark = mark;
    this.coe = coe;
  }

  calculateSum() {
    return Number(this.mark) * Number(this.coe);
  }

  validate() {
    const errors = {};

    if (!isInputNotEmpty(this.firstName)) {
      errors.firstName = MESSAGES.FIRST_NAME_REQUIRED;
    }

    if (!isInputNotEmpty(this.lastName)) {
      errors.lastName = MESSAGES.LAST_NAME_REQUIRED;
    }

    if (!isInputNotEmpty(this.dateOfBirth)) {
      errors.dateOfBirth = MESSAGES.DATE_OF_BIRTH_REQUIRED;
    } else if (!isDateNotInFuture(this.dateOfBirth)) {
      errors.dateOfBirth = MESSAGES.DATE_OF_BIRTH_INVALID;
    }

    if (isInputNotBetween1to10(Number(this.mark))) {
      errors.mark = MESSAGES.MARK_OUT_OF_RANGE;
    }

    return errors;
  }
}

export function calcTotal(sums) {
    let total = 0;
    for (const sum of sums) {
        total += Number(sum);
    }
    return total;
}
