import { MESSAGES } from "../shared/messages.js";
import { isDateNotInFuture, isInputNotBetween1to10, isInputNotEmpty } from "../shared/validation.js";

export class MarkTableRow {
  /* hàm nhận object chứa dữ liệu một hàng điểm
      gán checkbox, họ tên, ngày sinh, điểm và hệ số vào thuộc tính của đối tượng */
  constructor({ checkbox, firstName, lastName, dateOfBirth, mark, coe }) {
    this.checkbox = checkbox;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.mark = mark;
    this.coe = coe;
  }

  /* hàm lấy điểm và hệ số của hàng hiện tại
      chuyển hai giá trị thành số, nhân chúng với nhau
      trả về tổng điểm của hàng */
  calculateSum() {
    return Number(this.mark) * Number(this.coe);
  }

  /* hàm kiểm tra dữ liệu của hàng hiện tại
      tạo object rỗng để lưu lỗi
      kiểm tra họ tên, ngày sinh và điểm; thêm thông báo tương ứng nếu không hợp lệ
      trả về object chứa các lỗi tìm được */
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

/* hàm nhận danh sách tổng điểm của các hàng
  khởi tạo tổng bằng 0
  lần lượt chuyển từng giá trị thành số và cộng vào tổng
  trả về tổng điểm */
export function calcTotal(sums) {
    let total = 0;
    for (const sum of sums) {
        total += Number(sum);
    }
    return total;
}
