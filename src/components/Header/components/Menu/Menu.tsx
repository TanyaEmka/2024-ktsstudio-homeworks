import classNames from "classnames";
import * as React from "react";
import { useEffect, useState } from "react";

import { useNavigate , useLocation } from "react-router-dom";

import Text from "components/Text";
import paths from "config/paths";
import userStore from "store/UserStore";
import styles from './Menu.module.scss';

const Menu: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [selectedUrl, setUrl] = useState(0);
    const { userStatus } = userStore;

    useEffect(() => {
        const index = paths.map((path) => path.url).indexOf(location.pathname);
        setUrl(index);
    }, [location.pathname]);

    const goToPath = (index: number, url: string, authRequired: boolean = false) => {
        if (!authRequired || userStatus === 'auth') {
            setUrl(index);
            navigate(url);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className={styles["menu"]}>
            {paths.map((path, index) => {
                const handleClick = () => { 
                    goToPath(index, path.url, path.authRequired); 
                }

                return (
                    <Text
                        key={path.name}
                        className={classNames({
                            [styles['menu__option']]: true,
                            [styles['menu__option_selected']]: selectedUrl === index,
                        })}
                        view='p-16' tag='div'
                        onCLick={handleClick}
                    >
                        {path.name}
                    </Text>
                )
            })}
        </div>
    )
}

export default Menu;