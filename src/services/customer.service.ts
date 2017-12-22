import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { CustomerRecord } from '../records/customer';

@Injectable()
export class CustomerService {

    private customerURL: string = "http://tidy-api-test.herokuapp.com:80/api/v1/customer_data";

    constructor(private http: HttpClient) {}

    getCustomers(): Promise<CustomerRecord[]> {
        return this.http.get(this.customerURL)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

