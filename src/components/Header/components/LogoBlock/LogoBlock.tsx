import * as React from "react";
import './LogoBlock.scss';
import Text from "components/Text";
import logo from "../../../../assets/LogoIcon.svg";

const LogoBlock: React.FC = () => {
    
    return (
        <div className="logo-block">
            <img className="logo-block-icon" src={logo} />
            <Text view='p-20' weight='bold'>Food Client</Text>
        </div>
    )
}

export default LogoBlock;