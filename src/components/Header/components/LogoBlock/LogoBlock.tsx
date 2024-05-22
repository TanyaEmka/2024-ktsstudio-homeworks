import * as React from "react";
import { memo, useCallback } from "react";
import Text from "components/Text";
import LogoIcon from "components/icons/LogoIcon";
import { useNavigate } from "react-router-dom";
import styles from './LogoBlock.module.scss';
import custom from 'styles/customStyles.module.scss';

const LogoBlock: React.FC = () => {

    const navigate = useNavigate();

    const goToMainPage = useCallback(() => {
        navigate('/');
    }, [navigate]);
    
    return (
        <div 
            className={styles["logo-block"]}
            onClick={goToMainPage}
        >
            <LogoIcon />
            <Text 
                weight='bold' tag='span'
                className={custom["text-responsive"]}
            >
                Food Client
            </Text>
        </div>
    )
}

export default memo(LogoBlock);