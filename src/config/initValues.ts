import { RecipeType, Status } from "types/apiTypes";

export const RecipeInit: RecipeType = {
    id: 0,
    title: '...',
    image: '',
    preparationMinutes: 0,
    cookingMinutes: 0,
    readyInMinutes: 0,
    servings: 0,    
    summary: '...',
    aggregateLikes: 0,
    extendedIngredients: [],
    analyzedInstructions: [{ steps: [] }]
}

export const NotStartedStatus: Status = {
    statusName: 'NOT_STARTED',
    statusMessage: 'загрузка данных не началась',
}

export const LoadingStatus: Status = {
    statusName: 'LOADING',
    statusMessage: '',
}

export const SuccessfulStatus: Status = {
    statusName: 'SUCCESS',
    statusMessage: '',
}

export const errorStatus = (errorMes: string): Status => ({
    statusName: 'ERROR',
    statusMessage: errorMes,
})