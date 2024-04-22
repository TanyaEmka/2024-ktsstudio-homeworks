import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import './MultiDropdown.scss';

import Input from '../Input';
import Text from '../Text';
import ArrowDownIcon from '../icons/ArrowDownIcon';

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

  const getOptionList = (clickValue: Option) => {
    if (!props.value.includes(clickValue)) {
      return [...props.value, clickValue];
    }
    const index = props.value.map(element => element.key).indexOf(clickValue.key);
    const newValueList = [...props.value];
    newValueList.splice(index, 1);
    return newValueList;
  }

  const getFilterList = (title: string) => {
    if (title !== '') {
      const newOptionList: Array<Option> = [];
      optionList.forEach((option) => {
        if (option.value.startsWith(title)) {
          newOptionList.push(option);
        }
      });

      setOptionList(newOptionList);
    } else {
      setOptionList(props.options);
    }
  }

  return(
    <div 
      ref={ref}
      className={['multidropdown', props.className].join(' ').trim()}
    >
      <Input 
        className={opened ? 'opened-block' : ''}
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
        <div className='multidropdown-options'>
          {optionList.map((option) => {
            return (
              <div
                key={option.key}
                onClick={() => props.onChange(getOptionList(option))}
                className={['multidropdown-options-option', 
                            props.value.includes(option) ? 'multidropdown-options-option-selected' : '']
                            .join(' ').trim()}
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

export default MultiDropdown;
