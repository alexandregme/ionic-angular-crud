import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { CustomerService } from '../../services/customer.service'
import { CustomerRecord } from '../../records/customer';
import { CustomersPage } from '../customers/customers';

@Component({
    selector: 'customer-form',
    templateUrl: 'customer-form.html'
})
export class CustomerFormPage {
    public customer: CustomerRecord;
    public title: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService) {
        this.customer = navParams.data;

        if (this.customer.id && !this.customer.address) {
            this.navCtrl.push(CustomersPage);
        }
    }

    saveCustomer() {
        if (this.customer) {
            this.customerService.updateCustomer(this.customer).then(() => {
                this.navCtrl.push(CustomersPage)
            })
        } else {
            this.customerService.createCustomer(this.customer).then(() => {
                this.navCtrl.push(CustomersPage)
            })
        }
    }

    ngOnInit() {
        if (this.customer.id) {
            this.title = `Edit Customer ${this.customer.id}`;
        } else {
            this.customer = new CustomerRecord();
            this.title = 'New Customer';
        }
    }
}