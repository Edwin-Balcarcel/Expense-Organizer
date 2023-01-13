import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot, query, where, orderBy} from "firebase/firestore";
import { endOfMonth, startOfMonth, getUnixTime } from "date-fns";
import { useAuth } from "../contexts/AuthContext";

const useGetExpensesPerMonth = () => {
    const [expenses, setExpenses] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
        const startMonth = getUnixTime(startOfMonth(new Date()));
        const endMonth = getUnixTime(endOfMonth(new Date()));

        if(user){
            const filterQuery = query(
                collection(db, 'expenses'),
                orderBy('date', 'desc'),
                where('idUser', '==', user.uid),
                where('date', '>=', startMonth),
                where('date', '<=', endMonth)
            );
            const unsubscribe = onSnapshot(filterQuery, (snapshot) => {
                setExpenses(snapshot.docs.map((document) => {
                    return {...document.data(), id: document.id}
                }))
            }, (error) => {console.log(error)})

            return unsubscribe;
        }

        
    }, [user])

    return expenses;
}

export default useGetExpensesPerMonth;