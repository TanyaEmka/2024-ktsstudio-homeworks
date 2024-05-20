import { observer } from "mobx-react-lite";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/Button";
import Text from "components/Text";
import userStore from "store/UserStore";
import styles from './User.module.scss';


const User: React.FC = () => {

    const { user, userStatus, logout } = userStore;
    const navigate = useNavigate();

    useEffect(() => {
        if (userStatus === 'none') {
            navigate('/login');
        }
    }, [userStatus, navigate]);

    return (
        <div className={styles["user-page"]}>
            <Text view='title'>User Page</Text>
            <div
                className={styles["user-page__info"]} 
            >
                {Object.entries(user).map(([key, value]) => {
                    return (
                        <div 
                            className={styles["user-page__info__unit"]} 
                            key={key}
                        >
                            <Text weight="bold" view='p-16'>{key}:</Text>
                            <Text view='p-16'>{value}</Text>
                        </div>
                    )
                })}
            </div>
            <Button
                className={styles["user-page__logout"]} 
                onClick={() => { logout() }}
            >
                Logout
            </Button>
        </div>
    )
}

export default observer(User);