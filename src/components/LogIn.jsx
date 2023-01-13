import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Header,
  Title,
  HeaderContainer,
  ButtonsContainer
} from "./../elements/Headers"
import Button from "../elements/Button";
import {
  Form,
  Input,
  ButtonContainer
} from "./../elements/FormElements"
import {ReactComponent as SvgLogIn} from "./../images/login.svg"
import styled from "styled-components";
import Alert from "../elements/Alert";
import {auth} from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});
  const [activeAlert, setActiveAlert] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regExp = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    if ([email, password].includes('')) {
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

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.log(error)
      switch(error.code){
        case 'auth/wrong-password':
            setActiveAlert(true)
            setAlert({
              type: 'error',
              message: 'Wrong password'
            })
          break;
        case 'auth/user-not-found':
            setActiveAlert(true)
            setAlert({
              type: 'error',
              message: 'User not found'
            })
          break;
        default:
            setActiveAlert(true)
            setAlert({
              type: 'error',
              message: 'There was an error trying to log in'
            })
        break;
      }
    }

  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Log In</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <HeaderContainer>
          <Title>Log In</Title>
          <ButtonsContainer>
            <Button to="/sign-up" pcd>Sign Up</Button>
          </ButtonsContainer>
        </HeaderContainer>
      </Header>
      <Form onSubmit={handleSubmit}>
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
        <ButtonContainer>
          <Button as="button" primary type="submit" className="moveUp mt">Log In</Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button to="/sign-up" celt>Sign Up</Button>
        </ButtonContainer>
      </Form>
      <Alert type={alert.type} message={alert.message} activeAlert={activeAlert} setActiveAlert={setActiveAlert}/>
    </>
  )
}

const Svg = styled(SvgLogIn)`
  width: 100%;
  max-height: 12rem;
  margin-bottom: 1.25rem;
`;


export default LogIn