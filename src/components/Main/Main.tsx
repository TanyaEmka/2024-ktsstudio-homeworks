import React from "react";
import './Main.scss';

import Header from "components/Header";
import { Outlet } from "react-router-dom";

export const Main: React.FC = () => {

    return (
        <div className="main">
            <Header />
            <Outlet />
        </div>
    )
}

export default Main;