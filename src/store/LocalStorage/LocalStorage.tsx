import { action, computed, makeObservable, observable } from "mobx";
import { ILocalStore } from "hooks/useLocalStore";
import { RecipeCollectionUnitType } from "types/apiTypes";

export type CardRecipeType = {
    id: number,
    readyInMinutes: number,
    title: string,
    describe: string,
    kcal: string,
    image: string,
}

type PrivateFields = '_savedCardRecipes' | '_fullPrefix';

export class LocalStorage implements ILocalStore {

    private _prefix = 'recipe';
    private _fullPrefix = 'recipes';
    private _savedCardRecipes: CardRecipeType[] = [];

    constructor() {
        makeObservable<LocalStorage, PrivateFields>(this, {
            _savedCardRecipes: observable.ref,
            _fullPrefix: observable,
            deleteRecipe: action.bound,
            addSavedRecipe: action.bound,
            checkRecipeInSaved: action.bound,
            loadingSaved: action.bound,
            cards: computed
        });
    }

    getItemName(id: number | string, ...args: Array<string | number>) {
        return [ this._prefix, id, ...args ].join('-');
    }

    addRecipeValues(recipe: RecipeCollectionUnitType) {
        localStorage.setItem(this.getItemName(recipe.id, 'readyInMinutes'), recipe.readyInMinutes.toString());
        localStorage.setItem(this.getItemName(recipe.id, 'title'), recipe.title);
        localStorage.setItem(this.getItemName(recipe.id, 'describe'), recipe.describe);
        localStorage.setItem(this.getItemName(recipe.id, 'kcal'), recipe.kcal);
        localStorage.setItem(this.getItemName(recipe.id, 'image'), recipe.image);
    }

    getSavedRecipe(id: string): CardRecipeType {
        const cardRecipe: CardRecipeType = {} as CardRecipeType;
        cardRecipe.id = Number(id);
        cardRecipe.readyInMinutes = Number(localStorage.getItem(this.getItemName(id, 'readyInMinutes')) || '0');
        cardRecipe.title = localStorage.getItem(this.getItemName(id, 'title')) || '';
        cardRecipe.describe = localStorage.getItem(this.getItemName(id, 'describe')) || '';
        cardRecipe.kcal = localStorage.getItem(this.getItemName(id, 'kcal')) || '';
        cardRecipe.image = localStorage.getItem(this.getItemName(id, 'image')) || '';
        return cardRecipe;
    }

    getAllRecipes(): CardRecipeType[] {
        const recipeList = localStorage.getItem(this._fullPrefix) || '';
        if (recipeList !== '') {
            const idList = recipeList.split(',');
            return idList.map((strId) => {
                return this.getSavedRecipe(strId);
            });
        }
        return [];
    }

    checkRecipeInSaved(id: number) {
        const index = this._savedCardRecipes.map((card) => card.id).indexOf(id);
        return index !== -1;
    }

    deleteRecipe(id: number) {
        const recipeList = localStorage.getItem(this._fullPrefix) || '';
        const idList = recipeList.split(',');
        const index = idList.indexOf(id.toString());
        if (index !== -1) {
            idList.splice(index, 1);
        }
        localStorage.setItem(this._fullPrefix, [...idList].join(','));
        this.loadingSaved();
    }

    addSavedRecipe(recipe: RecipeCollectionUnitType) {
        const recipeList = localStorage.getItem(this._fullPrefix);
        if (!recipeList) {
            localStorage.setItem(this._fullPrefix, recipe.id.toString());
        } else {
            localStorage.setItem(this._fullPrefix, [recipeList, recipe.id.toString()].join(','));
        }
        this.addRecipeValues(recipe);
        this.loadingSaved();
    }

    loadingSaved() {
        this._savedCardRecipes = this.getAllRecipes();
    }

    get cards() {
        return this._savedCardRecipes;
    }

    destroy() {
        this._savedCardRecipes = [];
    }
}

export default new LocalStorage();