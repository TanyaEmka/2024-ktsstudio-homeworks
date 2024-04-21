import React from "react";
import './Header.scss';

import LogoBlock from "./LogoBlock/LogoBlock";
import RightBlock from "./RightBlock/RightBlock";
import Menu from './Menu/Menu';

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