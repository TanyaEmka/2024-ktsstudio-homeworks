import React from "react";
import './Preview.scss';
import img from '../../../../../assets/PreviewImage.svg';

const Preview: React.FC = () => {

    return (
        <div className="preview">
            <img src={img} alt='preview' />
        </div>
    )
}

export default Preview;