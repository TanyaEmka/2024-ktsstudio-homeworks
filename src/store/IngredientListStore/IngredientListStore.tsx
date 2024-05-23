import { 
    urlPrefix, 
    imagePrefix,
    pageElementCount, 
    apiKey 
} from "config/api";
import BaseListStore from "store/BaseListStore";
import { IngredientUnit } from "types/apiTypes";

export default class IngredientListStore extends BaseListStore<IngredientUnit> {

    getUrl(
        offset: string,
        query: string,
        ...other: Array<[string, string | null]>
    ): string {
        const params = {
            number: pageElementCount,
            offset: offset,
            query: query,
        }
        const pathUrl = 'search?';
        const pathParams = Object.entries(params).map((param) => param.join('='));
        other.forEach((element) => {
            if (element[1] !== null) {
                pathParams.push(element.join('='));
            }
        });
        pathParams.push(['apiKey', apiKey].join('='));
        const url = urlPrefix + 'food/ingredients/' + pathUrl + [...pathParams ].join('&');
        return url;
    }

    getImageUrl(url: string, size: 100 | 250 | 500 = 500) {
        return `${imagePrefix}ingredients_${size}x${size}/${url}`;
    }
};