import * as React from "react";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HeartIcon from "components/icons/HeartIcon";
import UserIcon from "components/icons/UserIcon";
import userStore from "store/UserStore";
import styles from './RightBlock.module.scss';

const RightBlock: React.FC = () => {

    const navigate = useNavigate();

    const goToSaved = useCallback(() => { 
        navigate('/saved');
    }, [navigate]);

    const goToProfile = useCallback(() => { 
        if (userStore.userStatus === 'auth') {
            navigate('/user');
        } else {
            navigate('/login');
        }
    }, [navigate, userStore.userStatus]);

    return (
        <div className={styles["right-block"]}>
            <HeartIcon onClick={goToSaved}/>
            <UserIcon onClick={goToProfile}/>
        </div>
    )
}

export default memo(RightBlock);