import * as React from "react";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HeartIcon from "components/icons/HeartIcon";
import UserIcon from "components/icons/UserIcon";
import styles from './RightBlock.module.scss';

const RightBlock: React.FC = () => {

    const navigate = useNavigate();

    const goToLikes = useCallback(() => { 
        navigate('likes') 
    }, [navigate]);
    const goToProfile = useCallback(() => { 
        navigate('profile') 
    }, [navigate]);

    return (
        <div className={styles["right-block"]}>
            <HeartIcon onClick={goToLikes}/>
            <UserIcon onClick={goToProfile}/>
        </div>
    )
}

export default memo(RightBlock);