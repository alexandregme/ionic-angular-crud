import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { CustomerService } from '../../services/customer.service'
import { CustomerRecord } from '../../records/customer';
import { CustomersPage } from '../customers/customers';

@Component({
    selector: 'customer-form-new',
    templateUrl: 'customer-form-new.html'
})
export class CustomerFormNewPage {
    public customer: CustomerRecord;

    constructor(public navCtrl: NavController, public customerService: CustomerService) {}

    saveCustomer() {
        this.customerService.createCustomer(this.customer).then(() => {
            this.navCtrl.push(CustomersPage)
        })
    }

    ngOnInit() {
        this.customer = new CustomerRecord();
    }
}