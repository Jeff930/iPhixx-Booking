import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { EmailComposer } from '@ionic-native/email-composer';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ChoosemodelPage } from '../pages/choosemodel/choosemodel';
import { OtherdevicePage } from '../pages/otherdevice/otherdevice';
import { RecoverPage } from '../pages/recover/recover';
import { RegisterPage } from '../pages/register/register';
import { PasscodePage } from '../pages/passcode/passcode';
import { ChoosebrandPage } from '../pages/choosebrand/choosebrand';
import { ChooseactionPage } from '../pages/chooseaction/chooseaction';
import { RepairnumberPage } from '../pages/repairnumber/repairnumber';
import { OtherPage } from '../pages/other/other';
import { ColorPage } from '../pages/color/color';
import { NetworkPage } from '../pages/network/network';
import { RepairPage } from '../pages/repair/repair';
import { BookingpPage } from '../pages/bookingp/bookingp';
import { PhoneofferPage } from '../pages/phoneoffer/phoneoffer';
import { UpgradeofferPage } from '../pages/upgradeoffer/upgradeoffer';
import { Upgradeoffer2Page } from '../pages/upgradeoffer2/upgradeoffer2';
import { CustomerdetailsPage } from '../pages/customerdetails/customerdetails';
import { ConfirmationPage } from '../pages/confirmation/confirmation';
import { SignaturePage } from '../pages/signature/signature';
import { RepairnumberinfoPage } from '../pages/repairnumberinfo/repairnumberinfo';
import { PhoneofferdetailsPage } from '../pages/phoneofferdetails/phoneofferdetails';
import { ThankyouPage } from '../pages/thankyou/thankyou';
import { OtherdevtypePage } from '../pages/otherdevtype/otherdevtype';
import { EnterdetailPage } from '../pages/enterdetail/enterdetail';
import { OtherrepairPage } from '../pages/otherrepair/otherrepair';
import { TestInPage } from '../pages/test-in/test-in';

import { SignaturePadModule } from 'angular2-signaturepad';

import { BookingProvider } from '../providers/booking/booking';
import { ComponentsModule } from '../components/components.module';
import { CartProvider } from '../providers/cart/cart';
import { NavigationProvider } from '../providers/navigation/navigation';
import { RepairProvider } from '../providers/repair/repair';
import { PrintServiceProvider } from '../providers/print-service/print-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ChoosemodelPage,
    PasscodePage,
    OtherdevicePage,
    ChoosebrandPage,
    ChooseactionPage,
    RepairnumberPage,
    OtherPage,
    ColorPage,
    NetworkPage,
    RepairPage,
    BookingpPage,
    PhoneofferPage,
    UpgradeofferPage,
    Upgradeoffer2Page,
    CustomerdetailsPage,
    ConfirmationPage,
    SignaturePage,
    RepairnumberinfoPage,
    PhoneofferdetailsPage,
    ThankyouPage,
    RecoverPage,
    RegisterPage,
    OtherdevtypePage,
    EnterdetailPage,
    OtherrepairPage,
    TestInPage,


  ],
  imports: [
    BrowserModule,
    SignaturePadModule,
    HttpModule,
    ComponentsModule,  
    IonicModule.forRoot(MyApp,{
         mode: 'ios'
    })
  
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ChoosemodelPage,
    PasscodePage,
    OtherdevicePage,
    ChoosebrandPage,
    ChooseactionPage,
    RepairnumberPage,
    OtherPage,
    ColorPage,
    NetworkPage,
    RepairPage,
    BookingpPage,
    PhoneofferPage,
    UpgradeofferPage,
    Upgradeoffer2Page,
    CustomerdetailsPage,
    ConfirmationPage,
    SignaturePage,
    RepairnumberinfoPage,
    PhoneofferdetailsPage,
    ThankyouPage,
    RecoverPage,
    RegisterPage,
    OtherdevtypePage,
    EnterdetailPage,
    OtherrepairPage,
    TestInPage,
    

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BookingProvider,
    CartProvider,
    NavigationProvider,
    File,
    FileOpener,
    RepairProvider,
    EmailComposer,
    PrintServiceProvider,
    BluetoothSerial,
  ]
})
export class AppModule {}
