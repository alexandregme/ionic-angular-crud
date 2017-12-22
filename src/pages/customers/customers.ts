import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { HttpClient } from '@angular/common/http';
import { CustomerForm } from '../customer-form/customer-form';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-costumers',
    templateUrl: 'customers.html'
})
export class Customers {

    //public customers: Array<string>;
    // private url: string = "https://tidy-api-test.herokuapp.com:80/api/v1/customer_data";
    constructor(public navCtrl: NavController) {

       // this.http.get(this.url).map(res => res.json())
       //     .subscribe(data => {
      //          this.customers = data;
      //      });
    }

    editCustomer(rowid) {
        this.navCtrl.push(CustomerForm, {
            id:rowid
        });
    }

}