import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NavigationProvider } from '../../providers/navigation/navigation';
import { CartProvider } from '../../providers/cart/cart';
import { BookingProvider } from '../../providers/booking/booking';
import { RepairProvider } from '../../providers/repair/repair';
import {CustomerdetailsPage} from '../customerdetails/customerdetails';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the EnterdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enterdetail',
  templateUrl: 'enterdetail.html',
})
export class EnterdetailPage {

  brand:string;
  model:string;
  total:string;
  repairDesc:string;
  otherDeviceType: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,public booking: BookingProvider,public cart: CartProvider,public navigation:NavigationProvider,public repair :RepairProvider,public formBuilder: FormBuilder) {
    this.otherDeviceType = formBuilder.group({
      'brand': ['', Validators.compose([Validators.required])],
      'model': ['', Validators.compose([Validators.required])],
      'repairDesc': ['', Validators.compose([Validators.required])],
      'total': ['', Validators.compose([Validators.required])],
    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad EnterdetailPage');
    this.navigation.activePageIndex=17;
    this.navigation.otherDev=1;
    this.navigation.otherRepair=0;
  }

  completeCheckout(){
    this.booking.userData.brand = this.brand;
    this.booking.userData.model = this.model;
    this.cart.selectedRepairs=[];
	  this.cart.selectedRepairs.push(this.repairDesc);
	  this.cart.selectedIndex=[];
    this.cart.cartMessage="There are currently no items in your cart.";
	  this.cart.Total=this.total;
	  this.repair.modelrepairs=[];
	  this.repair.prices=[];
	  this.cart.completeCheckout=[];
    this.cart.goCheckout=[];
    this.cart.costs=[];
    this.cart.costs.push(this.total);
    
    this.navCtrl.push(CustomerdetailsPage);
  }

  ionViewDidLoad() {

    this.navigation.activePageIndex = 17;
  }
}
