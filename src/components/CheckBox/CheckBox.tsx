import * as React from "react";
import styles from './CheckBox.module.scss';

import CheckIcon from '../icons/CheckIcon';
import classNames from "classnames";

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

  const idName = 'customcheckbox';

  return (
    <div className={styles['cdiv']}>
      <input 
        {...props}
        checked={props.checked}
        onChange={onChangeCheckbox}
        className={styles['cdiv__checkbox']}
        type='checkbox' 
        id={idName}
      />
      <label 
        htmlFor={idName} 
        className={classNames({
          [props.className || '']: true,
          [styles['cdiv__label']]: true,
          [styles['cdiv__label_disabled']]: props.disabled,
        })}
      >
        {props.checked && 
          <CheckIcon color={props.disabled ? 'secondary' : 'accent'} />
        }
      </label>
    </div>
  )
};

export default CheckBox;
