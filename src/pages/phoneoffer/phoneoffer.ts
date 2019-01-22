import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BookingProvider } from '../../providers/booking/booking';

import { UpgradeofferPage } from '../../pages/upgradeoffer/upgradeoffer'

import { CustomerdetailsPage } from '../../pages/customerdetails/customerdetails'
import { NavigationProvider } from '../../providers/navigation/navigation';
import { CartProvider } from '../../providers/cart/cart';


/**
 * Generated class for the PhoneofferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-phoneoffer',
  templateUrl: 'phoneoffer.html',
})
export class PhoneofferPage {
  
  device : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public booking : BookingProvider,private cart: CartProvider,public navigation: NavigationProvider,) {
  	this.device =  this.booking.userData.device+', '+this.booking.userData.brand+', '+
  	this.booking.userData.model+', '+this.booking.userData.color+', '+this.booking.userData.network+', '+
  	this.booking.userData.repair;
  }

  ionViewDidLoad() {
		console.log('ionViewDidLoad PhoneofferPage');
		this.navigation.activePageIndex=14;
		this.navigation.otherDev=0;
  }

  selectOffer(choice){
  	console.log(choice);
  	if(choice == 'yes'){
			this.booking.userData.phoneoffer = 'Temporary Phone';
			this.cart.updateRepairs(this.booking.userData.phoneoffer,null,'50.00');
  	}
  	else{
  		this.booking.userData.phoneoffer = false;
	  }
	  this.navCtrl.setRoot(CustomerdetailsPage);
		this.cart.goCheckout=0;
		this.cart.completeCheckout=1;
  }

}
