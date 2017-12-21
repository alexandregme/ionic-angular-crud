import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public customers: Array<string>;
    private url: string = "http://tidy-api-test.herokuapp.com:80/api/v1/customer_data";

    constructor(public navCtrl: NavController, public http: Http) {

        this.http.get(this.url).map(res => res.json())
            .subscribe(data => {
                this.customers = data;
            });
    }

}