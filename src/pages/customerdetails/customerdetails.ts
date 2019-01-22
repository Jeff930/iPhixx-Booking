import * as $ from "jquery";
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController  } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ConfirmationPage } from '../../pages/confirmation/confirmation'
import { NavigationProvider } from '../../providers/navigation/navigation';

import { BookingProvider } from '../../providers/booking/booking';

import { ModalController } from 'ionic-angular';



/**
 * Generated class for the CustomerdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-customerdetails',
  templateUrl: 'customerdetails.html',
})
export class CustomerdetailsPage {
	customerDetails: FormGroup;
  error_message: string;
  ishidden=true;
  src;
  loginok = false;



  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public booking: BookingProvider,
		public alertCtrl: AlertController,
		public navigation: NavigationProvider,
		public modalCtrl : ModalController


     ) {
				this.customerDetails = formBuilder.group({
					'fullname':['', Validators.compose([Validators.required])],
					'birthdate':['', Validators.compose([Validators.required])],
					'email':['', Validators.compose([Validators.required])],
					'phone':['', Validators.compose([Validators.required])],
					'phone2':['', Validators.compose([Validators.required])],
				});
  }

  ionViewDidLoad() {
		console.log('ionViewDidLoad CustomerdetailsPage');
		this.navigation.activePageIndex=15;
  }

  ionViewWillLoad() {
  }

  login(user){
  	console.log(user.username);
	console.log(user.password);
	  console.log(user.password);
  	this.booking.userData.user = user;
  	console.log(this.booking.userData);
  	this.presentPrompt();

 
	  }
	  
	  presentPrompt() {
		var data = { source : 'pin' };
		var modalPage = this.modalCtrl.create('ModalPage',data,{cssClass: 'modal-content' });modalPage.present(); 
	 }
}
