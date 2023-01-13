import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const useGetExpense = (id) => {
    const [expense, setExpense] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getExpense = async() => {
            const document = await getDoc(doc(db, 'expenses', id));
            if (document.exists) {
                setExpense(document)
            }else{
                navigate('/expense-list')
            }
        }
        getExpense();
    }, [navigate, id])

    return [expense];
}

export default useGetExpense;