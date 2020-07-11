import { Injectable } from '@angular/core';
import { UrlBuilder } from '../../shared/classes/url-builder';
import { QueryStringParameters } from '../../shared/classes/query-string-parameters';
import { Constants } from 'src/app/config/constants';

@Injectable({
    providedIn: 'root'
  })
export class ApiEndpointsService {

    constructor(
        private constants: Constants
    ) { }

    public getCurrencyRateEndPoint(toCode, fromCode) {
        return this.createUrlWithQueryParameters('latest', (qs: QueryStringParameters) => {
            qs.push('symbols', toCode);
            qs.push('base', fromCode);
        });
    }

    public getHistoricalTrendEndPoint(toCode, fromCode) {
        const today = new Date();
        const month = today.getMonth();
        const day = today.getDate();
        const year = today.getFullYear();
        const date = year + '-' + month + '-' + day;
        return this.createUrlWithQueryParameters('history', (qs: QueryStringParameters) => {
            qs.push('start_at', '2010-1-12');
            qs.push('end_at', date);
            qs.push('symbols', toCode);
            qs.push('base', fromCode);
        });
    }

    // URL WITH QUERY PARAMS
    private createUrlWithQueryParameters(action: string, queryStringHandler?:
        (queryStringParameters: QueryStringParameters) => void): string {
        const urlBuilder: UrlBuilder = new UrlBuilder(this.constants.API_ENDPOINT, action);
        // Push extra query string params
        if (queryStringHandler) {
            queryStringHandler(urlBuilder.queryString);
        }
        return urlBuilder.toString();
    }
}
