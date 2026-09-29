import { saveMarkTable } from "../../application/saveMarkTable.js";
import { MarkTableView } from "./markTableView.js";
class MarkTableController {
    constructor(view) {
        this.view = view;
        document.getElementById("saveButton").addEventListener("click", () => this.save());
        document.getElementById("addRowButton").addEventListener("click", () => this.view.addRow());
    }

    init() {
        this.view.init();
    }

    save() {
        const rows = this.view.getRows();
        if (rows.length === 0) return;

        const errorRows = saveMarkTable(rows);
        if (errorRows.length > 0) {
            this.view.showErrors(errorRows);
        } else {
            this.view.clearErrors();
            this.view.showOutput(rows);
        }
    }
}

const controller = new MarkTableController(new MarkTableView());
controller.init();
