import * as React from "react";
import { useState, useEffect } from "react";

import Input from "components/Input";
import Text from "components/Text";
import Button from "components/Button";

import userStore from "store/UserStore";
import { LoginRequestType } from "store/UserStore/UserStore";
import { useNavigate } from "react-router-dom";

const initRequestValue: LoginRequestType = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
}

const Login: React.FC = () => {

    const [ user, setUser ] = useState(initRequestValue);
    const { login, status, userStatus } = userStore;
    const navigate = useNavigate();

    useEffect(() => {
        if (userStatus === 'auth') {
            navigate('/user');
        }
    }, [userStatus]);

    return (
        <div className="login-page">
            <Text view='title' tag='div'>Login</Text>
            <div className="login-page-form">
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
                    login(user);
                }}>
                    login
                </Button>
                {status.statusName === 'ERROR' &&
                <Text color='accent' view='p-16' tag='div'>
                    {status.statusMessage}
                </Text>
                }
            </div>
        </div>
    )
}

export default Login;