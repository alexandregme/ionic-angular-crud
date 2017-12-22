import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-customer-form',
    templateUrl: 'customer-form.html'
})
export class CustomerForm {
    constructor(public navCtrl: NavController) {}
}