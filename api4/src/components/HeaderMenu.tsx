import { Link } from 'react-router-dom';
import "./css/HeaderMenu.css"

export default function HeaderMenu() {

    return(
        <div className="headermenu">
            <div className="container">
                <Link to="/home">
                    <img src='https://tecsus.com.br/wp-content/uploads/2020/10/logo_tecsus_horizontal.png' alt=''/>
                </Link>
                <div className="links">
                    <Link to="/login">Entrar</Link>
                </div>
            </div>
        </div>
    )
}