import { useEffect, useState } from "react";
import useGetExpensesPerMonth from "./useGetExpensesPerMonth";

const useGetExpensesPerMonthByCategory = () => {
    const [expensesByCategory, setExpensesByCategory] = useState([]);
    const expenses = useGetExpensesPerMonth();

    useEffect(() => {
        const accExpenses = expenses.reduce((acc, currentValue) => {
            const currentCategory = currentValue.selectedCategorie;
            const currentAmount = currentValue.finalAmount;
    
            acc[currentCategory] += currentAmount;
    
            return acc;
    
        }, {
            'Food': 0,
            'Bills': 0,
            'Home': 0,
            'Transport': 0,
            'Clothes': 0,
            'Personal Care': 0,
            'Purchases': 0, 
            'Entertainment': 0
        });
    
        setExpensesByCategory(Object.keys(accExpenses).map(element => {
            return {selectedCategorie: element, finalAmount: accExpenses[element]}
        }));
        
    }, [expenses, setExpensesByCategory])

    return expensesByCategory;
}

export default useGetExpensesPerMonthByCategory;


