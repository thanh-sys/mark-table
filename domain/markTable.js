import { MESSAGES } from "../shared/messages.js";
import { isInputNotEmpty, makeRule } from "../shared/validation.js";

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

export function validateRow(firstNameInput, lastNameInput, dateOfBirth ) {
  return [
    makeRule("first-name-error", isInputNotEmpty(firstNameInput), MESSAGES.FIRST_NAME_REQUIRED),
    makeRule("last-name-error", isInputNotEmpty(lastNameInput), MESSAGES.LAST_NAME_REQUIRED),
    makeRule("date-of-birth-error", isInputNotEmpty(dateOfBirth), MESSAGES.DATE_OF_BIRTH_REQUIRED)
  ];
}

