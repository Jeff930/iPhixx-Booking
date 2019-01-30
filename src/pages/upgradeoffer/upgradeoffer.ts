import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { BookingProvider } from '../../providers/booking/booking';
import { CartProvider } from '../../providers/cart/cart';
import { PhoneofferPage } from '../../pages/phoneoffer/phoneoffer';

/**
 * Generated class for the UpgradeofferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-upgradeoffer',
  templateUrl: 'upgradeoffer.html',
})
export class UpgradeofferPage {

  device : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public booking : BookingProvider,private cart: CartProvider,public navigation: NavigationProvider,) {
  	if(this.booking.userData.phoneoffer !== false){
	  	this.device =  this.booking.userData.device+', '+this.booking.userData.brand+', '+
	  	this.booking.userData.model+', '+this.booking.userData.color+', '+this.booking.userData.network+', '+
	  	this.booking.userData.repair+', '+this.booking.userData.phoneoffer;
  	}

  	else{
  		this.device =  this.booking.userData.device+', '+this.booking.userData.brand+', '+
	  	this.booking.userData.model+', '+this.booking.userData.color+', '+this.booking.userData.network+', '+
	  	this.booking.userData.repair;
  	}

  }

  ionViewDidLoad() {
	console.log('ionViewDidLoad UpgradeofferPage');
	this.cart.goCheckout=0;
	this.cart.completeCheckout=0;
	this.navigation.activePageIndex=13;
  }


  selectOffer(choice){
  	console.log(choice);
  	if(choice == 'yes'){
			this.booking.userData.upgradeoffer1 = true;
			this.cart.updateRepairs('Nano Technology Tempered Glass',null,'25.00');
  	}
  	else{
  		this.booking.userData.upgradeoffer1 = false;

  	}
	this.cart.goCheckout=0;
  	this.navCtrl.push(PhoneofferPage);
  }

}
