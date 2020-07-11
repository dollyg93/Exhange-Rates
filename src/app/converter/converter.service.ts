import {countriesCode} from './countries';
import { Injectable } from '@angular/core';
import { ApiEndpointsService } from '../core/services/api-endpoints.service';
import { ApiHttpService } from '../core/services/api-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  constructor(private endPointService: ApiEndpointsService, private httpService: ApiHttpService) {
  }

  getCountryCode = (country) => {
    const countryCode: {country: string, code: string} = countriesCode.find((obj) => obj.country === country);
    return countryCode.code;
  }

  getRates = (toCode: string, fromCode: string): Observable<any> => {
    return this.httpService.get(this.endPointService.getCurrencyRateEndPoint(toCode, fromCode));
  }

  getHistory = (toCode: string, fromCode: string): Observable<any> => {
    return this.httpService.get(this.endPointService.getHistoricalTrendEndPoint(toCode, fromCode));
  }
}
