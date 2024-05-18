import * as React from "react";
import { useEffect } from "react";
import { useLocalStore } from "hooks/useLocalStore";
import { useNavigate } from "react-router-dom";
import userStore from "store/UserStore";
import MealPlanningStore from "store/MealPlanningStore";
import Text from "components/Text";
import ErrorBox from "components/ErrorBox";
import Button from "components/Button";
import { observer } from "mobx-react-lite";

const MealPlanning: React.FC = () => {

    const { plan, status, loadingPlan, generatePlan } = useLocalStore(() => new MealPlanningStore());
    const { user, userStatus } = userStore;
    const navigate = useNavigate();

    useEffect(() => {
        if (userStatus === 'none') {
            navigate('/login');
        } else {
            loadingPlan(user.username, user.hash);
        }
    }, [userStatus]);

    return (
        <div className="mealplanning-page">
            <Button onClick={() => {
                generatePlan(37, user.username, user.hash);
            }}>
                Generate Meal Plan - Busy Work Week
            </Button>
            {status.statusName === 'LOADING' ?
            <Text>...Loading</Text> 
            :
            status.statusName === 'ERROR' ?
            <ErrorBox>{status.statusMessage}</ErrorBox> 
            :
            <Text>Meal Planning</Text>
            }
        </div>
    )
}

export default observer(MealPlanning);