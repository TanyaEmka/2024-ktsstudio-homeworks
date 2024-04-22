import * as React from "react";

import Text from "components/Text";

type RecipeNeedProps = {
    name: string,
    elements: Array<string>,
    icon: React.ReactNode
}

const RecipeNeed: React.FC<RecipeNeedProps> = (props) => {

    return (
        <div className="recipe-needs-block">
            <Text view='p-20' weight='bold'>
                {props.name}
            </Text>
            <div className="recipe-needs-block-elems">
                {props.elements.map((element, index) => {
                    return (
                        <div key={[element, index].join(' ')}>
                            {props.icon}
                            <Text view='p-16'>
                                {element}
                            </Text>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RecipeNeed;