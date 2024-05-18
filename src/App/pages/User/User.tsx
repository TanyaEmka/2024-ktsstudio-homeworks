import * as React from "react";
import { useEffect } from "react";
import userStore from "store/UserStore";
import { useNavigate } from "react-router-dom";

import Text from "components/Text";
import Button from "components/Button";

const User: React.FC = () => {

    const { user, userStatus, logout } = userStore;
    const navigate = useNavigate();

    useEffect(() => {
        if (userStatus === 'none') {
            navigate('/login');
        }
    }, [userStatus]);

    return (
        <div className="user-page">
            <Text view='title'>User Page</Text>
            {Object.entries(user).map(([key, value]) => {
                return (
                    <div className="user-page-unit">
                        <Text weight="bold" view='p-16'>{key}:</Text>
                        <Text view='p-16'>{value}</Text>
                    </div>
                )
            })}
            <Button onClick={() => { logout() }}>
                Logout
            </Button>
        </div>
    )
}

export default User;