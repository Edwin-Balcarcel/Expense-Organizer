import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';

const AuthContext = createContext();

    //Hook to use AuthContext more easy on each component
    const useAuth = () => {
        return useContext(AuthContext);
    }

const AuthProvider = ({children}) => {

    const [user, setUser] = useState();
    
    const [loading, setLoading] = useState(true);
    
    //effect to run login check once
    useEffect(() => {
        const cancelSubscription = onAuthStateChanged(auth, (user) => { 
            setUser(user);
            setLoading(false);
        })

        return cancelSubscription;
    }, [])

  return (
    <AuthContext.Provider value={{user}}>
        {!loading && children}
    </AuthContext.Provider>
  );
}

export{
    AuthProvider,
    AuthContext,
    useAuth
};