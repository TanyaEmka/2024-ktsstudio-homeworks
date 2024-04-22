import * as React from "react";
import './Header.scss';

import LogoBlock from "./components/LogoBlock";
import Menu from './components/Menu';
import RightBlock from "./components/RightBlock";

export const Header: React.FC = () => {

    return (
        <nav className="header">
            <div className="header-left">
                <LogoBlock />
                <Menu />
            </div>
            <div className="header-right">
                <RightBlock />
            </div>
        </nav>
    )
}

export default Header;