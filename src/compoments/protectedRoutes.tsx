import { Outlet } from "react-router-dom";
import Login from "./Login";
import  useStore  from "../appStore";
import {  useLogin } from "../api/authAPI";
   
  
const ProtectedRoutes=  () =>{
    const login = useLogin()
    const isLogged = useStore(state => state.isLogged);    
    return isLogged ? <Outlet/> : <Login />;
}

export default ProtectedRoutes;