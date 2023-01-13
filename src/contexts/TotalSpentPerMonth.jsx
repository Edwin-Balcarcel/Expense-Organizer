import { createContext, useContext, useState, useEffect } from "react";
import useGetExpensesPerMonth from "../hooks/useGetExpensesPerMonth";

const TotalSpentContext = createContext();

const useTotalSpent = () => {
    return useContext(TotalSpentContext);
};

const TotalSpentProvider = ({children}) => {

    const [total, setTotal] = useState(0);
    const expenses = useGetExpensesPerMonth();

    useEffect(() => {
        let count = 0;
        expenses.forEach(expense => {
            count += expense.finalAmount
        });
        setTotal(count)
    }, [expenses])

    return (
        <TotalSpentContext.Provider value={{total}}>  
            {children}
        </TotalSpentContext.Provider>
    )
}

export {
    TotalSpentProvider,
    useTotalSpent
}