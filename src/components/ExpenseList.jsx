import { Helmet, HelmetProvider } from "react-helmet-async";
import ReturnButton from "../elements/ReturnButton";
import {
  Header,
  Title
} from "../elements/Headers"
import TotalExpenseBar from "./TotalExpenseBar";
import useGetExpenses from "../hooks/useGetExpenses";
import {
    List,
    ListElement,
    Category,
    Description,
    Value,
    Date,
    ButtonsContainer,
    ActionButton,
    LoadMoreButton,
    CentralButtonContainer,
    SubtitleContainer,
    Subtitle
} from "../elements/ListElements";
import CategoryIcon from "../elements/CategoryIcon";
import formatAmount from "../functions/convertToCurrency";
import { ReactComponent as EditIcon } from "../images/editar.svg";
import { ReactComponent as DeleteIcon } from "../images/borrar.svg";
import { Link } from "react-router-dom";
import Button from "../elements/Button";
import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";
import deleteExpense from "../firebase/deleteExpense";

const ExpenseList = () => {

  const [expenses, getMoreExpenses, moreExpenses] = useGetExpenses();

  const dateFormatter = (date) => {
    return format(fromUnixTime(date), "PPP");
  } 

  const dateOrganizer = (expenses, index, expense) => {
    if (index !== 0) {
      const actualDate = dateFormatter(expense.date);
      const lastDate = dateFormatter(expenses[index-1].date);

      if (actualDate === lastDate) {
        return true;
      }else{
        return false;
      }
    }
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Expense List</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <ReturnButton />
        <Title>Expense list</Title>
      </Header>

      <List>
        {expenses.length === 0 &&
          <SubtitleContainer>
            <Subtitle>There are no expenses to show</Subtitle>
            <Button as={Link} to="/">Add Expense</Button> 
          </SubtitleContainer>
        }
        {expenses.map((expense, index) => {
          return(
            <div key={expense.id}>
              {!dateOrganizer(expenses, index, expense) &&
                <Date >{dateFormatter(expense.date)}</Date>
              }
              <ListElement key={expense.id}>
                <Category>
                  <CategoryIcon id={expense.selectedCategorie}/>
                  {expense.selectedCategorie}
                </Category>
                <Description>
                  {expense.description}
                </Description>
                <Value>
                  {formatAmount(expense.finalAmount)}
                </Value>
                <ButtonsContainer>
                  <ActionButton as={Link} to={`/edit/${expense.id}`}><EditIcon/></ActionButton>
                  <ActionButton onClick={() => deleteExpense(expense.id)}><DeleteIcon/></ActionButton>
                </ButtonsContainer>
              </ListElement>
            </div>
          )
        })}
        {moreExpenses && expenses.length > 9 ?
          <CentralButtonContainer>
            <LoadMoreButton onClick={() => getMoreExpenses()}>Show More</LoadMoreButton>
          </CentralButtonContainer>
          :
          <div></div>
        }
      </List>

      <TotalExpenseBar/>
  </>
  )
}

export default ExpenseList
