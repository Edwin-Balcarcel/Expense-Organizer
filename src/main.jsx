import React from 'react'
import ReactDOM from 'react-dom/client'
import WebFont from 'webfontloader'
import App from './App'
import './index.css'
import Container from './elements/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditExpense from './components/EditExpense';
import ExpensesByCategory from './components/ExpensesByCategory';
import ExpenseList from './components/ExpenseList';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Background from './elements/Background';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { TotalSpentProvider } from './contexts/TotalSpentPerMonth';

WebFont.load({
  google:{
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
})

const Main = () => {
  return(
    <>
      <AuthProvider>
        <TotalSpentProvider>
          <BrowserRouter>
            <Container>
              <Routes>
                <Route path='/log-in' element={<LogIn/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/categories' element={
                  <PrivateRoute >
                    <ExpensesByCategory/>
                  </PrivateRoute>
                }/>
                <Route path='/expense-list' element={
                  <PrivateRoute >
                    <ExpenseList/>
                  </PrivateRoute>
                }/>
                <Route path='/edit/:id' element={
                  <PrivateRoute >
                    <EditExpense/>
                  </PrivateRoute>
                }/>
                <Route path='/' element={
                  <PrivateRoute >
                    <App/>
                  </PrivateRoute>
                }/>
              </Routes>
            </Container>
          </BrowserRouter>
        </TotalSpentProvider>
      </AuthProvider>
      <Background/>
    </> 
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
)
