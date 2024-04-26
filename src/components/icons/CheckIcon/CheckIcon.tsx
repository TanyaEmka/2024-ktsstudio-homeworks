import * as React from 'react'
import styles from 'styles/customStyles.module.scss';
import Icon, { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = (props) => {

    return (
        <Icon 
            {...props}
        >
            <path 
                className={styles['icon_stroke_color_' + (props.color || 'inherit')]}
                d='M4 11.6129L9.87755 18L20 7' 
                strokeWidth='2'
            />
        </Icon>
    )
}

export default CheckIcon;
