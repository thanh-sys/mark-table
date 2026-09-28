import { showError, clearError } from "../../shared/errorView.js";
import { MESSAGES } from "../../shared/messages.js";

const inputRows = document.getElementById('inputRows');
const errorElements = {
    firstName : 'first-name-error',
    lastName : 'last-name-error',
    dateOfBirth : 'date-of-birth-error',
    mark : 'mark-error'
}

/* hàm nhận một hàng trong bảng
    đọc giá trị checkbox, họ tên, ngày sinh, điểm, hệ số và tổng điểm
    trả về các giá trị đó dưới dạng object */
export function getRowValue(row) {
  return  {
    rowIndex: row.sectionRowIndex,
    firstName : row.cells[1].querySelector("input").value,
    lastName : row.cells[2].querySelector("input").value,
    dateOfBirth : row.cells[3].querySelector("input").value,
    mark : row.cells[4].querySelector("input").value,
    coe : row.cells[5].querySelector("select").value,
    sum : row.cells[6].textContent
    };
}

/* hàm duyệt các hàng trong bảng, bỏ qua hàng tiêu đề và hàng tổng
    lấy dữ liệu những hàng có checkbox được chọn
    nếu không có hàng nào được chọn thì hiển thị thông báo, nếu có thì xóa thông báo cũ
    trả về danh sách dữ liệu các hàng được chọn */
export function getSelectedRows() {
    const rows = [];
   for (const row of inputRows.rows){
        const checkbox = row.cells[0].querySelector("input");
        if(checkbox.checked){
            rows.push(getRowValue(row));
        }
    }         

    if (rows.length === 0) {
        showError(document.getElementById("output"), MESSAGES.ROW_REQUIRED);
        const outputRows = document.getElementById("outputRows");
        outputRows.replaceChildren();
    }else {
        clearError(document.getElementById("output"));
    }

    return rows;
}

/* hàm duyệt các hàng dữ liệu trong tbody
    tìm các phần tử hiển thị lỗi trong mỗi hàng và xóa nội dung lỗi */
export function clearErrors() {
    for(const row of inputRows.rows) {
        for(const errorName of Object.values(errorElements)){
            const errorElement = row.querySelector(`.${errorName}`);
            if (errorElement) {
                clearError(errorElement);
            }
        }
    } 
}

/* hàm nhận danh sách hàng có lỗi
    xóa các lỗi đang hiển thị
    duyệt từng hàng lỗi và từng trường bị lỗi
    tìm phần tử lỗi tương ứng rồi hiển thị thông báo */
export function showErrors(errorRows) {
    clearErrors();
    for(const errorRow of errorRows) {
        for(const [errorName,message] of Object.entries(errorRow.inputErrors)){
            const errorElement = inputRows.rows[errorRow.rowIndex].querySelector(`.${errorElements[errorName]}`);
                showError(errorElement, message);
        }
    }
}

/* hàm nhận danh sách hàng hợp lệ
      xóa các dòng kết quả đang hiển thị
    duyệt từng hàng hợp lệ, tạo dòng kết quả và thêm vào bảng output
    lấy tổng điểm chung từ giao diện và hiển thị vào phần tổng của bảng output */
export function showOutput(rows) {
    const lines = [];
    for(const row of rows){
        const [year, month, day] = row.dateOfBirth.split("-");
          lines.push(`First Name: ${row.firstName} - Last Name: ${row.lastName} ` 
            + `- Birth: ${`${day}/${month}/${year}`} - Mark: ${row.mark}`
            + `- Coefficient: ${row.coe} `
            + `- Sum: ${row.sum}`);
    }
    const output = document.getElementById("output");
    output.textContent = lines.concat(`Total: ${document.getElementById('total').textContent}`).join("\n");
}

/* hàm nhận hàm callback để cập nhật điểm và tổng
    chèn hàng mới trước hàng tổng
    tạo checkbox, các ô nhập thông tin, ô điểm, danh sách hệ số và ô tổng điểm
    gắn callback vào sự kiện thay đổi checkbox, điểm và hệ số */
export function addRow(onMarkCoeChange) {
    const newRow = inputRows.insertRow();
    
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    /* callback khi thay đổi trạng thái chọn:
        gọi hàm được truyền vào với hàng mới để cập nhật điểm và tổng */
    checkboxInput.addEventListener("click", () => onMarkCoeChange(newRow));
    newRow.insertCell(0).appendChild(checkboxInput)

    newRow.insertCell(1).innerHTML = "<input type='text'> <p class='first-name-error error'></p> ";
    newRow.insertCell(2).innerHTML = "<input type='text'> <p class='last-name-error error'></p>";
    newRow.insertCell(3).innerHTML = "<input type='date'> <p class='date-of-birth-error error'></p>";
    
    const markCell = newRow.insertCell(4);
    const markInput = document.createElement("input");
    markInput.type = "number";
    markInput.value = 0;
    markInput.min = 0;
    markInput.max = 10;
    /* callback khi thay đổi điểm:
        gọi hàm được truyền vào với hàng mới để cập nhật điểm và tổng */
    markInput.addEventListener("change", () => onMarkCoeChange(newRow));
    markCell.appendChild(markInput);
    const markError = document.createElement("p");
    markError.className = "mark-error error";
    markCell.appendChild(markError);

    const coeSelect = document.createElement("select");
    for (let i = 1; i <=10 ; i++){
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        coeSelect.appendChild(option);
    }
    /* callback khi thay đổi hệ số:
        gọi hàm được truyền vào với hàng mới để cập nhật điểm và tổng */
    coeSelect.addEventListener("change", () => onMarkCoeChange(newRow));
    newRow.insertCell(5).appendChild(coeSelect);

    newRow.insertCell(6).textContent = 0;
    newRow.insertCell(7);
}

/* hàm duyệt các hàng dữ liệu trong tbody
    chỉ lấy tổng điểm của hàng đang được chọn
    trả về danh sách tổng điểm */
export function getSums(){
    const sums = [];
    for (const tableRow of inputRows.rows) {
        if(tableRow.cells[0].querySelector('input').checked){
            sums.push(tableRow.cells[6].textContent);
        }
    }
    return sums;
}

/* hàm nhận hàng và tổng điểm mới
    cập nhật nội dung ô tổng điểm của hàng đó */
export function updateSum(row, sum) {
    row.cells[6].textContent = sum;
}

/* hàm nhận tổng điểm chung
    cập nhật nội dung phần tử hiển thị tổng trên giao diện */
export function updateTotal(total) {
    document.getElementById('total').textContent = total ;
}


