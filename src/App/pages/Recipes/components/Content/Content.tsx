import React from "react";
import './Content.scss';

import Text from "components/Text";
import ContentFilters from "../ContentFilters";

const Content: React.FC = () => {

    return (
        <div className="content">
            <Text className="content-header" view='p-20' tag='div'>
                Find the perfect food and
                {' '} 
                <span className="line">drink ideas</span>
                {' '}
                for every occasion, from
                {' '}
                <span className="line">weeknight dinners</span> to
                {' '}
                <span className="line">holiday feasts</span>.
            </Text>
            <ContentFilters />
        </div>
    )
}

export default Content;