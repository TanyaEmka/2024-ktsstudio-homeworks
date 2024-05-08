import * as React from 'react'
import styles from 'styles/customStyles.module.scss';
import Icon, { IconProps } from '../Icon';

const ArrowRightIcon: React.FC<IconProps> = (props) => {

    return (
        <Icon 
            style={{
                cursor: 'pointer'
            }}
            {...props}
            viewBox='0 0 32 32'
            width='32'
            height='32'
        >
            <path 
                className={styles['icon_stroke_color_' + (props.color || 'inherit')]}
                d="M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994" 
                strokeWidth="1.5" 
                strokeMiterlimit="10" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </Icon>
    )
}

export default ArrowRightIcon;
