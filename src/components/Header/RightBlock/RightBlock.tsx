import React from "react";
import './RightBlock.scss';
import UserIcon from "components/icons/UserIcon";
import HeartIcon from "components/icons/HeartIcon";

import { useNavigate } from "react-router-dom";

const RightBlock: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className="right-block">
            <HeartIcon 
                onClick={() => { navigate('likes') }}
            />
            <UserIcon 
                onClick={() => { navigate('profile') }}
            />
        </div>
    )
}

export default RightBlock;