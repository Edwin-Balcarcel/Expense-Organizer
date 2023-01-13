import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Header,
  Title,
  HeaderContainer,
  ButtonsContainer
} from "./elements/Headers";
import Button from "./elements/Button";
import LogOutButton from "./components/LogOutButton";
import ExpenseForm from "./components/ExpenseForm";
import TotalExpenseBar from "./components/TotalExpenseBar";
import { ReactComponent as DownIcon} from "./images/down.svg";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';

function App() {

  const [showMenu, setShowMenu] = useState(false);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Add Expense</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <HeaderContainer>
          <Title>Add Expense</Title>
        </HeaderContainer>
        <ButtonsContainer>
          <Button as="button" menu={"true"} onClick={() => setShowMenu(!showMenu)}><DownIcon/></Button>
        </ButtonsContainer>
          {
            isDesktopOrLaptop &&
            <ButtonsContainer>
            <Button to="/expense-list" morespace="true">Expense List</Button>
            <Button to="/categories">Categories</Button>
            <LogOutButton />
          </ButtonsContainer>
          }   
      </Header>
      {showMenu &&
        <ButtonsContainer>
          <Button to="/expense-list" morespace="true" menu={"true"}>Expense List</Button>
          <Button to="/categories" menu={"true"}>Categories</Button>
          <LogOutButton menu={"true"}/>
        </ButtonsContainer>
      }
      <ExpenseForm /> 
      <TotalExpenseBar/>
    </>
  )
}

export default App;