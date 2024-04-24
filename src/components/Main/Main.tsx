import * as React from "react";
import styles from './Main.module.scss';

import { Outlet } from "react-router-dom";
import Header from "components/Header";

export const Main: React.FC = () => {

    return (
        <div className={styles.main}>
            <Header />
            <Outlet />
        </div>
    )
}

export default Main;