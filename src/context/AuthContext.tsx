import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthProps{
  children: ReactNode;
}

//study typescript type지정 
const AuthContext = createContext({
  user: null as User | null,
});

export const AuthcontextProvider = ({children}: AuthProps) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, [auth]);

  return( 
    <AuthContext.Provider value={{user: currentUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;