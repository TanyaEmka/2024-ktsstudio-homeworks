import { observer } from "mobx-react-lite";
import * as React from "react";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import Input from "components/Input";
import Text from "components/Text";

import userStore from "store/UserStore";
import { LoginRequestType } from "store/UserStore/UserStore";

import styles from './Login.module.scss';
import custom from 'styles/customStyles.module.scss';
import classNames from "classnames";
import { NotStartedStatus } from "config/initValues";

const initRequestValue: LoginRequestType = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
}

const Login: React.FC = () => {

    const [ user, setUser ] = useState(initRequestValue);
    const [ errorStatuses, setStatuses ] = useState<Array<boolean>>(
        Array(Object.keys(user).length).fill(false)
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (userStore.userStatus === 'auth') {
            navigate('/user');
        }
    }, [navigate, userStore.userStatus]);

    const login = () => {
        let loginApproving = true;
        Object.keys(user).forEach((key, index) => {
            if (key in user) {
                if (user[key as keyof LoginRequestType] === '') {
                    errorStatuses[index] = true;
                    loginApproving = false;
                }
            }
        });
        setStatuses([ ...errorStatuses ]);
        if (loginApproving) {
            userStore.login(user);
        }
    }

    return (
        <div 
            className={classNames({
                [styles["login-page"]]: true,
            })}
        >
            <Text view='title' tag='div'>
                Login
            </Text>
            <div className={styles["login-page__form"]}>
                {Object.entries(user).map(([key, value], index) => {
                    
                    return (
                        <Input 
                            key={key}
                            value={value}
                            placeholder={key}
                            onChange={(newValue) => {
                                user[key as keyof LoginRequestType] = newValue;
                                if (errorStatuses[index]) {
                                    errorStatuses[index] = false;
                                    setStatuses([ ...errorStatuses ]);
                                }
                                if (userStore.status.statusName === 'ERROR') {
                                    userStore.setStatus(NotStartedStatus);
                                }
                                setUser({ ...user });
                            }}
                            valueError={errorStatuses[index]}
                        />
                    )
                })}
                {userStore.status.statusName === 'ERROR' &&
                <Text 
                    className={styles["login-page__form__error"]}
                    color='accent' view='p-16' tag='div'
                >
                    {userStore.status.statusMessage}
                </Text>
                }
                <Button onClick={login}>
                    login
                </Button>
            </div>
        </div>
    )
}

export default observer(Login);