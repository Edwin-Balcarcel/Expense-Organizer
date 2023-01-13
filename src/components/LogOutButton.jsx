import {ReactComponent as SvgLogOut} from "./../images/log-out.svg"
import Button from "../elements/Button";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {

    const navigate = useNavigate();

    const logOut = async () => {

        try {
            await signOut(auth);  
            navigate('/log-in');
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <Button bigIcon as="button" onClick={logOut}>
        <SvgLogOut/>
    </Button>
  )
}

export default LogOutButton;