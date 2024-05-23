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

export type MealPlanItemWithIdType = {
    id: number,
    servings: number,
    title: string,
    imageType: string,
}

export type MealPlanIngredientType = {
    name: string,
    unit: string,
    amount: string,
    image: string
}

export interface MealPlanItemType {
    id: number,
    slot: number,
    position: 1,
    type: MealPlanItemKind,
}

export interface MealPlanRecipeType extends MealPlanItemType {
    type: 'RECIPE',
    value: MealPlanItemWithIdType
}

export interface MealPlanProductType extends MealPlanItemType {
    type: 'PRODUCT',
    value: MealPlanItemWithIdType
}
export interface MealPlanMenuItemType extends MealPlanItemType {
    type: 'MENU_ITEM',
    value: MealPlanItemWithIdType
}
export interface MealPlanCustomFoodType extends MealPlanItemType {
    type: 'CUSTOM_FOOD',
    value: MealPlanItemWithIdType
}

export interface IngOneType {
    ingredients: MealPlanIngredientType[]
}

export interface IngTwoType {
    title: string, servings: string
}

export interface MealPlanIngredientsType extends MealPlanItemType {
    type: 'INGREDIENTS',
    value: IngOneType | IngTwoType
}

export type MealPlanCommonItemType = 
    MealPlanRecipeType |
    MealPlanProductType |
    MealPlanMenuItemType | 
    MealPlanCustomFoodType |
    MealPlanIngredientsType;

export type MealPlanDayType = {
    nutritionSummary: NutritionSummaryType,
    nutritionSummaryBreakfast: NutritionSummaryType,
    nutritionSummaryLunch: NutritionSummaryType,
    nutritionSummaryDinner: NutritionSummaryType,
    date: number,
    day: string,
    items: MealPlanCommonItemType[],
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

export type IngredientType = {
    id: number,
    original: string,
    originalName: string,
    name: string,
    amount: number,
    unit: string,
    unitShort: string,
    unitLong: string,
    possibleUnits: string[],
    estimatedCost: {
        value: number,
        unit: string,
    },
    consistency: string,
    shoppingListUnits: string[],
    aisle: string,
    image: string,
    nutrition: {
        nutrients: Array<{ 
            name: string, 
            amount: number, 
            unit: string,
            percentOfDailyNeeds: number,
        }>,
        properties: Array<{
            name: string,
            amount: number,
            unit: string,
        }>,
        flavonoids: Array<{
            name: string,
            amount: number,
            unit: string,
        }>,
        caloricBreakdown: {
            [key: string]: number,
        },
        weightPerServing: {
            amount: number,
            unit: string,
        }
    },
    categoryPath: string[],
}

export type Status = {
    statusName: 'LOADING' | 'ERROR' | 'SUCCESS' | 'NOT_STARTED',
    statusMessage: string,
};