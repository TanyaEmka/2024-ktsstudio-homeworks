import classNames from 'classnames';
import * as React from "react";
import './Button.scss';

import Loader from '../Loader';

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
      className={[classNames({
        'button': true,
        'button-loading': loading,
        'button-unloading': !loading,
        'button-loading-disabled': loading && disabled
      }), className].join(' ').trim()}
      disabled={disabled || loading}
    >
      {loading ? <Loader size='s' /> : <></>}
      {children}
    </button>
  )
};

export default Button;
