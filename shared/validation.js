/* hàm nhận input là chuỗi
    hàm trả về true nếu chuỗi không rỗng, false nếu chuỗi rỗng */
export function isInputNotEmpty(input) {
  return input.trim().length > 0;
}

/* hàm nhận điểm dưới dạng số
    kiểm tra điểm có nhỏ hơn 0 hoặc lớn hơn 10 không
    trả về true nếu điểm nằm ngoài khoảng 0 đến 10, ngược lại trả về false */
export function isInputNotBetween1to10(markNumber) {
  return markNumber < 0 || markNumber > 10;
}

/* hàm nhận ngày sinh dưới dạng chuỗi
    chuyển ngày sinh thành kiểu ngày
    lấy ngày hiện tại
    trả về true nếu ngày sinh không sau ngày hiện tại, ngược lại trả về false */
export function isDateNotInFuture(dateString) {
  const inputDate = new Date(dateString);
  const today = new Date(); 
  return inputDate <= today;
}
