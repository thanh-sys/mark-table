import { MESSAGES } from "../shared/messages.js";
import { isDateNotInFuture, isInputNotBetween1to10, isInputNotEmpty } from "../shared/validation.js";

export function calcSum(mark,coe) {
    return  mark * coe; 
}

export function calcTotal(sums) {
    let total = 0;
    for (const sum of sums) {
        total += Number(sum);
    }
    return total;
}

export function validateRow(firstNameInput, lastNameInput, dateOfBirth, mark) {
  const errors = {};

  if (!isInputNotEmpty(firstNameInput)) {
    errors.firstName = MESSAGES.FIRST_NAME_REQUIRED;
  }

  if (!isInputNotEmpty(lastNameInput)) {
    errors.lastName = MESSAGES.LAST_NAME_REQUIRED;
  }

  if (!isInputNotEmpty(dateOfBirth)) {
    errors.dateOfBirth = MESSAGES.DATE_OF_BIRTH_REQUIRED;
  } else if (!isDateNotInFuture(dateOfBirth)) {
    errors.dateOfBirth = MESSAGES.DATE_OF_BIRTH_INVALID;
  }

  if (isInputNotBetween1to10(Number(mark))) {
    errors.mark = MESSAGES.MARK_OUT_OF_RANGE;
  }

  return errors;
}

