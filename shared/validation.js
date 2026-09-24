/* hàm nhận input là chuỗi
    hàm trả về true nếu chuỗi không rỗng, false nếu chuỗi rỗng */
export function isInputNotEmpty(input) {
  return input.trim().length > 0;
}

/* hàm tạo các rule xác thực cho personal info form
      nhận input là object chứa dữ liệu từ form
      mỗi rule là một object chứa fieldName, isValid và message */
export function makeRule(elementName, condition, message) {
  return {elementName, isValid: condition, message };
}