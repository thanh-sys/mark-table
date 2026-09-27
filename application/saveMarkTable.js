import { MarkTableRow } from "../domain/markTable.js";

export function saveMarkTable(rows) {
    const errorRows = [];
    for (const row of rows){
        const markRow = new MarkTableRow(row);
        const inputErrors = markRow.validate();

        if (Object.keys(inputErrors).length > 0) {
            errorRows.push({ rowIndex: row.rowIndex, inputErrors: inputErrors });
            continue;
        }
    }
    return  errorRows ;
} 

