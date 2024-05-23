import classNames from 'classnames';
import * as React from "react";
import { memo } from 'react';
import Loader from '../Loader';
import styles from './Button.module.scss';


export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  disabled=false,
  className='',
  ...props
}) => {

  return (
    <button
      {...props}
      className={classNames({
        [className]: true,
        [styles.button]: true,
        [styles['button_loading']]: loading,
        [styles['button_unloading']]: !loading,
        [styles['button_loading_disabled']]: loading && disabled
      })}
      disabled={disabled || loading}
    >
      {loading && <Loader size='s' />}
      {children}
    </button>
  )
};

export default memo(Button);
