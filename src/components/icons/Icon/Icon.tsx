import classNames from 'classnames';
import * as React from 'react';
import { memo } from 'react';

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
            className={classNames({
                [className || '']: true,
                color,
            })}
            {...props}
            style={{
                flexShrink: 0,
            }}
        >
        </svg>
    )
}

export default memo(Icon);
