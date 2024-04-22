import * as React from 'react';
import './Text.scss';

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
            className={[props.className || '', 
                        props.view ? 'text-view-' + props.view : '',
                        'text-color-' + (props.color || 'inherit'),
                        'text-weight-' + (props.weight || 'normal')]
                        .join(' ').trim()}
            onClick={props.onCLick}
        >
            {props.children}
        </Tag>
    )
}

export default Text;
