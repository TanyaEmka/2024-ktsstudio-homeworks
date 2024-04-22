import * as React from 'react';
import './Input.scss';

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
        className={['input-block', 
                    props.disabled ? 'input-block-disabled' : '',
                    props.className]
                    .join(' ').trim()}
      >
        <input 
          {...props}
          value={value}
          onChange={onChangeFunction}
          type='text'
          className='input-element'
        />
        {afterSlot}
      </div>
    )
  });

export default Input;
