import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, DeepLinkConfig } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { CustomerService } from '../services/customer.service';
import { CustomersPage } from '../pages/customers/customers';
import { CustomerFormNewPage } from '../pages/customer-form-new/customer-form-new';
import { CustomerFormEditPage } from '../pages/customer-form-edit/customer-form-edit';

export const deepLinkConfig: DeepLinkConfig = <DeepLinkConfig>{
  links: [
    {
      component: CustomersPage,
      name: "Customer List",
      segment: "customers"
    },{
      component: CustomerFormNewPage,
      name: "Customer Form New",
      segment: "customer",
      defaultHistory: [CustomersPage]
    }, {
      component: CustomerFormEditPage,
      name: "Customer  Form Edit",
      segment: "customer/:id",
      defaultHistory: [CustomersPage]
    }
  ]
};

@NgModule({
  declarations: [
    MyApp,
    CustomersPage,
    CustomerFormNewPage,
    CustomerFormEditPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {}, deepLinkConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CustomersPage,
    CustomerFormNewPage,
    CustomerFormEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CustomerService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
