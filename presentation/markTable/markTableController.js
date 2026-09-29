import { showError, clearError } from "../../shared/errorView.js";
import { MarkTableRow, calculateTotal } from "../../domain/markTable.js";
import { saveMarkTable } from "../../application/saveMarkTable.js";

const output = document.getElementById("output");
const inputRows = document.getElementById("inputRows");
const total = document.getElementById("total");
const coefficients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const optionsHtml = coefficients.map(c => `<option>${c}</option>`).join("");

function getRowValue(row) {
    const f = row.fields;
    return {
        rowIndex: row.sectionRowIndex,
        firstName: f.firstName.value,
        lastName: f.lastName.value,
        dateOfBirth: f.dateOfBirth.value,
        mark: f.mark.value,
        coe: f.coe.value,
        sum: f.sum.textContent
    };
}

function getRows() {
    return Array.from(inputRows.rows, row => getRowValue(row));
}

function getSums() {
    return Array.from(inputRows.rows, row => row.fields.sum.textContent);
}

function clearErrors() {
    inputRows.querySelectorAll(".error").forEach(e => clearError(e));
}

function showErrors(errorRows) {
    clearErrors();
    for (const { rowIndex, inputErrors } of errorRows) {
        const row = inputRows.rows[rowIndex];
        for (const [name, message] of Object.entries(inputErrors)) {
            showError(row.fields[`${name}-error`], message);
        }
    }
}

function showOutput(rows) {
    const lines = rows.map(row => {
        const [year, month, day] = row.dateOfBirth.split("-");
        return `First Name: ${row.firstName} - Last Name: ${row.lastName} `
            + `- Birth: ${day}/${month}/${year} - Mark: ${row.mark} `
            + `- Coefficient: ${row.coe} - Sum: ${row.sum}`;
    });
    output.textContent = lines.concat(`Total: ${total.textContent}`).join("\n");
}

function addRow() {
    const row = inputRows.insertRow();
    row.innerHTML = `
        <td><input type="checkbox" data-field="checkbox"></td>
        <td><input type="text" data-field="firstName" oninput="clearError(this.nextElementSibling)"><p class="error" data-field="firstName-error"></p></td>
        <td><input type="text" data-field="lastName" oninput="clearError(this.nextElementSibling)"><p class="error" data-field="lastName-error"></p></td>
        <td><input type="date" data-field="dateOfBirth" oninput="clearError(this.nextElementSibling)"><p class="error" data-field="dateOfBirth-error"></p></td>
        <td><input type="number" value="0" min="0" max="10" data-field="mark" oninput="clearError(this.nextElementSibling)" onchange="onMarkCoeChange(this.closest('tr'))"><p class="error" data-field="mark-error"></p></td>
        <td><select data-field="coe" onchange="onMarkCoeChange(this.closest('tr'))">${optionsHtml}</select></td>
        <td data-field="sum">0</td>
        <td></td>`;

    row.fields = {};
    row.querySelectorAll("[data-field]").forEach(el => {
        row.fields[el.dataset.field] = el;
    });
}

function onMarkCoeChange(row) {
    const mark = row.fields.mark.value;
    const coe = row.fields.coe.value;

    const markRow = new MarkTableRow({ mark, coe });
    const sum = markRow.calculateSum();
    row.fields.sum.textContent = sum;

    const sums = getSums();
    const newTotal = calculateTotal(sums);
    total.textContent = newTotal;
}

function save() {
    const rows = getRows();
    if (rows.length === 0) return;

    const errorRows = saveMarkTable(rows);
    if (errorRows.length > 0) {
        showErrors(errorRows);
    } else {
        clearErrors();
        showOutput(rows);
    }
}

window.addRow = addRow;
window.onMarkCoeChange = onMarkCoeChange;
window.save = save;
window.clearError = clearError;