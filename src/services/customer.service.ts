import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { CustomerRecord } from '../records/customer';
import { BaseApiService } from "./base-api.service";
import { ApiVariables } from './api-variables';


@Injectable()
export class CustomerService extends BaseApiService {
    private customerURL: string = ApiVariables.url.customer;

    constructor(public http: HttpClient) {
        super(http);
    }

    getCustomers(): Promise<CustomerRecord[]> {
        return this._get(this.customerURL)
    }

    createCustomer(customer: CustomerRecord): Promise<CustomerRecord> {
        const body = this._toHttpParams(customer);

        return this._post(this.customerURL, body)
    }

    updateCustomer(customer: CustomerRecord): Promise<CustomerRecord> {
        const body = this._toHttpParams(customer);

        const url = `${this.customerURL}/${customer.id}`;

        return this._put(url, body);
    }

    deleteCustomer(customer: CustomerRecord): Promise<void> {
        const url = `${this.customerURL}/${customer.id}`;

        return this._delete(url);
    }
}

