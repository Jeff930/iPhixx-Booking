import { Component, ViewChild } from '@angular/core';
import { Platform , Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ChooseactionPage } from '../pages/chooseaction/chooseaction';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { RepairnumberPage } from '../pages/repairnumber/repairnumber'



@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    splashScreen.show();
    platform.ready().then(() => {
      console.log(localStorage.getItem('authenticated'));
      if(localStorage.getItem('authenticated')){
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
  }
}

