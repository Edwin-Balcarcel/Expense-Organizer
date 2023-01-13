import { useState, useEffect } from "react";
import {    
    FilterContainer,
    Form,
    Input,
    BigInput,
    ButtonContainer} from '../elements/FormElements';
import Button from "../elements/Button";
import {ReactComponent as PlusIcon} from "./../images/plus.svg"
import SelectCategories from "./SelectCategories";
import DatePicker from "./DatePicker";
import fromUnixTime from "date-fns/fromUnixTime";
import getUnixTime from "date-fns/getUnixTime";
import { format } from 'date-fns';
import addExpense from "../firebase/addExpense";
import { useAuth } from "../contexts/AuthContext";
import Alert from "../elements/Alert";
import { useNavigate } from "react-router-dom";
import editExpense from "../firebase/editExpense";

const ExpenseForm = ({expense}) => {

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState(Date.now());
    const [selectedCategorie, setSelectedCategorie] = useState('Home');

    const [alert, setAlert] = useState({})
    const [activeAlert, setActiveAlert] = useState(false);

    const {user} = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (expense) {
            if(expense.data().idUser === user.uid){
                setDescription(expense.data().description);
                setAmount(expense.data().finalAmount);
                setSelectedDate(fromUnixTime(expense.data().date));
                setSelectedCategorie(expense.data().selectedCategorie);
            }else{
                navigate('/expense-list');
            }
        }
    }, [expense, user, navigate])

    let inputText = "Please pick a day";
    if (selectedDate) {
        inputText = `${format(selectedDate, 'PPP')}`
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let finalAmount = parseFloat(amount).toFixed(2);
        let date = getUnixTime(selectedDate);
        let idUser = user.uid;

        if (description !== '' && amount !== '' && inputText !== "Please pick a day") {
            if (expense) {
                try {
                    editExpense({
                        id: expense.id,
                        selectedCategorie,
                        description,
                        finalAmount,
                        date,
                    })
                    navigate('/expense-list');
                } catch (error) {
                    console.log(error)
                }
            }else{
                try {
                    await addExpense({
                        selectedCategorie,
                        description,
                        finalAmount,
                        date,
                        idUser
                    });
                    setActiveAlert(true);
                    setAlert({
                        type: 'success',
                        message: 'The expense was added'
                    })
                    setDescription('');
                    setAmount('');
                    setSelectedCategorie('Home');
                    setSelectedDate(Date.now());
                } catch (error) {
                    setActiveAlert(true);
                    setAlert({
                        type: 'error',
                        message: 'There was an error'
                    })
                }
            }
            
        }else{
            setActiveAlert(true);
            setAlert({
                type: 'error',
                message: 'All fields are required'
            })
        } 
    }

  return (
    <>
        <Form onSubmit={handleSubmit}>
            <FilterContainer>
                <SelectCategories selectedCategorie={selectedCategorie} setSelectedCategorie={setSelectedCategorie}/>
                <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} inputText={inputText}/>
            </FilterContainer>
            <div>
                <Input
                    type='text'
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <BigInput
                    type="text"
                    placeholder="$0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                />
            </div>
            <ButtonContainer>
                <Button as="button" type="submit" primary icon>
                    {expense ? 'Edit Expense' : 'Add Expense'} <PlusIcon/>
                </Button>
            </ButtonContainer>
        </Form>
        <Alert type={alert.type} message={alert.message} activeAlert={activeAlert} setActiveAlert={setActiveAlert} />
    </>
    
  )
}

export default ExpenseForm