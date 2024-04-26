import classNames from 'classnames';
import * as React from 'react';
import styles from './Loader.module.scss';

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
            className={classNames({
                className,
                [styles['loader']]: true,
                [styles['loader_size_' + size]]: true,
            })}
        >
        </div>
    )
};

export default Loader;
