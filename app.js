
// Import expense functions
import {
    addExpense,
    calculateTotal,
    deleteExpense,
    updateExpense,
    getMonthlyTotal,
    getCategoryTotals
} from "./expense.js";


// Get HTML elements
const form = document.getElementById("expenseForm");
const nameInput = document.getElementById("expenseName");
const amountInput = document.getElementById("expenseAmount");
const categoryInput = document.getElementById("expenseCategory");
const dateInput = document.getElementById("expenseDate");

const totalDisplay = document.getElementById("total");
const monthlyDisplay = document.getElementById("monthlyTotal");
const expenseList = document.getElementById("expenseList");
const submitButton = document.getElementById("submitButton");


// Load saved expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


// Store the ID of the expense being edited
let editingId = null;


// Save expenses in localStorage
function saveExpenses() {

    localStorage.setItem("expenses", JSON.stringify(expenses));

}


// Display all expenses
function displayExpenses() {

    expenseList.innerHTML = "";

    expenses.forEach(expense => {

        const li = document.createElement("li");

        const details = document.createElement("span");

        details.textContent =
            `${expense.name} | ${expense.category} | ₹${expense.amount.toFixed(2)} | ${expense.date}`;

        // Create Edit button
        const editButton = document.createElement("button");

        editButton.textContent = "Edit";
        editButton.className = "edit-btn";

        editButton.addEventListener("click", () => {

            nameInput.value = expense.name;
            amountInput.value = expense.amount;
            categoryInput.value = expense.category;
            dateInput.value = expense.date;

            editingId = expense.id;

            submitButton.textContent = "Update Expense";

        });


        // Create Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {

            expenses = deleteExpense(expenses, expense.id);

            saveExpenses();

            displayExpenses();

        });


        li.appendChild(details);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        expenseList.appendChild(li);

    });


    // Calculate and display total expenses
    totalDisplay.textContent =
        "₹" + calculateTotal(expenses).toFixed(2);


    // Calculate current month's expenses
    const now = new Date();

    const currentMonth =
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    monthlyDisplay.textContent =
        "₹" + getMonthlyTotal(expenses, currentMonth).toFixed(2);


    // Update chart
    updateChart();

}


// Handle form submission
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = nameInput.value;
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;

    try {

        if (editingId !== null) {

            expenses = updateExpense(
                expenses,
                editingId,
                { name, amount, category, date }
            );

            editingId = null;

            submitButton.textContent = "Add Expense";

        } else {

            expenses = addExpense(
                expenses,
                name,
                amount,
                category,
                date
            );

        }

        saveExpenses();

        form.reset();

        displayExpenses();

    } catch (error) {

        alert(error.message);

    }

});


// Create category-wise expense chart
let expenseChart = null;

function updateChart() {

    const categoryTotals = getCategoryTotals(expenses);

    const labels = Object.keys(categoryTotals);

    const values = Object.values(categoryTotals);

    const ctx = document.getElementById("expenseChart");

    if (expenseChart !== null) {

        expenseChart.destroy();

    }

    expenseChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: labels,

            datasets: [{

                label: "Expenses",

                data: values

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}


// Display expenses when the page loads
displayExpenses();
