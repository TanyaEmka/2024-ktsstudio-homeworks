import * as React from "react";
import './RightBlock.scss';
import { useNavigate } from "react-router-dom";
import HeartIcon from "components/icons/HeartIcon";
import UserIcon from "components/icons/UserIcon";

const RightBlock: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="right-block">
            <HeartIcon onClick={() => { navigate('likes') }}/>
            <UserIcon onClick={() => { navigate('profile') }}/>
        </div>
    )
}

export default RightBlock;