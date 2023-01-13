import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Header,
  Title,
  HeaderContainer,
  ButtonsContainer
} from "../elements/Headers"
import Button from "../elements/Button";
import {
  Form,
  Input,
  ButtonContainer
} from "../elements/FormElements"
import {ReactComponent as SvgSignIn} from "./../images/sign-in.svg"
import styled from "styled-components";
import {auth} from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword } from "firebase/auth";
import Alert from "../elements/Alert";

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState({});
  const [activeAlert, setActiveAlert] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>{
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;
      
        case 'password':
          setPassword(e.target.value);
          break;

      case 'confirmPassword':
        setConfirmPassword(e.target.value);
        break;

      default:
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regExp = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    if ([email, password, confirmPassword].includes('')) {
      setActiveAlert(true)
      setAlert({
        type: 'error',
        message: 'All fields are required'
      })
      return;
    }

    if (!regExp.test(email)) {
      setActiveAlert(true)
      setAlert({
        type: 'error',
        message: 'Enter a valid email'
      })
      return;
    }

    if (password !== confirmPassword) {
      setActiveAlert(true)
      setAlert({
        type: 'error',
        message: 'The passwords are not the same'
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      switch(error.code){
        case 'auth/weak-password':
            setActiveAlert(true)
            setAlert({
              type: 'error',
              message: 'The password has to be at least 6 characters'
            })
            break;
        case 'auth/email-already-in-use':
            setActiveAlert(true)
            setAlert({
              type: 'error',
              message: 'An account already exists with the provided email'
            })
        break;
        case 'auth/invalid-email':
            setActiveAlert(true)
            setAlert({
              type: 'error',
              message: 'The email is invalid'
            })
        break;
        default:
            setActiveAlert(true)
            setAlert({
              type: 'error',
              message: 'There was an error trying to create the account'
            })
        break;
      }
    }

  }


  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Create Account</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <HeaderContainer>
          <Title>Create Account</Title>
          <ButtonsContainer>
            <Button to="/log-in" pcd>Log In</Button>
          </ButtonsContainer>
        </HeaderContainer>
      </Header>
      <Form
        onSubmit={handleSubmit}
      >
        <Svg/>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleChange}
        />
        <ButtonContainer>
          <Button as="button" primary type="submit">Create Account</Button>
        </ButtonContainer>
        <ButtonsContainer>
          <Button to="/log-in" celt className="mt">Log In</Button>
        </ButtonsContainer>
      </Form>
      <Alert type={alert.type} message={alert.message} activeAlert={activeAlert} setActiveAlert={setActiveAlert}/>
    </>
  )
}

const Svg = styled(SvgSignIn)`
  width: 100%;
  max-height: 6.25rem;
  margin-bottom: 1.25rem;
`;

export default SignUp
