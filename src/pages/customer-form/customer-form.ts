import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
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
    private formGroup : FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public customerService: CustomerService,
        public loadingCtrl: LoadingController,
        private formBuilder: FormBuilder
    ) {
        this.customer = navParams.data;

        if (this.customer && this.customer.id && !this.customer.address) {
            this.navCtrl.push(CustomersPage);
        }

        if(this.customer.id){
            this.formGroup = this.formBuilder.group({
                name: [''],
                email: [''],
                phone: [''],
                address: ['', Validators.required],
                city: [''],
                state: [''],
                zipcode: ['']
            });
        }else{
            this.formGroup = this.formBuilder.group({
                name: ['', Validators.required],
                email: ['', Validators.required],
                phone: ['', Validators.required],
                address: ['', Validators.required],
                city: ['', Validators.required],
                state: ['', Validators.required],
                zipcode: ['', Validators.required]
            });
        }
    }

    saveCustomer() {
        this.presentLoading();

        this.customerService.saveCustomer(this.customer)
            .then(() => {
                this.navCtrl.push(CustomersPage);
                this.dismissLoading();
            })
            .catch(() => {
                this.dismissLoading();
            });
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
        if (this.customer.id) {
            this.title = `Edit Customer ${this.customer.id}`;
        } else {
            this.customer = new CustomerRecord();
            this.title = 'New Customer';
        }
    }
}