import { showError, clearError } from "../../shared/errorView.js";
import { MarkTableRow, calculateTotal } from "../../domain/markTable.js";

export class MarkTableView {
    constructor() {
        this.output = document.getElementById("output");
        this.inputRows = document.getElementById("inputRows");
        this.total = document.getElementById("total");
        this.coefficients = [1,2,3,4,5,6,7,8,9,10];
        this.optionsHtml = "";
    }

    init() {
        window.onMarkCoeChange = (row) => this.onMarkCoeChange(row);
        window.clearError = clearError;
        this.optionsHtml = this.coefficients.map(c => `<option>${c}</option>`).join("");
    }
    /* hàm nhận một hàng trong bảng
        đọc giá trị checkbox, họ tên, ngày sinh, điểm, hệ số và tổng điểm
        trả về các giá trị đó dưới dạng object */
    getRowValue(row) {
        const f = row.fields;
        return {
            rowIndex: row.sectionRowIndex,
            firstName: f.firstName.value,
            lastName: f.lastName.value,
            dateOfBirth: f.dateOfBirth.value,
            mark: f.mark.value,
            coe: f.coe.value,
            sum: f.sum.textContent
        };
    }

    /* hàm duyệt các hàng trong tbody
    gọi hàm getRowValue cho từng hàng và trả về danh sách các object chứa dữ liệu của các hàng */
    getRows() {
        return Array.from(this.inputRows.rows, row => this.getRowValue(row));
    }
    
    getSums() {
        return Array.from(this.inputRows.rows, row => row.fields.sum.textContent);
    }

    /* hàm duyệt các hàng dữ liệu trong tbody
    tìm tất cả phần tử hiển thị lỗi trong mỗi hàng và xóa nội dung lỗi */
    clearErrors() {
        this.inputRows.querySelectorAll(".error").forEach(e => clearError(e));
    }

    /* hàm nhận danh sách hàng có lỗi
    xóa các lỗi đang hiển thị
    duyệt từng hàng lỗi và từng trường bị lỗi
    tìm phần tử lỗi tương ứng rồi hiển thị thông báo */
    showErrors(errorRows) {
        this.clearErrors();
        errorRows.forEach(({ rowIndex, inputErrors }) => {
            const row = this.inputRows.rows[rowIndex];
            Object.entries(inputErrors).forEach(([name, message]) => {
                showError(row.fields[`${name}-error`], message);
            });
        });
    }

    showOutput(rows) {
        const lines = rows.map(row => {
            const [year, month, day] = row.dateOfBirth.split("-");
            return `First Name: ${row.firstName} - Last Name: ${row.lastName} `
                + `- Birth: ${day}/${month}/${year} - Mark: ${row.mark} `
                + `- Coefficient: ${row.coe} - Sum: ${row.sum}`;
        });
        this.output.textContent = lines.concat(`Total: ${this.total.textContent}`).join("\n");
    }

    addRow() {
        const row = this.inputRows.insertRow();
        row.innerHTML = `
            <td><input type="checkbox" data-field="checkbox"></td>
            <td><input type="text" data-field="firstName" oninput="clearError(this.nextElementSibling)"><p class="error" data-field="firstName-error"></p></td>
            <td><input type="text" data-field="lastName" oninput="clearError(this.nextElementSibling)"><p class="error" data-field="lastName-error"></p></td>
            <td><input type="date" data-field="dateOfBirth" oninput="clearError(this.nextElementSibling)"><p class="error" data-field="dateOfBirth-error"></p></td>
            <td><input type="number" value="0" min="0" max="10" data-field="mark" oninput="clearError(this.nextElementSibling)" onchange="onMarkCoeChange(this.closest('tr'))"><p class="error" data-field="mark-error"></p></td>
            <td><select data-field="coe" onchange="onMarkCoeChange(this.closest('tr'))">${this.optionsHtml}</select></td>
            <td data-field="sum">0</td>
            <td><button type="button" class="delete-row-button" onclick="deleteRow(this)">X</button></td>`;
 
        row.fields = {};
        row.querySelectorAll("[data-field]").forEach(el => {
            row.fields[el.dataset.field] = el;
        });
    }

    /* hàm nhận một hàng trong bảng
    lấy dữ liệu mark và coe của hàng, tạo đối tượng hàng điểm và tính tổng điểm hàng
    cập nhật tổng điểm hàng trên giao diện
    lấy tổng các hàng đang chọn, tính tổng chung và cập nhật giao diện */
    onMarkCoeChange(row) {
        const mark = row.fields.mark.value;
        const coe = row.fields.coe.value;
        const sum = new MarkTableRow({ mark, coe }).calculateSum();
        row.fields.sum.textContent = sum;

        const total = calculateTotal(this.getSums());
        this.total.textContent = total;
    }
}