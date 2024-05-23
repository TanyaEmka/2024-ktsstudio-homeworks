import { 
    urlPrefix, 
    pageElementCount, 
    apiKey 
} from "config/api";
import BaseListStore from "store/BaseListStore";
import { ProductUnit } from "types/apiTypes";

export default class ProductListStore extends BaseListStore<ProductUnit> {

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
        const url = urlPrefix + 'food/products/' + pathUrl + [...pathParams ].join('&');
        return url;
    }
};