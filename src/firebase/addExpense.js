import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const addExpense = ({selectedCategorie, description, finalAmount, date, idUser}) => {
    return addDoc(collection(db, 'expenses'), {
        selectedCategorie,
        description,
        finalAmount: Number(finalAmount),
        date,
        idUser
    });
}

export default addExpense;

