import { saveMarkTable } from "../../application/saveMarkTable.js";
import { clearErrors, addRow, getMarkCoe, getSelectedRows, showErrors, showOutput, updateSumTotal, getSums, updateTotal } from "./markTableView.js";
import { calcSum, calcTotal } from "../../domain/markTable.js";

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
    const { mark, coe } = getMarkCoe(row);
    const sum = calcSum(mark, coe);
    updateSumTotal(row, sum);

    const sums = getSums();
    const total = calcTotal(sums);
    updateTotal(total);
}