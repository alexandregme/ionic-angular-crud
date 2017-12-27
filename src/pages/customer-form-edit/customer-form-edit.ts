import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { CustomerService } from '../../services/customer.service';
import { CustomersPage } from '../customers/customers';

@Component({
    selector: 'customer-form-edit',
    templateUrl: 'customer-form-edit.html'
})
export class CustomerFormEditPage {
    public title: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService) {
        this.customer = navParams.data;

        if (!this.customer.email){
            this.navCtrl.push(CustomersPage);
        }
    }

    saveCustomer() {
        this.customerService.createCustomer(this.customer).then(() => {
            this.navCtrl.push(CustomersPage)
        });
    }

    ngOnInit() {
        this.title = `Edit Customer ${this.customer.name}`;
    }
}