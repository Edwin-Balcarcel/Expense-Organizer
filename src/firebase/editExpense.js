import { db } from "./firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const editExpense = async({id, selectedCategorie, description, finalAmount, date}) => {
    return await updateDoc(doc(db, 'expenses', id), {
        selectedCategorie,
        description,
        finalAmount: Number(finalAmount),
        date,
    });
}

export default editExpense;
