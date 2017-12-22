import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, DeepLinkConfig } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { CustomerService } from '../services/customer.service';
import { Customers } from '../pages/customers/customers';
import { CustomerForm } from '../pages/customer-form/customer-form';

export const deepLinkConfig: DeepLinkConfig = <DeepLinkConfig>{
  links: [{
    component: Customers, name: "Customer", segment: "customers"
  }, {
    component: CustomerForm, name: "Customer detail", segment: "customer/:id", defaultHistory: [Customers]
  }]
};

@NgModule({
  declarations: [
    MyApp,
    Customers,
    CustomerForm
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
    Customers,
    CustomerForm
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CustomerService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
