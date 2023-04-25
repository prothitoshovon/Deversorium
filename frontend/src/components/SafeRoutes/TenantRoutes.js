import { Outlet } from "react-router-dom"
import Login from "../Login/Login"
import Register from "../Register/Register"
import BadGateway from "./BadGateway";

const TenantRoutes = ()=>{
    const user = JSON.parse(localStorage.getItem('profile'));
    return user?.result?.role === 1 ?<Outlet/>:<BadGateway/>
}
export default TenantRoutes