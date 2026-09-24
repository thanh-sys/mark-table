import { validateRow } from "../domain/markTable.js";
import { clearError, showError } from "../shared/errorView.js";
import { MESSAGES } from "../shared/messages.js";

const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', saveMarkTable);

function saveMarkTable() {
    const table = document.getElementById('markTable');
    const lines = [];
    let isValid = true;
    let isChecked = false;
    for (const row of table.rows){
        if (row.id === "headerRow" || row.id === "totalRow") continue;

        const checkbox = row.cells[0].querySelector("input");
        if (checkbox.checked) {
            isChecked = true;
            const firstName = row.cells[1].querySelector("input").value;
            const lastName = row.cells[2].querySelector("input").value;
            const dateOfBirth = row.cells[3].querySelector("input").value;
            const mark = row.cells[4].querySelector("input").value;
            const coefficient = row.cells[5].querySelector("select").value;
            const sum = row.cells[6].textContent;  
            
            const markTableRules = validateRow(firstName, lastName, dateOfBirth)  
            for (const rule of markTableRules) {
                if (!rule.isValid) {
                    isValid = false;
                    showError(row.querySelector(`.${rule.elementName}`), rule.message);
                }else{
                    clearError(row.querySelector(`.${rule.elementName}`));
                }
            }

            if (isValid ===true){
                lines.push(`First Name: ${firstName} - Last Name: ${lastName} - Birth: ${dateOfBirth} - Mark: ${mark} - Coefficient: ${coefficient} - Sum: ${sum}`);
            }
        }
    }    
    const output = document.getElementById("output");
    if(!isChecked) {
        output.textContent = MESSAGES.CHECKED_REQUIRED;
    } else if (isChecked && isValid) {
        output.textContent = lines.join("\n");
        output.style.display = "block";
    } else {
        output.textContent = "";
    }
} 