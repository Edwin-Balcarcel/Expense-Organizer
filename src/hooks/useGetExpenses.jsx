import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot, query, orderBy, where, limit, startAfter } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

const useGetExpenses = () => {

    const {user} = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [lastExpense, setLastExpense] = useState(null);
    const [moreExpenses, setMoreExpenses] = useState(false);

    const getMoreExpenses = () => {
		const expensesQuery = query(
			collection(db, 'expenses'),
			where('idUser', '==', user.uid),
			orderBy('date', 'desc'),
			limit(10),
			startAfter(lastExpense)
		);

		onSnapshot(expensesQuery, (snapshot) => {
			if(snapshot.docs.length > 0){
				setLastExpense(snapshot.docs[snapshot.docs.length -1]);

				setExpenses(expenses.concat(snapshot.docs.map((expense) => {
					return {...expense.data(), id: expense.id}
				})))
			} else {
				setMoreExpenses(false);
			}
		}, error => {console.log(error)});
	}

    useEffect(() => {
        const filterQuery = query(
            collection(db, 'expenses'),
            where('idUser', '==', user.uid),
            orderBy('date', 'desc'),
            limit(10)
        );

        const unsubscribe = onSnapshot(filterQuery, (snapshot) => {
            if (snapshot.docs.length > 0) {
                setLastExpense(snapshot.docs[snapshot.docs.length -1]);
                setMoreExpenses(true);
            }

            setExpenses(snapshot.docs.map((expense) => {
                return {...expense.data(), id:expense.id}
            }))
        })

        return unsubscribe;
         
    }, [user]);

  return [expenses, getMoreExpenses, moreExpenses];
} 
 
export default useGetExpenses;