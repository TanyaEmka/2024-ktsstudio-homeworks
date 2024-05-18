import * as React from "react";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HeartIcon from "components/icons/HeartIcon";
import UserIcon from "components/icons/UserIcon";
import styles from './RightBlock.module.scss';

const RightBlock: React.FC = () => {

    const navigate = useNavigate();

    const goToSaved = useCallback(() => { 
        navigate('/saved');
    }, [navigate]);
    const goToProfile = useCallback(() => { 
        navigate('/login');
    }, [navigate]);

    return (
        <div className={styles["right-block"]}>
            <HeartIcon onClick={goToSaved}/>
            <UserIcon onClick={goToProfile}/>
        </div>
    )
}

export default memo(RightBlock);