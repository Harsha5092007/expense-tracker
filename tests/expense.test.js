
import test, { describe } from "node:test";
import assert from "node:assert/strict";

import {
    addExpense,
    calculateTotal,
    deleteExpense,
    updateExpense,
    getMonthlyTotal,
    getCategoryTotals
} from "../expense.js";


// TEST 1: Adding an expense
describe("Expense Tracker Unit Tests", () => {

    test("Should add a new expense", () => {

        const expenses = [];

        const result = addExpense(
            expenses,
            "Food",
            100,
            "Food",
            "2026-11-10"
        );

        assert.equal(result.length, 1);
        assert.equal(result[0].name, "Food");
        assert.equal(result[0].amount, 100);

    });


    // TEST 2: Calculate total expenses
    test("Should calculate total expenses correctly", () => {

        const expenses = [
            { name: "Food", amount: 100 },
            { name: "Travel", amount: 50 },
            { name: "Shopping", amount: 200 }
        ];

        const total = calculateTotal(expenses);

        assert.equal(total, 350);

    });


    // TEST 3: Delete an expense
    test("Should delete an expense", () => {

        const expenses = [
            { id: 1, name: "Food", amount: 100 },
            { id: 2, name: "Travel", amount: 50 }
        ];

        const result = deleteExpense(expenses, 1);

        assert.equal(result.length, 1);
        assert.equal(result[0].name, "Travel");

    });


    // TEST 4: Update an expense
    test("Should update an existing expense", () => {

        const expenses = [
            {
                id: 1,
                name: "Food",
                amount: 100,
                category: "Food",
                date: "2026-11-10"
            }
        ];

        const result = updateExpense(
            expenses,
            1,
            {
                name: "Lunch",
                amount: 150,
                category: "Food",
                date: "2026-11-10"
            }
        );

        assert.equal(result[0].name, "Lunch");
        assert.equal(result[0].amount, 150);

    });


    // TEST 5: Validate expense amount
    test("Should reject a negative expense amount", () => {

        const expenses = [];

        assert.throws(() => {

            addExpense(
                expenses,
                "Food",
                -100,
                "Food",
                "2026-11-10"
            );

        }, /valid amount/);

    });


    // TEST 6: Validate expense name
    test("Should reject an empty expense name", () => {

        const expenses = [];

        assert.throws(() => {

            addExpense(
                expenses,
                "",
                100,
                "Food",
                "2026-11-10"
            );

        }, /valid expense name/);

    });


    // TEST 7: Calculate monthly expenses
    test("Should calculate monthly expenses", () => {

        const expenses = [
            { amount: 100, date: "2026-11-01" },
            { amount: 200, date: "2026-11-10" },
            { amount: 300, date: "2026-10-15" }
        ];

        const result = getMonthlyTotal(
            expenses,
            "2026-11"
        );

        assert.equal(result, 300);

    });


    // TEST 8: Calculate category-wise expenses
    test("Should calculate category totals", () => {

        const expenses = [
            { category: "Food", amount: 100 },
            { category: "Food", amount: 200 },
            { category: "Travel", amount: 50 }
        ];

        const result = getCategoryTotals(expenses);

        assert.deepEqual(result, {
            Food: 300,
            Travel: 50
        });

    });

});
