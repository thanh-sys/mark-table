import { showError, clearError } from "../../shared/errorView.js";

const table = document.getElementById('markTable');
const errorElements = {
    firstName : 'first-name-error',
    lastName : 'last-name-error',
    dateOfBirth : 'date-of-birth-error',
    mark : 'mark-error'
}

function getCellValue(row, columnIndex, type) {
  const cell = row.cells[columnIndex];
  const element = cell.querySelector(type);
  return element.value ;
}

export function getSelectedRows() {
    const rows = [];
    for (const row of table.rows){
        if(row.id === "headerRow" || row.id === "totalRow") continue;
        const checkbox = row.cells[0].querySelector("input");
        if(checkbox.checked){
            const rowData = {
            rowIndex: row.rowIndex,
            firstName: getCellValue(row, 1, "input"),
            lastName: getCellValue(row, 2, "input"),
            dateOfBirth: getCellValue(row, 3, "input"),
            mark: getCellValue(row, 4, "input"),
            coe: getCellValue(row, 5, "select"),
            sum: row.cells[6].textContent
            };
            rows.push(rowData);
        }
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

export function showOutput(lines) {
    const output = document.getElementById("output");
    output.textContent = lines.join("\n");
    output.style.display = "block";
}

export function addRow(onMarkCoeChange) {
    const totalRow = document.getElementById('totalRow');
    const newRow = table.insertRow(totalRow.rowIndex);
    newRow.insertCell(0).innerHTML = "<input type='checkbox'>";
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

export function getMarkCoeSums(row) {
    const mark = row.cells[4].querySelector('input').value;
    const coe =  row.cells[5].querySelector('select').value;
    const sums = [];
    for (const tableRow of table.rows) {
        if (tableRow === row || tableRow.id === "headerRow" || tableRow.id === "totalRow") continue;
        sums.push(tableRow.cells[6].textContent);
    }
    return { mark: mark, coe: coe, sums: sums };
}

export function updateSumTotal(row, sum, total) {
    row.cells[6].textContent = sum;
    document.getElementById('total').textContent = total ;
}

