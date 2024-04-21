import React from 'react';
import './Loader.scss';

export type LoaderProps = {
    /** Размер */
    size?: 's' | 'm' | 'l';
    /** Дополнительный класс */
    className?: string;
};

const Loader: React.FC<LoaderProps> = ({
    size='l',
    className
}) => {

    return (
        <div
            className={[className,
                        'loader', 
                        'loader-size-' + size]
                        .join(' ').trim()}
        >
        </div>
    )
};

export default Loader;
