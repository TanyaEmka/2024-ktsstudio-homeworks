import * as React from "react";
import { useState, useEffect } from "react";

import Input from "components/Input";
import Text from "components/Text";
import Button from "components/Button";

import userStore from "store/UserStore";
import { LoginRequestType } from "store/UserStore/UserStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import styles from './Login.module.scss';

const initRequestValue: LoginRequestType = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
}

const Login: React.FC = () => {

    const [ user, setUser ] = useState(initRequestValue);
    const navigate = useNavigate();

    useEffect(() => {
        if (userStore.userStatus === 'auth') {
            navigate('/user');
        }
    }, [userStore.userStatus]);

    return (
        <div className={styles["login-page"]}>
            <Text view='title' tag='div'>Login</Text>
            <div className={styles["login-page__form"]}>
                {Object.entries(user).map(([key, value]) => {
                    
                    return (
                        <Input 
                            key={key}
                            value={value}
                            placeholder={key}
                            onChange={(newValue) => {
                                user[key as keyof LoginRequestType] = newValue;
                                setUser({ ...user });
                            }}
                        />
                    )
                })}
                <Button onClick={() => {
                    userStore.login(user);
                }}>
                    login
                </Button>
                {userStore.status.statusName === 'ERROR' &&
                <Text color='accent' view='p-16' tag='div'>
                    {userStore.status.statusMessage}
                </Text>
                }
            </div>
        </div>
    )
}

export default observer(Login);