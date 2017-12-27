import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { CustomerRecord } from '../records/customer';

@Injectable()
export class CustomerService {

    private customerURL: string = "http://tidy-api-test.herokuapp.com:80/api/v1/customer_data";
    private headers: any;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({ 'Accept':'application/json', 'Content-Type': 'application/x-www-form-urlencoded'});
    }

    getCustomers(): Promise<CustomerRecord[]> {
        return this.http.get(this.customerURL)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    createCustomer(customer: CustomerRecord): Promise<CustomerRecord> {
        const body = new HttpParams()
            .set('name', customer.name)
            .set('email', customer.email)
            .set('phone', customer.phone)
            .set('address', customer.address)
            .set('city', customer.city)
            .set('state', customer.state)
            .set('zipcode', customer.zipcode);

        return this.http
            .post(this.customerURL, body, {headers: this.headers})
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    deleteCustomer(customer: CustomerRecord): Promise<void> {
        const url = `${this.customerURL}/${customer.id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        return res || {};
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

