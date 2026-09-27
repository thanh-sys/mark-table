import { saveMarkTable } from "../../application/saveMarkTable.js";
import { clearErrors, addRow, getRowValue, getSelectedRows, showErrors, showOutput, updateSum, getSums, updateTotal } from "./markTableView.js";
import { MarkTableRow, calcTotal } from "../../domain/markTable.js";

const saveButton = document.getElementById('saveButton');
/* callback khi nhấn nút lưu:
    lấy các hàng đang được chọn; dừng nếu không có hàng nào
    kiểm tra dữ liệu các hàng đã chọn
    nếu có lỗi thì hiển thị lỗi, nếu không thì xóa lỗi cũ và hiển thị kết quả */
saveButton.addEventListener('click', () => {
    const rows = getSelectedRows();
    if (rows.length === 0) return;

    const errorRows = saveMarkTable(rows);
    if(errorRows.length > 0){
        showErrors(errorRows);
    }else{
        clearErrors();
        showOutput(rows);
    }
});

const addRowButton = document.getElementById('addRowButton');
/* callback khi nhấn nút thêm hàng:
    tạo một hàng mới và truyền hàm cập nhật điểm, tổng vào phần hiển thị */
addRowButton.addEventListener('click', () => {
    addRow(onMarkCoeChange)
});

/* hàm nhận một hàng trong bảng
    lấy dữ liệu của hàng, tạo đối tượng hàng điểm và tính tổng điểm hàng
    cập nhật tổng điểm hàng trên giao diện
    lấy tổng các hàng đang chọn, tính tổng chung và cập nhật giao diện */
export function onMarkCoeChange(row) {
    const rowValue = getRowValue(row);
    const markRow = new MarkTableRow(rowValue);
    const sum = markRow.calculateSum();
    updateSum(row, sum);

    const sums = getSums();
    const total = calcTotal(sums);
    updateTotal(total);
}