import { showError, clearError } from "../../shared/errorView.js";
import { MarkTableRow, calculateTotal } from "../../domain/markTable.js";

export class MarkTableView {
    constructor() {
        this.output = document.getElementById("output");
        this.inputRows = document.getElementById("inputRows");
        this.total = document.getElementById("total");
        this.coefficients = [1,2,3,4,5,6,7,8,9,10];
        this.optionsHtml = "";
    }

    init() {
        window.onMarkCoeChange = (row) => this.onMarkCoeChange(row);
        window.clearError = clearError;
        this.optionsHtml = this.coefficients.map(c => `<option>${c}</option>`).join("");
    }

    getRowValue(row) {
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

    getRows() {
        return Array.from(this.inputRows.rows, row => this.getRowValue(row));
    }

    getSums() {
        return Array.from(this.inputRows.rows, row => row.fields.sum.textContent);
    }

    clearErrors() {
        this.inputRows.querySelectorAll(".error").forEach(e => clearError(e));
    }

    showErrors(errorRows) {
        this.clearErrors();
        errorRows.forEach(({ rowIndex, inputErrors }) => {
            const row = this.inputRows.rows[rowIndex];
            Object.entries(inputErrors).forEach(([name, message]) => {
                showError(row.fields[`${name}-error`], message);
            });
        });
    }

    showOutput(rows) {
        const lines = rows.map(row => {
            const [year, month, day] = row.dateOfBirth.split("-");
            return `First Name: ${row.firstName} - Last Name: ${row.lastName} `
                + `- Birth: ${day}/${month}/${year} - Mark: ${row.mark} `
                + `- Coefficient: ${row.coe} - Sum: ${row.sum}`;
        });
        this.output.textContent = lines.concat(`Total: ${this.total.textContent}`).join("\n");
    }

    addRow() {
        const row = this.inputRows.insertRow();
        row.innerHTML = `
            <td><input type="checkbox" data-field="checkbox"></td>
            <td><input type="text" data-field="firstName" oninput="clearError(this.nextElementSibling)"><p class="error" data-field="firstName-error"></p></td>
            <td><input type="text" data-field="lastName" oninput="clearError(this.nextElementSibling)"><p class="error" data-field="lastName-error"></p></td>
            <td><input type="date" data-field="dateOfBirth" oninput="clearError(this.nextElementSibling)"><p class="error" data-field="dateOfBirth-error"></p></td>
            <td><input type="number" value="0" min="0" max="10" data-field="mark" oninput="clearError(this.nextElementSibling)" onchange="onMarkCoeChange(this.closest('tr'))"><p class="error" data-field="mark-error"></p></td>
            <td><select data-field="coe" onchange="onMarkCoeChange(this.closest('tr'))">${this.optionsHtml}</select></td>
            <td data-field="sum">0</td>
            <td></td>`;

        row.fields = {};
        row.querySelectorAll("[data-field]").forEach(el => {
            row.fields[el.dataset.field] = el;
        });
    }

    onMarkCoeChange(row) {
        const mark = row.fields.mark.value;
        const coe = row.fields.coe.value;
        const sum = new MarkTableRow({ mark, coe }).calculateSum();
        row.fields.sum.textContent = sum;

        const total = calculateTotal(this.getSums());
        this.total.textContent = total;
    }
}