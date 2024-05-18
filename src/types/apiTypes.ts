export type RecipeType = {
    id: number,
    title: string,
    image: string,
    preparationMinutes: number,
    cookingMinutes: number,
    readyInMinutes: number,
    servings: number,    
    summary: string,
    aggregateLikes: number,
    extendedIngredients: Array<{ id: number, amount: number, name: string, unit: string }>,
    analyzedInstructions: [{ 
        steps: Array<{ number: number, step: string, equipment: Array<{ name: string }> }> 
    }]
}

export interface RecipeUnit {
    id: number,
    image: string,
    title: string,
    readyInMinutes: number,
    nutrition: {
        nutrients: Array<{ name: string, amount: number, unit: string }>,
        ingredients: Array<{ name: string }>,   
    }
};

export type RecipeCollectionUnitType = RecipeUnit & {
    kcal: string,
    describe: string,
};

export type RecipeList = Array<RecipeUnit>;

export type RecipeListRequest = {
    results: RecipeList,
    totalResults: number,
};

export type IngredientUnit = {
    id: number,
    name: string,
    image: string,    
};

export type IngredientListRequest = {
    results: Array<IngredientUnit>,
    totalResults: number,    
}

export type ProductUnit = {
    id: number,
    title: string,
    image: string,
    imageType: string,
}

export type ServingsType = {
    number: number,
    size: number,
    unit: string,
}

export type MenuItemUnit = {
    id: number,
    title: string,
    restaurantChain: string,
    image: string,
    imageType: string,
    servings: ServingsType,
}

export type MealPlanNutrinitionUnitType = {
    name: string,
    amount: number,
    unit: string,
    percentOfDailyNeeds: number    
}

export type NutritionSummaryType = {
    nutrients: MealPlanNutrinitionUnitType[]
}

export type MealPlanItemKind = 
    'INGREDIENTS' | 
    'PRODUCT' | 
    'MENU_ITEM' | 
    'RECIPE' | 
    'CUSTOM_FOOD';

export interface MealPlanItemType {
    id: number,
    slot: number,
    position: 1,
    type: MealPlanItemKind,
}

export interface MealPlanRecipeType extends MealPlanItemType {
    type: 'RECIPE',
    value: {
        id: number,
        servings: number,
        title: string,
        imageType: string,
        image: string,
    }
}

export interface MealPlanProductType extends MealPlanItemType {
    type: 'PRODUCT',
    value: {
        id: number,
        servings: number,
        title: string,
        imageType: string,
        image: string,
    }
}
export interface MealPlanMenuItemType extends MealPlanItemType {
    type: 'MENU_ITEM',
    value: {
        id: number,
        servings: number,
        title: string,
        imageType: string,
        image: string,
    }
}
export interface MealPlanCustomFoodType extends MealPlanItemType {
    type: 'CUSTOM_FOOD',
    value: {
        id: number,
        servings: number,
        title: string,
        imageType: string,
        image: string,
    }
}
export interface MealPlanIngredientsType extends MealPlanItemType {
    type: 'INGREDIENTS',
    value: {
        id: number,
        servings: number,
        title: string,
        imageType: string,
        image: string,
    }
}

export type MealPlanDayType = {
    nutritionSummary: NutritionSummaryType,
    nutritionSummaryBreakfast: NutritionSummaryType,
    nutritionSummaryLunch: NutritionSummaryType,
    nutritionSummaryDinner: NutritionSummaryType,
    date: number,
    day: string,
    items: MealPlanItemType[],
}

export type MealPlanWeekType = {
    days: MealPlanDayType[],
}

export type MealPlanTemplateType = {
    id: number,
    name: string,
}

export type MealPlanTemplatesType = {
    templates: MealPlanTemplateType[],
}

export type Status = {
    statusName: 'LOADING' | 'ERROR' | 'SUCCESS' | 'NOT_STARTED',
    statusMessage: string,
};