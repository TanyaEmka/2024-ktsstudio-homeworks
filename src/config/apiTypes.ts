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

export type RecipeUnit = {
    id: number,
    image: string,
    title: string,
    readyInMinutes: number,
    nutrition: {
        nutrients: Array<{ name: string, amount: number, unit: string }>,
        ingredients: Array<{ name: string }>,   
    }
};

export type RecipeList = Array<RecipeUnit>;

export type Status = {
    statusName: 'LOADING' | 'ERROR' | 'SUCCESS',
    statusMessage: string,
};