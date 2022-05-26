import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbInstance";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[])
  return (
    <div className="App">
      {init?<AppRouter userObj={userObj} isLoggedIn={isLoggedIn}/>:<h1>Initializing..</h1>}
    </div>
  );
}

export default App;
