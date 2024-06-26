import * as React from 'react'
import styles from 'styles/customStyles.module.scss';
import Icon, { IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = (props) => {

    return (
        <Icon
            style={{
                cursor: 'pointer'
            }} 
            {...props}
        >
            <path 
                className={styles['icon_fill_color_' + (props.color || 'inherit')]}
                fillRule='evenodd'
                clipRule='evenodd' 
                d='M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z' 
            />
        </Icon>
    )
}

export default ArrowDownIcon;
