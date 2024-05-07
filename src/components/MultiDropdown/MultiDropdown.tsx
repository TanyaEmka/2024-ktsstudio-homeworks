import classNames from 'classnames';
import * as React from 'react';
import { useState, useRef, useEffect, useCallback, memo } from 'react';

import Input from '../Input';
import Text from '../Text';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import styles from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = (props) => {

  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState((props.value && props.value.length) ? props.getTitle(props.value) : '');
  const [optionList, setOptionList] = useState(props.options);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpened(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    setTitle((props.value && props.value.length) ? props.getTitle(props.value) : '');
  }, [props.value, props]);

  useEffect(() => {
    setOptionList(props.options);
  }, [props.options, props]);

  const getOptionList = useCallback((clickValue: Option) => {
    if (!props.value.map((el) => el.key).includes(clickValue.key)) {
      props.onChange([...props.value, clickValue]);
    } else {
      props.onChange(props.value.filter(el => el.key !== clickValue.key));
    }
  }, [props.value, props.onChange]);

  const getFilterList = useCallback((title: string) => {
    if (title !== '') {
      setOptionList(optionList.filter((option) => option.value.startsWith(title)));
    } else {
      setOptionList(props.options);
    }
  }, [optionList, props.options]);

  return(
    <div 
      ref={ref}
      className={classNames({
        [props.className || '']: true,
        [styles['multidropdown']]: true
      })}
    >
      <Input
        onClick={() => {
          if (!props.disabled) {
            setOpened(true);
          }
        }}
        placeholder={props.value.length === 0 ? props.getTitle(props.value) : ''}
        value={title}
        onChange={(currValue: string) => { 
          setTitle(currValue);
          getFilterList(currValue);
        }}
        afterSlot={<ArrowDownIcon color='secondary' onClick={() => {
          if (!props.disabled) {
            setOpened(!opened);
          } 
        }} />}
      />
      {(opened && !props.disabled) &&
        <div className={styles['multidropdown__options']}>
          {optionList.map((option) => {
            const handleChange = () => { getOptionList(option) }

            return (
              <div
                key={option.key}
                onClick={handleChange}
                className={classNames({
                  [styles['multidropdown__options__option']]: true,
                  [styles['multidropdown__options__option_selected']]: props.value.map((el) => el.key).includes(option.key),
                })}
              >
                <Text tag='span' view='p-16'>{option.value}</Text>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
};

export default memo(MultiDropdown);
