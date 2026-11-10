
// Import functions from expense.js
import {
    expenses,
    addExpense,
    calculateTotal,
    deleteExpense
} from "./expense.js";

// Get HTML elements
const form = document.getElementById("expenseForm");
const nameInput = document.getElementById("expenseName");
const amountInput = document.getElementById("expenseAmount");
const totalDisplay = document.getElementById("total");
const expenseList = document.getElementById("expenseList");

// Display all expenses
function displayExpenses() {

    expenseList.innerHTML = "";

    expenses.forEach(expense => {

        const li = document.createElement("li");

        const details = document.createElement("span");
        details.textContent =
            `${expense.name} - ₹${expense.amount.toFixed(2)}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        // Delete selected expense
        deleteButton.addEventListener("click", () => {

            deleteExpense(expense.id);

            displayExpenses();

        });

        li.appendChild(details);
        li.appendChild(deleteButton);

        expenseList.appendChild(li);

    });

    // Update total amount
    totalDisplay.textContent =
        "₹" + calculateTotal().toFixed(2);

}

// Handle form submission
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = nameInput.value;
    const amount = Number(amountInput.value);

    try {

        addExpense(name, amount);

        // Clear input fields
        form.reset();

        // Refresh expense list
        displayExpenses();

    } catch (error) {

        alert(error.message);

    }

});

// Display initial data
displayExpenses();
