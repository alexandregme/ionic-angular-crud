import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
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
    public loading: Loading;

    constructor(public navCtrl: NavController, public navParams: NavParams, public customerService: CustomerService, public loadingCtrl: LoadingController) {
        this.customer = navParams.data;

        if (this.customer.id && !this.customer.address) {
            this.navCtrl.push(CustomersPage);
        }
    }

    saveCustomer() {
        this.presentLoading();
        if (this.customer.id) {
            this.customerService.updateCustomer(this.customer).then(() => {
                this.navCtrl.push(CustomersPage)
            })
        } else {
            this.customerService.createCustomer(this.customer).then(() => {
                this.navCtrl.push(CustomersPage)
            })
        }
        this.dismissLoading();
    }

    dismissLoading() {
        this.loading.dismiss();
    }

    presentLoading() {
        this.loading.present();
    }

    ngOnInit() {
        this.loading = this.loadingCtrl.create({
            content: "Please wait...",
        });

        if (this.customer.id) {
            this.title = `Edit Customer ${this.customer.id}`;
        } else {
            this.customer = new CustomerRecord();
            this.title = 'New Customer';
        }
    }
}