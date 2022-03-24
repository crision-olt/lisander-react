import React from 'react';
import {Link} from "react-router-dom";
import Error404Image from "../../assets/png/error-404.png";
import Logo from "../../assets/png/atlas-white.png";

export default function Error404() {
    return (
        <div className="error404">
            <img src={Logo} alt="Lisander"/>
            <img src={Error404Image} alt="Error404"/>
            <Link to="/">Volver al inicio</Link>
        </div>
    )
}
