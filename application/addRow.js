import { calcSum, calcTotal } from "../domain/markTable.js";

const table = document.getElementById('markTable');
const addRowButton = document.getElementById('addRowButton');
addRowButton.addEventListener('click', addRow);

function addRow() {
    const totalRow = document.getElementById('totalRow');
    const newRow = table.insertRow(totalRow.rowIndex);

    newRow.insertCell(0).innerHTML = "<input type='checkbox'>";
    newRow.insertCell(1).innerHTML = "<input type='text'> <p class='first-name-error error'></p> ";
    newRow.insertCell(2).innerHTML = "<input type='text'> <p class='last-name-error error'></p>";
    newRow.insertCell(3).innerHTML = "<input type='date'> <p class='date-of-birth-error error'></p>";

    const markInput = document.createElement("input");
    markInput.type = "number";
    markInput.value = 0;
    markInput.min = 0;
    markInput.max = 10;
    markInput.addEventListener("change", () => { updateSumTotal(newRow) });
    newRow.insertCell(4).appendChild(markInput);

    const coeSelect = document.createElement("select");
    for (let i = 1; i <=10 ; i++){
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        coeSelect.appendChild(option);
    }
    coeSelect.addEventListener("change", () => { updateSumTotal(newRow) });
    newRow.insertCell(5).appendChild(coeSelect);
    newRow.insertCell(6).textContent = 0;
    newRow.insertCell(7);
}

function updateSumTotal(row) {
    row.cells[6].textContent = calcSum(row.cells[4].querySelector('input').value, row.cells[5].querySelector('select').value);

    const sums = [];
    for (const row of table.rows) {
        if (row.id === "headerRow" || row.id === "totalRow") continue;
        sums.push(row.cells[6].textContent);
    }
    document.getElementById('total').textContent = calcTotal(sums);
}







