import React, { useEffect, useState } from 'react';
import './App.css';
import Router from './components/Router';
import { app } from 'firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loader from 'components/Loader';


function App() {
  const auth = getAuth(app);

  // auth를 체크하기 전에 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);

  // auth에 currentUserrk 있다면 isAuth true
  const [isAuth, setIsAuth] = useState<boolean>(!!auth?.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <ToastContainer />
      {init ? <Router isAuth={isAuth} /> : <Loader />}
    </>
  );
}

export default App;
