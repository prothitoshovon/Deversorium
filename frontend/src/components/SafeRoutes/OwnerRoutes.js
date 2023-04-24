import { Outlet } from "react-router-dom"
import Login from "../Login/Login"
import Register from "../Register/Register"
import BadGateway from "./BadGateway";

const OwnerRoutes = ()=>{
    const user = JSON.parse(localStorage.getItem('profile'));
    return user?.result?.role === 2 ?<Outlet/>:<BadGateway/>
}
export default OwnerRoutes