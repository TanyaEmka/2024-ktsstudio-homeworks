import * as React from "react";
import './Main.scss';

import { Outlet } from "react-router-dom";
import Header from "components/Header";

export const Main: React.FC = () => {

    return (
        <div className="main">
            <Header />
            <Outlet />
        </div>
    )
}

export default Main;