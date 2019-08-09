import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ChooseactionPage } from '../pages/chooseaction/chooseaction';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RepairnumberPage } from '../pages/repairnumber/repairnumber'
import { RegisterPage } from '../pages/register/register';
import { PrivacyPage } from '../pages/privacy/privacy';
import { TermsPage } from '../pages/terms/terms';
import { ChoosemodelPage } from '../pages/choosemodel/choosemodel';
import { ChoosebrandPage } from '../pages/choosebrand/choosebrand';
import { OtherdevicePage } from '../pages/otherdevice/otherdevice';
import { ColorPage } from '../pages/color/color';
import { NetworkPage } from '../pages/network/network';
import { RepairPage } from '../pages/repair/repair';
import { PasscodePage } from '../pages/passcode/passcode';
import { PhoneofferPage } from '../pages/phoneoffer/phoneoffer';
import { UpgradeofferPage } from '../pages/upgradeoffer/upgradeoffer';
import { OtherdevtypePage } from '../pages/otherdevtype/otherdevtype';
import { EnterdetailPage } from '../pages/enterdetail/enterdetail';
import { NavigationProvider } from '../providers/navigation/navigation';
import { BookingProvider } from '../providers/booking/booking';
import { CustomerdetailsPage } from '../pages/customerdetails/customerdetails';
import { OtherrepairPage } from '../pages/otherrepair/otherrepair';
import { TestInPage } from '../pages/test-in/test-in';

@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  pages: Array<{ title: string, component: any }>;
  loginPages: Array<{ title: string, component: any }>;
  showback;
  index;
  other = 0;
  otherDev = 0;
  otherRepair = 0;
  username;
  constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public navigation: NavigationProvider, public booking: BookingProvider) {

    this.username = localStorage.getItem('authenticated');
    console.log(this.username);
    this.booking.agentName = this.username;
    // localStorage.removeItem('authenticated');
    splashScreen.show();
    platform.ready().then(() => {
      console.log(localStorage.getItem('access'));
      if (localStorage.getItem('access')){
        this.rootPage = ChooseactionPage;
      }
      else{
        this.rootPage = LoginPage;
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Book A Repair', component: HomePage },
      { title: 'Customer Collection', component: RepairnumberPage },

    ];
    this.loginPages = [ 
      { title: 'Login', component: LoginPage },
      { title: 'Be an Iphixx Partner', component: RegisterPage },
      { title: 'Terms of Service', component: TermsPage },
      { title: 'Privacy and Policy', component: PrivacyPage }
    ]
    console.log(this.navigation.activePageIndex);

    platform.registerBackButtonAction(() => {
      this.other = this.navigation.other;
      this.otherDev = this.navigation.otherDev;
      this.otherRepair = this.navigation.otherRepair;
      this.index = this.navigation.activePageIndex;
      switch (this.index) {
        case 1:
          platform.exitApp();
        case 2://register
          this.logOut();
          break;
        case 3://recover
          this.logOut();
          break;
        case 4://passcode
          this.logOut();
          break;
        case 5://chooseaction
          this.logOut();
          break;
        case 6://home
          this.nav.setRoot(ChooseactionPage);
          break;
        case 7://select brand
          this.nav.setRoot(HomePage);
          break;
        case 8://other brand
          this.nav.setRoot(ChoosebrandPage);
          break;
        case 9://select model
          if (this.booking.userData.device == 'MacBook')
            this.nav.setRoot(HomePage);
          else
            this.nav.setRoot(ChoosebrandPage);
          break;
        case 10://select color
          if (this.other == 0)
            this.nav.setRoot(ChoosemodelPage);
          else
            this.nav.setRoot(OtherdevicePage);
          break;
        case 11://select carrier
          this.nav.setRoot(ColorPage);
          break;
        case 12://select repair
          if (this.booking.userData.device == 'Laptop' || this.booking.userData.device == 'MacBook') {
            this.nav.setRoot(ChoosemodelPage);
          } else {
            if (this.booking.userData.device == 'Gaming Console') {
              this.nav.setRoot(ChoosebrandPage);
            } else {
              this.nav.setRoot(NetworkPage);
            }
          }
          break;
        case 13://upsell
          this.nav.setRoot(TestInPage);
          break;
        case 14://phoneoffer
          this.nav.setRoot(UpgradeofferPage);
          break;
        case 15://customerdetails
          if (this.otherDev == 0) {
            //if (this.otherRepair==0){
            if (this.booking.userData.device == 'Gaming Console') {
              this.nav.setRoot(RepairPage);
            } else {
              if (this.booking.userData.device == 'MacBook' ||
                this.booking.userData.device == 'Laptop') {
                this.nav.setRoot(TestInPage);
              } else {
                this.nav.setRoot(PhoneofferPage);
              }
            }
            // }else{
            //   this.nav.setRoot(OtherrepairPage);}
          }
          else
            this.nav.setRoot(EnterdetailPage);
          break;
        case 16://Otherdevtype
          this.nav.setRoot(HomePage);
          break;
        case 17://Enterdetails
          this.nav.setRoot(OtherdevtypePage);
          break;
        case 18://Confirmation
          this.nav.setRoot(CustomerdetailsPage);
          break;
        case 19://RepairNo
          this.nav.setRoot(ChooseactionPage);
          break;
        case 20://Otherrepair
          this.nav.setRoot(RepairPage);
          break;
        case 21://TestIn
          this.nav.setRoot(RepairPage);
          break;

      }
    }, 1);
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut(){
  
    // let alert = this.alertCtrl.create({
    //     title: 'Tip',
    //     subTitle: 'Are you sure you want to Log Out?',
    //     buttons: [

    //        {
    //           text: 'No',
    //           role: 'cancel',
    //           handler: () => {
    //             console.log('Cancel clicked');
              

    //           }
    //         },
    //         {
    //           text: 'Yes',
    //           handler: () => {
    //             console.log('Buy clicked');
    //             localStorage.clear();
    //             this.navCtrl.setRoot(LoginPage);
    //           }
    //         }
    //     ]
    // });

    // alert.present();

    localStorage.clear();
    this.nav.setRoot(LoginPage);
    this.navigation.activePageIndex = 1;
  }
  setLogin() {
    this.nav.setRoot(LoginPage);
    this.navigation.activePageIndex = 1;
  }
}

