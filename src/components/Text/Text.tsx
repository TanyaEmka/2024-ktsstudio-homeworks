import * as React from 'react';
import styles from './Text.module.scss';
import classNames from 'classnames';

export type TextProps = {
    /** Дополнительный класс */
    className?: string;
    /** Стиль отображения */
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    /** Html-тег */
    tag?:  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    /** Начертание шрифта */
    weight?: 'normal' | 'medium' | 'bold';
    /** Контент */
    children: React.ReactNode;
    /** Цвет */
    color?: 'primary' | 'secondary' | 'accent';
    /** Максимальное кол-во строк */
    maxLines?: number;
    onCLick?: () => void;
};

const Text: React.FC<TextProps> = ({ ...props }) => {

    const Tag = props.tag ? props.tag : 'p';

    return (
        <Tag
            style={{
                maxLines: props.maxLines || 'none',
            }}
            className={classNames({
                [props.className || '']: true,
                [styles['text_view_' + (props.view || 'p-14')]]: props.view,
                [styles['text_color_' + (props.color || 'inherit')]]: true,
                [styles['text_weight_'+ (props.weight || 'normal')]]: true,
            })}
            onClick={props.onCLick}
        >
            {props.children}
        </Tag>
    )
}

export default Text;
