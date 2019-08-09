
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, MenuController, Platform } from 'ionic-angular';


import { BookingProvider } from '../../providers/booking/booking';
import { LoginPage } from '../login/login';
import { NavigationProvider } from '../../providers/navigation/navigation';
/**
 * Generated class for the PrivacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {
  pager: any;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public booking: BookingProvider,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public platform: Platform,
    public navigation: NavigationProvider
  ) {
    this.menuCtrl.enable(true, 'loginMenu');
    this.menuCtrl.enable(false, 'myMenu');
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyPage');
    this.navigation.activePageIndex = 3;
  }

  setPager(_pager) {
    this.pager = _pager;
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }
}
