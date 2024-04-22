import * as React from 'react'
import Icon, { IconProps } from '../Icon';


const CheckIcon: React.FC<IconProps> = (props) => {

    return (
        <Icon 
            {...props}
        >
            <path 
                className={'icon-stroke-color-' + (props.color || 'inherit')}
                d='M4 11.6129L9.87755 18L20 7' 
                strokeWidth='2'
            />
        </Icon>
    )
}

export default CheckIcon;
