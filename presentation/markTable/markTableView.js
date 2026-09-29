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
        for (const { rowIndex, inputErrors } of errorRows) {
            const row = this.inputRows.rows[rowIndex];
            for (const [name, message] of Object.entries(inputErrors)) {
                showError(row.fields[`${name}-error`], message);
            }
        }
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
            <td><input type="text" data-field="firstName"><p class="error" data-field="firstName-error"></p></td>
            <td><input type="text" data-field="lastName"><p class="error" data-field="lastName-error"></p></td>
            <td><input type="date" data-field="dateOfBirth"><p class="error" data-field="dateOfBirth-error"></p></td>
            <td><input type="number" value="0" min="0" max="10" data-field="mark"><p class="error" data-field="mark-error"></p></td>
            <td><select data-field="coe">${this.optionsHtml}</select></td>
            <td data-field="sum">0</td>
            <td></td>`;

        row.fields = {};
        row.querySelectorAll("[data-field]").forEach(el => {
            row.fields[el.dataset.field] = el;
        });

        row.fields.firstName.addEventListener("input", () => clearError(row.fields["firstName-error"]));
        row.fields.lastName.addEventListener("input", () => clearError(row.fields["lastName-error"]));
        row.fields.dateOfBirth.addEventListener("input", () => clearError(row.fields["dateOfBirth-error"]));
        row.fields.mark.addEventListener("input", () => clearError(row.fields["mark-error"]));
        row.fields.coe.addEventListener("input", () => clearError(row.fields["coe-error"]));
        row.fields.mark.addEventListener("change", () => this.onMarkCoeChange(row));
        row.fields.coe.addEventListener("change", () => this.onMarkCoeChange(row));
    }

    onMarkCoeChange(row) {
        const rowValue = this.getRowValue(row);
        const markRow = new MarkTableRow(rowValue);
        const sum = markRow.calculateSum();
        row.fields.sum.textContent = sum;

        const sums = this.getSums();
        const total = calculateTotal(sums);
        this.total.textContent = total;
    }
}
