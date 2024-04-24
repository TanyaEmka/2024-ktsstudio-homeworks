import * as React from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    value,
    onChange,
    afterSlot,
    ...props
  }) => {

    const onChangeFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    }

    return (
      <div 
        className={classNames({
          [props.className || '']: true,
          [styles['inputblock']]: true,
          [styles['inputblock_disabled']]: props.disabled,
        })}
      >
        <input 
          {...props}
          value={value}
          onChange={onChangeFunction}
          type='text'
          className={styles['inputblock__element']}
        />
        {afterSlot}
      </div>
    )
  });

export default Input;
