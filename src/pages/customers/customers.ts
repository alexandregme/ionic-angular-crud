import { Component } from '@angular/core';
import { ViewController, NavController, LoadingController, Loading, AlertController, Alert} from 'ionic-angular';
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
    public loading: Loading;
    public alert: Alert;
    
    constructor(
        private viewCtrl: ViewController,
        public navCtrl: NavController,
        public customerService: CustomerService,
        public loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) {}

    openCustomerForm() {
        this.navCtrl.push(CustomerFormPage);
    }

    openEditCustomerForm(customer) {
        this.navCtrl.push(CustomerFormPage, customer);
    }

    deleteCustomer(customer) {
        this.presentLoading();
        this.customerService
            .deleteCustomer(customer)
            .then(()=>{
                this.dismissLoading();
                this.populateCustomers();
            })
            .catch(() =>{
                this.dismissLoading();
            });
    }

    populateCustomers(){
        this.presentLoading();
        this.customerService
            .getCustomers()
            .then((customers) => {
                this.customers = customers;
                this.dismissLoading();
            })
            .catch(() =>{
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

    presentConfirm(customer) {
        this.alert = this.alertCtrl.create({
            title: 'Confirm deletion',
            message: `Are you sure that you want to delete '${customer.name}' ?`,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: 'Delete',
                    handler: () => {
                       this.deleteCustomer(customer)
                    }
                }
            ]
        });
        this.alert.present();
    }

    ionViewWillEnter() {
        this.viewCtrl.showBackButton(false);
    }

    ngOnInit() {
        this.populateCustomers();
    }
}