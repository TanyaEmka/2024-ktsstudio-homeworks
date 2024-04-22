import * as React from "react";
import { useEffect, useState } from "react";
import './Menu.scss';

import { useNavigate , useLocation } from "react-router-dom";

import Text from "components/Text";
import paths from "../../../../config/paths";

const Menu: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [selectedUrl, setUrl] = useState(0);

    useEffect(() => {
        const index = paths.map((path) => path.url).indexOf(location.pathname);
        setUrl((index === -1 ? 0 : index));
    }, [location.pathname]);

    return (
        <div className="menu">
            {paths.map((path, index) => {
                return (
                    <Text
                        key={path.name}
                        className={["menu-option", 
                                    "menu-option-" + (selectedUrl === index ? 'selected' : 'unselected')]
                                    .join(' ').trim()}
                        view='p-16'
                        tag='div'
                        onCLick={() => { setUrl(index); navigate(path.url); }}
                    >
                        {path.name}
                    </Text>
                )
            })}
        </div>
    )
}

export default Menu;