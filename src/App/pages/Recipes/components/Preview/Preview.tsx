import * as React from "react";
import img from 'assets/PreviewImage.svg';
import styles from './Preview.module.scss';

const Preview: React.FC = () => {

    return (
        <div className={styles.preview}>
            <img src={img} alt='preview' />
        </div>
    )
}

export default Preview;