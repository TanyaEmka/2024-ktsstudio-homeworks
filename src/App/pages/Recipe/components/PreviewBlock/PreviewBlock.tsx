import * as React from "react";

import Text from "components/Text";

type PreviewBlockProps = {
    name: string,
    children: number,
    unit: string,
}

const PreviewBlock: React.FC<PreviewBlockProps> = (props) => {

    return (
        <div className="recipe-preview-info-block">
            <Text view='p-16'>{props.name}</Text>
            <Text weight='bold' color='accent' view='p-16'>{props.children} {props.unit}</Text>
        </div>
    )
}

export default PreviewBlock;