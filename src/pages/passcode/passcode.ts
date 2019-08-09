//import * as $ from "jquery";
import { Component } from '@angular/core';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { NavController, NavParams, LoadingController, Platform, MenuController } from 'ionic-angular';
// import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

// import { HomePage } from '../home/home';
import { ChooseactionPage } from '../chooseaction/chooseaction';
import { BookingProvider } from '../../providers/booking/booking'
import { RepairnumberinfoPage } from '../repairnumberinfo/repairnumberinfo';

import { ChoosemodelPage } from '../choosemodel/choosemodel';
import { ChoosebrandPage } from '../choosebrand/choosebrand';
import { OtherdevicePage } from '../otherdevice/otherdevice';
import { ColorPage } from '../color/color';
import { NetworkPage } from '../network/network';
import { RepairPage } from '../repair/repair';
import { LoginPage } from '../login/login';
import { PhoneofferPage } from '../phoneoffer/phoneoffer';
import { UpgradeofferPage } from '../upgradeoffer/upgradeoffer';
import { OtherdevtypePage } from '../otherdevtype/otherdevtype';
import { EnterdetailPage } from '../enterdetail/enterdetail';
import { CustomerdetailsPage } from '../customerdetails/customerdetails';
import { OtherrepairPage } from '../otherrepair/otherrepair';
import { TestInPage } from '../test-in/test-in';
import { HomePage } from '../home/home';

/**
 * Generated class for the PasscodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-passcode',
  templateUrl: 'passcode.html',
})
export class PasscodePage {

  // login_form: FormGroup;
  error_message: string;
  ishidden=true;
  src;
  loginok = false;
  form = true;
  code = [];
  username;
  index;
  other = 0;
  otherDev = 0;
  otherRepair = 0;
  stat;
  access = 'T';

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public navigation: NavigationProvider,
    public booking: BookingProvider,
    public plt: Platform,
    public menuCtrl: MenuController
   ) {
      this.username = localStorage.getItem('authenticated');
      console.log(this.username);
     // console.log(this.username[0].agent_username);
    this.menuCtrl.enable(false, 'loginMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasscodePage');
    this.navigation.activePageIndex=2;
  }

   

  login(){
    localStorage.setItem('access' , this.access );
  	console.log(this.code);
  	let loading = this.loadingCtrl.create({
       //content: 'Logging in please wait...'
    });
    loading.present();
  	 this.navCtrl.setRoot(ChooseactionPage ,{}, {animate: true, direction: 'forward'});
  	loading.dismiss();
  	}

  onEnterCode(event, i){
    console.log(this.plt.is('cordova'));
    // if (this.plt.is('android')) {
    //   console.log("inputted " + event.target.value);
    //   let a = event.target.value.replace(/[^0-9]/gi, '');
    //   console.log("afer replace " + a);
    //   this.code[i] = a;
    // }
   console.log(this.code.length);
    event.target.value.length && event.target.nextElementSibling ?  event.target.nextElementSibling.focus() : '';

    if (event.key == 'Backspace') {
      console.log( 'backspace'+ this.code.length);
      event.target.previousElementSibling.focus();
      if (this.code.length >= 1) this.code.length -= 1; 
      if (this.code.length === 4) this.form = false;
      else this.form = true;
    }
    console.log(this.code.length);
    
    if(this.code.length === 4) this.form = false;
    else this.form = true;
    

  }
  validateCode(event) {
    console.log("keyCode" + event);
  }
  
  Back() {
    this.index = this.navigation.activePageIndex;
    this.other = this.navigation.other;
    this.otherDev = this.navigation.otherDev;
    this.otherRepair = this.navigation.otherRepair;
    switch (this.index) {
      case 1://login
        console.log("no back button on loginpage");
        break;
      case 2://register
        this.navCtrl.setRoot(LoginPage);
        break;
      case 3://recover
        this.navCtrl.setRoot(LoginPage);
        break;
      case 4://passcode
        this.navCtrl.setRoot(LoginPage);
        break;
      case 5://chooseaction
        this.navCtrl.setRoot(PasscodePage);
        break;
      case 6://home
        this.navCtrl.setRoot(ChooseactionPage);
        break;
      case 7://select brand
        this.navCtrl.setRoot(HomePage);
        break;
      case 8://other brand
        this.navCtrl.setRoot(ChoosebrandPage);
        break;
      case 9://select model
        if (this.booking.userData.device == 'MacBook')
          this.navCtrl.setRoot(HomePage);
        else
          this.navCtrl.setRoot(ChoosebrandPage);
        break;
      case 10://select color
        if (this.other == 0)
          this.navCtrl.setRoot(ChoosemodelPage);
        else
          this.navCtrl.setRoot(OtherdevicePage);
        break;
      case 11://select carrier
        this.navCtrl.setRoot(ColorPage);
        break;
      case 12://select repair
        if (this.booking.userData.device == 'Laptop' || this.booking.userData.device == 'MacBook') {
          this.navCtrl.setRoot(ChoosemodelPage);
        } else {
          if (this.booking.userData.device == 'Gaming Console') {
            this.navCtrl.setRoot(ChoosebrandPage);
          } else {
            this.navCtrl.setRoot(NetworkPage);
          }
        }
        break;
      case 13://upsell
        this.navCtrl.setRoot(TestInPage);
        break;
      case 14://phoneoffer
        this.navCtrl.setRoot(UpgradeofferPage);
        break;
      case 15://customerdetails
        if (this.otherDev == 0) {
          //if (this.otherRepair==0){
          if (this.booking.userData.device == 'Gaming Console') {
            this.navCtrl.setRoot(RepairPage);
          } else {
            if (this.booking.userData.device == 'MacBook' ||
              this.booking.userData.device == 'Laptop') {
              this.navCtrl.setRoot(TestInPage);
            } else {
              this.navCtrl.setRoot(PhoneofferPage);
            }
          }
          // }else{
          //   this.navCtrl.setRoot(OtherrepairPage);}
        }
        else
          this.navCtrl.setRoot(EnterdetailPage);
        break;
      case 16://Otherdevtype
        this.navCtrl.setRoot(HomePage);
        break;
      case 17://Enterdetails
        this.navCtrl.setRoot(OtherdevtypePage);
        break;
      case 18://Confirmation
        this.navCtrl.setRoot(CustomerdetailsPage);
        break;
      case 19://RepairNo
        this.navCtrl.setRoot(ChooseactionPage);
        break;
      case 20://Otherrepair
        this.navCtrl.setRoot(RepairPage);
        break;
      case 21://TestIn
        this.navCtrl.setRoot(RepairPage);
        break;

    }

  }
    



}
