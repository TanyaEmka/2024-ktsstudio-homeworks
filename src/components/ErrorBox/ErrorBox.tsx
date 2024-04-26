import * as React from "react";
import Text from "components/Text";
import styles from './ErrorBox.module.scss';


type ErrorBoxProps = {
    code?: number,
    children: string,
    errorSlot?: React.ReactNode,
}

const ErrorBox: React.FC<ErrorBoxProps> = (props) => {

    return (
        <div className={styles["error-box"]}>
            <Text view='title' tag='div'>Error {props.code || ''}</Text>
            <Text view='p-20' tag='div' className={styles["error-box__message"]}>
                {props.children}
            </Text>
            {props.errorSlot}
        </div>
    )
}

export default ErrorBox;