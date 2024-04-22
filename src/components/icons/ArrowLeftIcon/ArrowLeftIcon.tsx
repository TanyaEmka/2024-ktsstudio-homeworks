import * as React from 'react'
import Icon, { IconProps } from '../Icon';


const ArrowLeftIcon: React.FC<IconProps> = (props) => {

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
                className={'icon-stroke-color-' + (props.color || 'inherit')}
                d="M20.12 26.5599L11.4267 17.8666C10.4 16.8399 10.4 15.1599 11.4267 14.1333L20.12 5.43994" 
                strokeWidth="1.5" 
                strokeMiterlimit="10" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </Icon>
    )
}

export default ArrowLeftIcon;
