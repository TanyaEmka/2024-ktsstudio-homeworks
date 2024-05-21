import * as React from "react";
import { memo } from "react";
import Text from "components/Text";
import LogoIcon from "components/icons/LogoIcon";
import styles from './LogoBlock.module.scss';
import custom from 'styles/customStyles.module.scss';

const LogoBlock: React.FC = () => {
    
    return (
        <div className={styles["logo-block"]}>
            <LogoIcon />
            <Text 
                weight='bold'
                className={custom["text-responsive"]}
            >
                Food Client
            </Text>
        </div>
    )
}

export default memo(LogoBlock);