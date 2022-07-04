// import './App.css';
import React from "react";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Master from "./layout/Master/Master";



function App() {
  // useEffect(() => {
  //   // const t = localStorage.getItem("isLoggedIn");
  //   const tokenValue = localStorage.getItem("token");
  //   // const userStorageValue = localStorage.getItem("user");
  //   // t && JSON.parse(t) ? setIsLoggedIn(true) : setIsLoggedIn(false);
  //   // t && JSON.parse(t) ? setToken(tValue) : setToken("");
  //   // t && JSON.parse(t) ? setUserInfo(userStorageValue) : setUserInfo({});
  //   // console.log("token --", token ); 
  // }, []);
  // const [darkTheme, setDarkTheme] = useState(tokenValue);
  return (
    <>
    

        <div className="bg-white h-full">


          <Master />

        </div >
      
    </>

  );
}

export default App;
