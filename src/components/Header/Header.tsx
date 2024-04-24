import * as React from "react";
import styles from './Header.module.scss';

import LogoBlock from "./components/LogoBlock";
import Menu from './components/Menu';
import RightBlock from "./components/RightBlock";

export const Header: React.FC = () => {

    return (
        <nav className={styles["header"]}>
            <div className={styles["header__left"]}>
                <LogoBlock />
                <Menu />
            </div>
            <div className={styles["header__right"]}>
                <RightBlock />
            </div>
        </nav>
    )
}

export default Header;