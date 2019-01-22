import { Component } from '@angular/core';
import {  NavController, NavParams , ViewController } from 'ionic-angular';

import { RepairPage } from '../repair/repair'

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { BookingProvider } from '../../providers/booking/booking';
import { NavigationProvider } from '../../providers/navigation/navigation';

/**
 * Generated class for the OtherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-other',
  templateUrl: 'other.html',
})
export class OtherPage {

  login_form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams ,public viewCtrl: ViewController ,
  	public formBuilder: FormBuilder, public booking : BookingProvider, public navigation: NavigationProvider) {
  }

  ionViewDidLoad() {
    this.navigation.activePageIndex=20;
    console.log('ionViewDidLoad OtherPage');
  }


  ionViewWillLoad() { 

    this.login_form = this.formBuilder.group({
      make: new FormControl('', Validators.compose([
        Validators.required
      ])),
      model: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      network: new FormControl('', Validators.required),
     

    });
  }

  gotoCheckout(userData){
  	 this.booking.userData.brand = userData.make;
  	 this.booking.userData.model = userData.model;
  	 this.booking.userData.color = userData.color;
  	 this.booking.userData.network = userData.network; 
  	 this.viewCtrl.dismiss();
  	 this.navCtrl.setRoot(RepairPage);
  }


}
