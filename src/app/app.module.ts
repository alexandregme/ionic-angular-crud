import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, DeepLinkConfig } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ionic2MaskDirective } from 'ionic2-mask-directive';

import { MyApp } from './app.component';
import { CustomerService } from '../services/customer.service';
import { CustomersPage } from '../pages/customers/customers';
import { CustomerFormPage } from '../pages/customer-form/customer-form';

export const deepLinkConfig: DeepLinkConfig = <DeepLinkConfig>{
  links: [
    {
      component: CustomersPage,
      name: "Customer List",
      segment: "customers"
    },{
      component: CustomerFormPage,
      name: "Customer Form New",
      segment: "customer",
      defaultHistory: [CustomersPage]
    }, {
      component: CustomerFormPage,
      name: "Customer Form Edit",
      segment: "customer/:id",
      defaultHistory: [CustomersPage]
    }
  ]
};

@NgModule({
  declarations: [
    MyApp,
    CustomersPage,
    CustomerFormPage,
    Ionic2MaskDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {locationStrategy: 'path'}, deepLinkConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CustomersPage,
    CustomerFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CustomerService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
