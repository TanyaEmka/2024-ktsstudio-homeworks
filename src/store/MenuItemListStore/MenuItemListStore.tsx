import { 
    urlPrefix, 
    pageElementCount, 
    apiKey 
} from "config/api";
import { MenuItemUnit } from "types/apiTypes";
import BaseListStore from "store/BaseListStore";

export default class MenuItemListStore extends BaseListStore<MenuItemUnit> {

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
        let pathParams = Object.entries(params).map((param) => param.join('='));
        other.forEach((element) => {
            if (element[1] !== null) {
                pathParams.push(element.join('='));
            }
        });
        pathParams.push(['apiKey', apiKey].join('='));
        const url = urlPrefix + 'food/menuItems/' + pathUrl + [...pathParams ].join('&');
        return url;
    }
};