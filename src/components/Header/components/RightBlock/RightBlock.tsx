import * as React from "react";
import styles from './RightBlock.module.scss';
import { useNavigate } from "react-router-dom";
import HeartIcon from "components/icons/HeartIcon";
import UserIcon from "components/icons/UserIcon";

const RightBlock: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className={styles["right-block"]}>
            <HeartIcon onClick={() => { navigate('likes') }}/>
            <UserIcon onClick={() => { navigate('profile') }}/>
        </div>
    )
}

export default RightBlock;