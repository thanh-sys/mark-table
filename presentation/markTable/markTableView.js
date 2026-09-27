import { showError, clearError } from "../../shared/errorView.js";
import { MESSAGES } from "../../shared/messages.js";

const table = document.getElementById('markTable');
const errorElements = {
    firstName : 'first-name-error',
    lastName : 'last-name-error',
    dateOfBirth : 'date-of-birth-error',
    mark : 'mark-error'
}

export function getRowValue(row) {
  return  {
    rowIndex: row.rowIndex,
    firstName : row.cells[1].querySelector("input").value,
    lastName : row.cells[2].querySelector("input").value,
    dateOfBirth : row.cells[3].querySelector("input").value,
    mark : row.cells[4].querySelector("input").value,
    coe : row.cells[5].querySelector("select").value,
    sum : row.cells[6].textContent
    };
}

export function getSelectedRows() {
    const rows = [];
    for (const row of table.rows){
        if(row.id === "headerRow" || row.id === "totalRow") continue;
        const checkbox = row.cells[0].querySelector("input");
        if(checkbox.checked){
            rows.push(getRowValue(row));
        }
    }         
    if (rows.length === 0) {
        showError(document.getElementById("output"), MESSAGES.ROW_REQUIRED);
    }else{
        clearError(document.getElementById("output"));
    }
    return rows;
}

export function clearErrors() {
    for(const row of table.rows) {
        if(row.id === "headerRow" || row.id === "totalRow") continue;
        for(const errorName of Object.values(errorElements)){
            const errorElement = row.querySelector(`.${errorName}`);
            if (errorElement) {
                clearError(errorElement);
            }
        }
    } 
}

export function showErrors(errorRows) {
    clearErrors();
    for(const errorRow of errorRows) {
        for(const [errorName,message] of Object.entries(errorRow.inputErrors)){
            const errorElement = table.rows[errorRow.rowIndex]?.querySelector(`.${errorElements[errorName]}`);
            if (errorElement) {
                showError(errorElement, message);
            }
        }
    }
}

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

export function addRow(onMarkCoeChange) {
    const totalRow = document.getElementById('totalRow');
    const newRow = table.insertRow(totalRow.rowIndex);
    
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.addEventListener("click", () => onMarkCoeChange(newRow));
    newRow.insertCell(0).appendChild(checkboxInput)

    newRow.insertCell(1).innerHTML = "<input type='text'> <p class='first-name-error error'></p> ";
    newRow.insertCell(2).innerHTML = "<input type='text'> <p class='last-name-error error'></p>";
    newRow.insertCell(3).innerHTML = "<input type='date' required> <p class='date-of-birth-error error'></p>";
    
    const markCell = newRow.insertCell(4);
    const markInput = document.createElement("input");
    markInput.type = "number";
    markInput.value = 0;
    markInput.min = 0;
    markInput.max = 10;
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
    coeSelect.addEventListener("change", () => onMarkCoeChange(newRow));
    newRow.insertCell(5).appendChild(coeSelect);

    newRow.insertCell(6).textContent = 0;
    newRow.insertCell(7);
}

export function getSums(){
    const sums = [];
     for (const tableRow of table.rows) {
        if ( tableRow.id === "headerRow" || tableRow.id === "totalRow") continue;
        if(tableRow.cells[0].querySelector('input').checked){
            sums.push(tableRow.cells[6].textContent);
        }
    }
    return sums;
}

export function updateSum(row, sum) {
    row.cells[6].textContent = sum;
}

export function updateTotal(total) {
    document.getElementById('total').textContent = total ;
}


