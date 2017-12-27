import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { CustomerService } from '../../services/customer.service'
import { CustomerRecord } from '../../records/customer';
import { CustomerFormNewPage } from '../customer-form-new/customer-form-new';
import { CustomerFormEditPage } from '../customer-form-edit/customer-form-edit';

@Component({
    selector: 'page-costumers',
    templateUrl: 'customers.html'
})
export class CustomersPage {
    public customers: Array<CustomerRecord>;
    
    constructor(public navCtrl: NavController, public customerService: CustomerService) {}

    openCustomerForm() {
        this.navCtrl.push(CustomerFormNewPage);
    }

    openEditCustomerForm(customer) {
        this.navCtrl.push(CustomerFormEditPage, customer);
    }

    deleteCustomer(customer) {
        this.customerService.deleteCustomer(customer).then(()=>{
            this.populateCustomers()
        });
    }

    populateCustomers(){
        this.customerService.getCustomers().then(customers => this.customers = customers);
    }

    ngOnInit() {
        this.populateCustomers();
    }
}