import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ThankyouPage } from '../thankyou/thankyou'


/**
 * Generated class for the PhoneofferdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-phoneofferdetails',
  templateUrl: 'phoneofferdetails.html',
})
export class PhoneofferdetailsPage {

  login_form : FormGroup;
  day;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneofferdetailsPage');
  }

  ionViewWillLoad() {

    this.login_form = this.formBuilder.group({
      days: new FormControl('', Validators.compose([
        Validators.required
      ])),
  
     

    });
  }

  gotoThankyou(day){
  	console.log(day)
  	this.navCtrl.setRoot(ThankyouPage);
  }

}
