import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { CustomerService } from '../../services/customer.service'
import { CustomerRecord } from '../../records/customer';
import { CustomerFormPage } from '../customer-form/customer-form';

@Component({
    selector: 'page-costumers',
    templateUrl: 'customers.html'
})
export class CustomersPage {
    public customers: Array<CustomerRecord>;
    public loading: LoadingController;
    
    constructor(public navCtrl: NavController, public customerService: CustomerService, public loadingCtrl: LoadingController) {}

    openCustomerForm() {
        this.navCtrl.push(CustomerFormPage);
    }

    openEditCustomerForm(customer) {
        this.navCtrl.push(CustomerFormPage, customer);
    }

    deleteCustomer(customer) {
        this.presentLoading();
        this.customerService.deleteCustomer(customer).then(()=>{
            this.populateCustomers()
        });
        this.dismissLoading();
    }

    populateCustomers(){
        this.presentLoading();
        this.customerService.getCustomers().then(customers => this.customers = customers);
        this.dismissLoading();
    }

    dismissLoading() {
        this.loading.dismiss();
    }

    presentLoading() {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
        });
        this.loading.present();
    }

    ngOnInit() {
        this.populateCustomers();
    }
}