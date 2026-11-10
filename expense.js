
// Store all expenses in an array
export let expenses = [];

// Function to add an expense
export function addExpense(name, amount) {

    // Check whether the name is valid
    if (!name || !name.trim()) {
        throw new Error("Enter a valid expense name");
    }

    // Check whether the amount is valid
    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Enter a valid amount");
    }

    // Create an expense object
    const expense = {
        id: Date.now() + Math.random(),
        name: name.trim(),
        amount: amount
    };

    // Add expense to array
    expenses.push(expense);

    return expense;
}

// Function to calculate total expenses
export function calculateTotal(list = expenses) {

    return list.reduce(
        (total, expense) => total + expense.amount,
        0
    );

}

// Function to delete an expense
export function deleteExpense(id) {

    expenses = expenses.filter(
        expense => expense.id !== id
    );

}
