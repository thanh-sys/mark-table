import { MarkTableRow } from "../domain/markTable.js";

/*  hàm nhận input là mảng các hàng điểm 
    duyệt qua từng hàng 
    tạo đối tượng MarkTableRow và kiểm tra tính hợp lệ theo domain rules 
    nếu hàng có lỗi thì thêm vào mảng errorRows
    kết thúc duyệt trả về mảng errorRows gồm index các hàng có lỗi và các input của hàng đó có lỗi
*/
export function saveMarkTable(rows) {
    const errorRows = [];
    for (const row of rows){
        const markRow = new MarkTableRow(row);
        const inputErrors = markRow.validate();

        if (Object.keys(inputErrors).length > 0) {
            errorRows.push({ rowIndex: row.rowIndex, inputErrors: inputErrors });
        }
    }
    return  errorRows ;
} 

