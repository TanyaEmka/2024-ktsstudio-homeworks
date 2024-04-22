import * as React from "react";
import './Header.scss';

import LogoBlock from "./LogoBlock/LogoBlock";
import Menu from './Menu/Menu';
import RightBlock from "./RightBlock/RightBlock";

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