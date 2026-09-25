import { saveMarkTable } from "../../application/saveMarkTable.js";
import { calcSumTotal } from "../../application/calcSumTotal.js";
import { clearErrors, addRow, getMarkCoeSums, getSelectedRows, showErrors, showOutput, updateSumTotal } from "./markTableView.js";

const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', () => {
    const rows = getSelectedRows();
    const result = saveMarkTable(rows);
    if(result.errorRows.length > 0){
        showErrors(result.errorRows);
    }else{
        clearErrors();
        showOutput(result.lines);
    }
});

const addRowButton = document.getElementById('addRowButton');
addRowButton.addEventListener('click', () => {
    addRow(onMarkCoeChange)
});

export function onMarkCoeChange(row) {
    const { mark, coe, sums } = getMarkCoeSums(row);
    const { sum, total } = calcSumTotal(mark, coe, sums);
    updateSumTotal(row, sum, total);
}