import * as React from "react";

import LogoBlock from "./components/LogoBlock";
import Menu from './components/Menu';
import RightBlock from "./components/RightBlock";
import styles from './Header.module.scss';
import custom from 'styles/customStyles.module.scss';
import classNames from "classnames";

export const Header: React.FC = () => {
    return (
        <nav 
            className={classNames({
                [styles["header"]]: true,
                [custom["padding_hor"]]: true,
            })
            }
        >
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