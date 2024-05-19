import * as React from "react";
import { useEffect, useState } from "react";
import { useLocalStore } from "hooks/useLocalStore";
import { useNavigate } from "react-router-dom";
import userStore from "store/UserStore";
import MealPlanningStore from "store/MealPlanningStore";
import Text from "components/Text";
import ErrorBox from "components/ErrorBox";
import Button from "components/Button";
import { observer } from "mobx-react-lite";
import WeekInfo from "./components/WeekInfo";
import styles from "./MealPlanning.module.scss";
import MultiDropdown, { Option } from "components/MultiDropdown";
import { publicTemplates } from "config/api";

const MealPlanning: React.FC = () => {

    const { plan, status, loadingPlan, generatePlan } = useLocalStore(() => new MealPlanningStore());
    const [ templates, setTemplates ] = useState<Option[]>([]);
    const { user, userStatus } = userStore;
    const navigate = useNavigate();

    useEffect(() => {
        if (userStatus !== 'none') {
            loadingPlan(user.username, user.hash);
        }
    }, [userStatus]);

    useEffect(() => {
        console.log(plan);
    }, [plan])

    return (
        <div className={styles["mealplanning-page"]}>
            <Text
                tag='div'
                view='title'
            >
                Meal plans
            </Text>
            {userStatus === 'none' ?
            <Button onClick={() => { navigate('/login') }}>
                Login
            </Button>
            :
            <>
                <div className={styles["mealplanning-page__form"]}>
                    <MultiDropdown 
                        value={templates}
                        options={publicTemplates as Option[]}
                        onChange={(value) => {
                            setTemplates(value);
                        }}
                        getTitle={(value) => {
                            if (value.length === 1) {
                                return value[0].value;
                            }
                            return 'Template';
                        }}
                        selectMode='ONE'
                    />
                    <Button onClick={() => {
                        generatePlan(Number(templates.length === 1 ? templates[0].key : '37'), user.username, user.hash);
                    }}>
                        Generate Meal Plan
                    </Button>
                </div>
                {status.statusName === 'LOADING' ?
                <Text>...Loading</Text> 
                :
                status.statusName === 'ERROR' ?
                <ErrorBox>{status.statusMessage}</ErrorBox> 
                :
                <>
                {plan.days &&
                <WeekInfo plan={plan} />
                }
            </>
            }
            </>
            }
        </div>
    )
}

export default observer(MealPlanning);