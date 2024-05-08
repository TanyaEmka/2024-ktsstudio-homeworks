import * as React from "react";
import { memo } from "react";
import Text from "components/Text";
import LogoIcon from "components/icons/LogoIcon";
import styles from './LogoBlock.module.scss';

const LogoBlock: React.FC = () => {
    
    return (
        <div className={styles["logo-block"]}>
            <LogoIcon />
            <Text view='p-20' weight='bold'>Food Client</Text>
        </div>
    )
}

export default memo(LogoBlock);