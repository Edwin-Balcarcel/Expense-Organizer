import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Header,
  Title
} from "./../elements/Headers";
import ReturnButton from "../elements/ReturnButton";
import TotalExpenseBar from "./TotalExpenseBar";
import ExpenseForm from "./ExpenseForm";
import { useParams } from "react-router-dom";
import useGetExpense from "../hooks/useGetExpense";

const EditExpense = () => {

  const {id} = useParams();
  const [expense] = useGetExpense(id);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Edit Expense</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <ReturnButton route="/expense-list"/>
        <Title>Edit Expense</Title>
      </Header>
      <ExpenseForm expense={expense}/>
      <TotalExpenseBar/>
    </>
  )
}

export default EditExpense
