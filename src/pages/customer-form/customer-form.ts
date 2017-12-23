import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { CustomerService } from '../../services/customer.service'
import { CustomerRecord } from '../../records/customer';
import { Customers } from '../customers/customers';

@Component({
    selector: 'page-customer-form',
    templateUrl: 'customer-form.html'
})
export class CustomerForm {
    private id: number;
    public customer: CustomerRecord;
    public title: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService) {
        this.id = navParams.get("id");
    }

    saveCustomer() {
        this.customerService.createCustomer(this.customer).then(() => {
            this.navCtrl.push(Customers)
        })
    }

    ngOnInit() {
        if (this.id) {
            //this.customerService.getCustomer(this.newCustomer).then(customer => this.customer = customer);
            this.title = `Edit Customer ${this.id}`;
        }else{
            this.customer = new CustomerRecord();
            this.title = 'New Customer';
        }
    }
}