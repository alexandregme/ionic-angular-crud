import { Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export class BaseApiService {
    protected headers: any;

    constructor(public http: HttpClient) {
        this.headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        });
    }

    _toHttpParams(obj: Object): HttpParams {
        return Object.getOwnPropertyNames(obj)
            .reduce((p, key) => p.set(key, obj[key]), new HttpParams());
    }

    _get(url) {
        return this.http
            .get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    _post(url, body) {
        return this.http
            .post(url, body, {headers: this.headers})
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    _put(url, body) {
        return this.http
            .put(url, body, {headers: this.headers})
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    _delete(url){
        return this.http
            .delete(url, { headers: this.headers })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    protected extractData(res: Response) {
        return res || {};
    }

    protected handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
