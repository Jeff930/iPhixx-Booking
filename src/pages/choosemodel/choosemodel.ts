import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ColorPage } from '../color/color';


import { BookingProvider } from '../../providers/booking/booking';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { RepairProvider } from '../../providers/repair/repair';
import { CartProvider } from '../../providers/cart/cart';

import { iphonemodels } from '../../models/iphonemodels';
import { samsungmodels } from '../../models/samsungmodels';
import { huaweimodels } from '../../models/huaweimodels';
import { huaweitablet } from '../../models/huaweitabletmodel';
import { sonymodels } from '../../models/sonymodels';
import { nokiamodels } from '../../models/nokiamodels';

import { ipadmodels } from '../../models/ipadmodels';
import { samsungtablet } from '../../models/samsungtabletmodel';
import { mobilerepairs } from '../../models/mobilerepairs';

import { macbookmodels } from '../../models/macbookmodels';

/**
 * Generated class for the ChoosemodelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-choosemodel',
  templateUrl: 'choosemodel.html',
})
export class ChoosemodelPage {

  device:string;
  models = [];
  brand : string;
  model : string;
 	  
  constructor(public navCtrl: NavController, public navParams: NavParams, public booking : BookingProvider,public navigation: NavigationProvider,public repair:RepairProvider,public cart:CartProvider) {
  	this.device = this.booking.userData.device+', '+this.booking.userData.brand ;
  		console.log(this.booking.userData.device);  	

	  this.brand = this.booking.userData.brand;	
	  

  		if(this.booking.userData.device == 'Phone'){	

		  	if(this.booking.userData.brand == 'iPhone'){
				  this.repair.models = iphonemodels;
		  	}
		  	else if(this.booking.userData.brand == 'Samsung'){
		  		this.repair.models = samsungmodels;
		  	}
			else if(this.booking.userData.brand == 'Huawei'){
			  		this.repair.models = huaweimodels;
			}
	  		else if(this.booking.userData.brand == 'Sony'){
			  		this.repair.models = sonymodels;
			}
			else if(this.booking.userData.brand == 'Nokia'){
					  		this.repair.models = nokiamodels;
			}

		}

		else if (this.booking.userData.device == 'Tablet'){
			if(this.booking.userData.brand == 'iPad'){
				this.repair.models = ipadmodels;
			}
			else if (this.booking.userData.brand == 'Samsung') {
				this.repair.models = samsungtablet;
			}
			else{
				this.repair.models = huaweitablet;
			}
		} else if (this.booking.userData.device == 'MacBook'){
			this.repair.models = macbookmodels;
		}

	}

	ionViewWillEnter(){
		this.booking.model="selected";
		
		this.booking.selected=3;
    if (this.booking.selected==3){
      this.booking.device="selected";
      this.booking.brand="selected";
      this.booking.model="last-selected";
      this.booking.color="not-selected";
      this.booking.carrier="not-selected";
      this.booking.repair="last-not-selected";
	}
	this.booking.updateCurrentPage();
	this.navigation.activePageIndex=9;
	this.navigation.other=0;
	}

  selectModel(model){
	  console.log(model);
	  this.booking.userData.model = model;
	  this.cart.selectedRepairs=[];
	  this.cart.selectedIndex=[];
	  this.cart.cartMessage="There are currently no items in your cart.";
	  this.cart.Total=0;
	  this.cart.costs=[];
	  this.repair.modelrepairs=[];
	  this.repair.other=0;
	  this.repair.prices=[];
	  this.cart.completeCheckout=[];
	  this.cart.goCheckout=[];
	  this.repair.updatemodelrepairs();
  	this.navCtrl.push(ColorPage);
  }

}
