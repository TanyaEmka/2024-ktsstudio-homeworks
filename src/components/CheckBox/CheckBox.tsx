import React from 'react';
import './CheckBox.scss';

import CheckIcon from '../icons/CheckIcon';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = (props) => {

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.checked);
  }

  return (
    <div className='checkbox-div'>
      <input 
        {...props}
        checked={props.checked}
        onChange={onChangeCheckbox}
        className='checkbox' 
        type='checkbox' 
        id='customcheckbox'
      />
      <label 
        htmlFor='customcheckbox' 
        className={['checkbox-block', 
                    props.disabled ? 'checkbox-block-disabled' : '',
                    props.className]
                    .join(' ').trim()}
      >
        {props.checked ? 
          <CheckIcon 
            color={props.disabled ? 'secondary' : 'accent'} 
          /> 
          : <></>
        }
      </label>
    </div>
  )
};

export default CheckBox;
