import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { CustomerService } from '../../services/customer.service'
import { CustomerForm } from '../customer-form/customer-form';
import { CustomerRecord } from '../../records/customer';

@Component({
    selector: 'page-costumers',
    templateUrl: 'customers.html'
})
export class Customers {
    public customers: Array<CustomerRecord>;
    
    constructor(public navCtrl: NavController, public customerService: CustomerService) {}

    editCustomer(rowid) {
        this.navCtrl.push(CustomerForm, {
            id: rowid
        });
    }

    ngOnInit() {
        this.customerService.getCustomers().then(customers => this.customers = customers);
    }
}