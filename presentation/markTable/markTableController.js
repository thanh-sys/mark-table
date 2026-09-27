import { saveMarkTable } from "../../application/saveMarkTable.js";
import { clearErrors, addRow, getRowValue, getSelectedRows, showErrors, showOutput, updateSum, getSums, updateTotal } from "./markTableView.js";
import { MarkTableRow, calcTotal } from "../../domain/markTable.js";
import { MESSAGES } from "../../shared/messages.js";

const saveButton = document.getElementById('saveButton');
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
addRowButton.addEventListener('click', () => {
    addRow(onMarkCoeChange)
});

export function onMarkCoeChange(row) {
    const rowValue = getRowValue(row);
    const markRow = new MarkTableRow(rowValue);
    const sum = markRow.calculateSum();
    updateSum(row, sum);

    const sums = getSums();
    const total = calcTotal(sums);
    updateTotal(total);
}