import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Header,
  Title
} from "./../elements/Headers";
import ReturnButton from "../elements/ReturnButton";
import TotalExpenseBar from "./TotalExpenseBar";
import useGetExpensesPerMonthByCategory from "../hooks/useGetExpensesPerMonthByCategory";
import { CategoriesList, ElementCategoriesList, Category, Value } from "../elements/ListElements"
import CategoryIcon from "../elements/CategoryIcon";
import formatAmount from "../functions/convertToCurrency";

const ExpensesByCategory = () => {
  const expensesByCategory = useGetExpensesPerMonthByCategory();

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Expenses by Category</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <ReturnButton />
        <Title>Expenses by Category</Title>
      </Header>
      <CategoriesList>
        {
          expensesByCategory.map((element, index) => {
            return (
              <ElementCategoriesList key={index}>
                <Category>
                  <CategoryIcon id={element.selectedCategorie}/>
                  {element.selectedCategorie}
                </Category>
                <Value>{formatAmount(element.finalAmount)}</Value>
              </ElementCategoriesList>
            )
          })
        }
      </CategoriesList>
      <TotalExpenseBar/>
    </>
  )
}

export default ExpensesByCategory
