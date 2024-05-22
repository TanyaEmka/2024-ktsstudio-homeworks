import * as React from "react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "components/Header";
import urlStore from "store/UrlStore";
import searchStore from "store/SearchParamsStore";
import styles from './Main.module.scss';

import { observer } from "mobx-react-lite";

export const Main: React.FC = () => {

    const location = useLocation();

    useEffect(() => {
        urlStore.setCurrentUrl(location.pathname + location.search);
    }, [ location ]);

    useEffect(() => {
        searchStore.clear();
    }, [ location.pathname ]);

    return (
        <div className={styles.main}>
            <Header />
            <Outlet />
        </div>
    )
}

export default observer(Main);