import { validateRow } from "../domain/markTable.js";

function formatDate(dateOfBirth) {
    const [year, month, day] = dateOfBirth.split("-");
    return `${day}/${month}/${year}`;
}

export function saveMarkTable(rows) {
    const lines = [];
    const errorRows = [];
    for (const row of rows){
        const inputErrors = validateRow(row.firstName, row.lastName, row.dateOfBirth, row.mark);

        if (Object.keys(inputErrors).length > 0) {
            errorRows.push({ rowIndex: row.rowIndex, inputErrors: inputErrors });
            continue;
        }
            
        lines.push(`First Name: ${row.firstName} - Last Name: ${row.lastName} ` 
            + `- Birth: ${formatDate(row.dateOfBirth)} - Mark: ${row.mark} - Coefficient: ${row.coe} `
            + `- Sum: ${row.sum}`);
    }
    
    return { lines, errorRows };
} 