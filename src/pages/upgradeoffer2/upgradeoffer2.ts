import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { BookingProvider } from '../../providers/booking/booking';

import { CustomerdetailsPage } from '../../pages/customerdetails/customerdetails'

/**
 * Generated class for the Upgradeoffer2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-upgradeoffer2',
  templateUrl: 'upgradeoffer2.html',
})
export class Upgradeoffer2Page {
  device:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public booking : BookingProvider) {
  	if(this.booking.userData.phoneoffer !== false && this.booking.userData.upgradeoffer1 !== false ){
	  	this.device =  this.booking.userData.device+', '+this.booking.userData.brand+', '+
	  	this.booking.userData.model+', '+this.booking.userData.color+', '+this.booking.userData.network+', '+
	  	this.booking.userData.repair+', '+ this.booking.userData.phoneoffer+', '+ 
	  	this.booking.userData.upgradeoffer1;
  	}

  	else if(this.booking.userData.phoneoffer !== false && this.booking.userData.upgradeoffer1 == false) {
  		this.device =  this.booking.userData.device+', '+this.booking.userData.brand+', '+
	  	this.booking.userData.model+', '+ this.booking.userData.color+', '+this.booking.userData.network+', '+
	  	this.booking.userData.repair+', '+ this.booking.userData.phoneoffer;
  	}
  	else if(this.booking.userData.phoneoffer == false && this.booking.userData.upgradeoffer1 !== false) {
  		this.device =  this.booking.userData.device+', '+this.booking.userData.brand+', '+
	  	this.booking.userData.model+', '+ this.booking.userData.color+', '+this.booking.userData.network+', '+
	  	this.booking.userData.repair+', '+ this.booking.userData.upgradeoffer1;
  	}
  	else{
  		this.device =  this.booking.userData.device+', '+this.booking.userData.brand+', '+
	  	this.booking.userData.model+', '+ this.booking.userData.color+', '+this.booking.userData.network+', '+
	  	this.booking.userData.repair;
  	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Upgradeoffer2Page');
  }

  selectOffer(choice){
  	if(choice == 'yes'){
  		this.booking.userData.upgradeoffer2 = 'Replacement Charger for Lightening Connectors'
  	}
  	else{
  		this.booking.userData.upgradeoffer2 = false;
  	}

  	this.navCtrl.push(CustomerdetailsPage);
  }

}
