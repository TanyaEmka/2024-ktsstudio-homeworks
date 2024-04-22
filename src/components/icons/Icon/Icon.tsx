import * as React from 'react';
import './Icon.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
    className,
    color,
    ...props
}) => {

    const iconWidth = props.width || '24';
    const iconHeight = props.height || '24';

    return (
        <svg
            fill='none'
            width={iconWidth}
            height={iconHeight}
            viewBox='0 0 24 24'
            className={[className, color].join(' ').trim() || ''}
            {...props}
        >
        </svg>
    )
}

export default Icon;
