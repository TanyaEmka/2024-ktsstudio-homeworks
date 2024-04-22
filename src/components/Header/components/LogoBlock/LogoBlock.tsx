import * as React from "react";
import './LogoBlock.scss';
import Text from "components/Text";
import LogoIcon from "components/icons/LogoIcon";

const LogoBlock: React.FC = () => {
    
    return (
        <div className="logo-block">
            <LogoIcon />
            <Text view='p-20' weight='bold'>Food Client</Text>
        </div>
    )
}

export default LogoBlock;