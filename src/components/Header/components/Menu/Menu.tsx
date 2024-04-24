import * as React from "react";
import { useEffect, useState } from "react";
import styles from './Menu.module.scss';

import { useNavigate , useLocation } from "react-router-dom";

import Text from "components/Text";
import paths from "../../../../config/paths";
import classNames from "classnames";

const Menu: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [selectedUrl, setUrl] = useState(0);

    useEffect(() => {
        const index = paths.map((path) => path.url).indexOf(location.pathname);
        setUrl((index === -1 ? 0 : index));
    }, [location.pathname]);

    return (
        <div className={styles["menu"]}>
            {paths.map((path, index) => {
                return (
                    <Text
                        key={path.name}
                        className={classNames({
                            [styles['menu__option']]: true,
                            [styles['menu__option_selected']]: selectedUrl === index,
                        })}
                        view='p-16'
                        tag='div'
                        onCLick={() => { setUrl(index); navigate(path.url); }}
                    >
                        {path.name}
                    </Text>
                )
            })}
        </div>
    )
}

export default Menu;