import { Outlet } from "react-router-dom"
import "./css/BaseSuperior.css"
import HeaderMenu from "./HeaderMenu"

const BaseSuperior = () =>  {
    

    return (
        <div id="app-content-up">
            <HeaderMenu />
            <div id="app-content-bt">
                <Outlet />
            </div>
        </div>
    )
}

export default BaseSuperior;