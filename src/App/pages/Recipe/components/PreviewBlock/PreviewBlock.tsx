import * as React from "react";
import { memo, useCallback } from "react";

import Text from "components/Text";

type PreviewBlockProps = {
    name: string,
    children: number,
    unit: string,
}

const PreviewBlock: React.FC<PreviewBlockProps> = (props) => {

    const getValue = useCallback(() => {
        if (props.children && props.children > 0) {
            return [props.children, props.unit].join(' ');
        }
        return '-';
    }, [props.children, props.unit]);

    return (
        <div>
            <Text view='p-16'>{props.name}</Text>
            <Text weight='bold' color='accent' view='p-16'>
                {getValue()}
            </Text>
        </div>
    )
}

export default memo(PreviewBlock);