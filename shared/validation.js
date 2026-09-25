/* hàm nhận input là chuỗi
    hàm trả về true nếu chuỗi không rỗng, false nếu chuỗi rỗng */
export function isInputNotEmpty(input) {
  return input.trim().length > 0;
}

export function isInputNotBetween1to10(markNumber) {
  return markNumber < 0 || markNumber > 10;
}

export function isDateNotInFuture(dateString) {
  const inputDate = new Date(dateString);
  const today = new Date(); 
  return inputDate <= today;
}
