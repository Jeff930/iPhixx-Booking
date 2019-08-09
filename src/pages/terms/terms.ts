// import * as $ from "jquery";
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, MenuController, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import { NavigationProvider } from '../../providers/navigation/navigation';
import { BookingProvider } from '../../providers/booking/booking';
import { LoginPage } from '../login/login';
/**
 * Generated class for the TermsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public booking: BookingProvider,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public platform: Platform,
    public navigation: NavigationProvider,
    private file: File, private fileOpener: FileOpener,
    public iab: InAppBrowser
  ) {
    this.menuCtrl.enable(true, 'loginMenu');
    this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
    this.navigation.activePageIndex = 3;
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

  downloadPdf() {
    let filePath = 'www/assets/pdf/';
    if (this.platform.is('cordova')) {

      this.file.copyFile(filePath, 'IPhixx Terms of Service.pdf', this.file.dataDirectory, 'myLetter.pdf').then(result => {
        this.fileOpener.open(this.file.dataDirectory + 'myLetter.pdf', 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e));
      })

      // this.fileOpener.open(filePath + 'IPhixx Terms of Service.pdf', 'application/pdf');
    } else {
      // On a browser simply use download!
      const browser = this.iab.create('assets/pdf/IPhixx Terms of Service.pdf');
    }
  }

  // downloadPdf2() {

  //   let filePath = 'assets/pdf/';

  //     // On a browser simply use download!
  //   const browser = this.iab.create(filePath + 'IPhixx Terms of Service.pdf');
    
  // }
  // downloadPdf3() {
  //   let filePath = 'assets/pdf/';
  //   if (this.platform.is('cordova')) {

  //     this.file.copyFile(filePath, 'IPhixx Terms of Service.pdf', this.file.dataDirectory, 'myLetter.pdf').then(result => {
  //       this.fileOpener.open(this.file.dataDirectory + 'myLetter.pdf', 'application/pdf')
  //         .then(() => console.log('File is opened'))
  //         .catch(e => console.log('Error opening file', e));
  //     })

  //     // this.fileOpener.open(filePath + 'IPhixx Terms of Service.pdf', 'application/pdf');
  //   } else {
  //     // On a browser simply use download!
  //     const browser = this.iab.create('assets/pdf/IPhixx Terms of Service.pdf');
  //   }
  // }

}
