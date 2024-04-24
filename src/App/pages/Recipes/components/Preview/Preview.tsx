import * as React from "react";
import styles from './Preview.module.scss';
import img from 'assets/PreviewImage.svg';

const Preview: React.FC = () => {

    return (
        <div className={styles.preview}>
            <img src={img} alt='preview' />
        </div>
    )
}

export default Preview;