import classNames from "classnames";
import * as React from "react";
import { useEffect, useState, useRef } from "react";

import { useNavigate , useLocation } from "react-router-dom";

import Text from "components/Text";
import ArrowDownIcon from "components/icons/ArrowDownIcon";
import paths from "config/paths";
import userStore from "store/UserStore";
import styles from './Menu.module.scss';
import custom from 'styles/customStyles.module.scss';

import { observer } from "mobx-react-lite";

const Menu: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [ selectedUrl, setUrl ] = useState(0);
    const [ visible, setVisible ] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
        if (
            ref.current && 
            !ref.current.contains(e.target as Node) &&
            (e.target as Element).id !== "small-button" &&
            (e.target as Element).id !== "small-button-text" &&
            (e.target as Element).id !== "small-button-svg"
        ) {
            setVisible(false);
        }
    }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    useEffect(() => {
        const index = paths.map((path) => path.url).indexOf(location.pathname);
        setUrl(index);
    }, [location.pathname]);

    const goToPath = (index: number, url: string, authRequired: boolean = false) => {
        if (!authRequired || userStore.userStatus === 'auth') {
            setUrl(index);
            navigate(url);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className={styles["menu"]}>
            <div className={styles["menu_small"]}>
                <div 
                    className={styles["menu_small__button"]}
                    id="small-button"
                    onClick={() => { setVisible(!visible) }}
                >
                    <Text 
                        tag='div' className={[custom["text-responsive"], styles["menu_small__button__text"]].join(' ')}
                        id="small-button-text"
                    >
                        Menu
                    </Text>
                    <ArrowDownIcon color='secondary' id="small-button-svg" />
                </div>
                {visible &&
                <div className={styles["menu_small__items"]} ref={ref}>
                    {paths.map((path, index) => {
                        const handleClick = () => { 
                            goToPath(index, path.url, path.authRequired); 
                            setVisible(false);
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
                }
            </div>

            <div className={styles["menu_big"]}>
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
        </div>
    )
}

export default observer(Menu);