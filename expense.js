
// Expense management functions

// Function to add a new expense
export function addExpense(expenses, name, amount, category, date) {

    if (!name || !name.trim()) {
        throw new Error("Enter a valid expense name");
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error("Enter a valid amount");
    }

    const expense = {
        id: Date.now() + Math.random(),
        name: name.trim(),
        amount: amount,
        category: category,
        date: date
    };

    return [...expenses, expense];
}


// Function to calculate total expenses
export function calculateTotal(expenses) {

    return expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );

}


// Function to delete an expense
export function deleteExpense(expenses, id) {

    return expenses.filter(
        expense => expense.id !== id
    );

}


// Function to edit an expense
export function updateExpense(expenses, id, updatedData) {

    if (!updatedData.name || !updatedData.name.trim()) {
        throw new Error("Enter a valid expense name");
    }

    if (!Number.isFinite(updatedData.amount) || updatedData.amount <= 0) {
        throw new Error("Enter a valid amount");
    }

    return expenses.map(expense => {

        if (expense.id === id) {

            return {
                ...expense,
                ...updatedData,
                name: updatedData.name.trim()
            };

        }

        return expense;

    });

}


// Function to calculate monthly expenses
export function getMonthlyTotal(expenses, month) {

    return expenses
        .filter(expense => expense.date.startsWith(month))
        .reduce((total, expense) => total + expense.amount, 0);

}


// Function to calculate category-wise expenses
export function getCategoryTotals(expenses) {

    return expenses.reduce((totals, expense) => {

        totals[expense.category] =
            (totals[expense.category] || 0) + expense.amount;

        return totals;

    }, {});

}
