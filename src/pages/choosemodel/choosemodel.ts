import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ColorPage } from '../color/color';
import { RepairPage } from '../repair/repair';

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
  modelNumberForm;
 	  
  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController, public navParams: NavParams, public booking : BookingProvider,public navigation: NavigationProvider,public repair:RepairProvider,public cart:CartProvider,public formBuilder: FormBuilder,) {
  	this.device = this.booking.userData.device+', '+this.booking.userData.brand ;
  		console.log(this.booking.userData.device);  	

	  this.brand = this.booking.userData.brand;	

	  this.modelNumberForm = formBuilder.group({
		'model':['', Validators.compose([Validators.required])],
	});
	  

  		// if(this.booking.userData.device == 'Phone'){	

		//   	if(this.booking.userData.brand == 'iPhone'){
		// 		  this.repair.models = iphonemodels;
		//   	}
		//   	else if(this.booking.userData.brand == 'Samsung'){
		//   		this.repair.models = samsungmodels;
		//   	}
		// 	else if(this.booking.userData.brand == 'Huawei'){
		// 	  		this.repair.models = huaweimodels;
		// 	}
	  	// 	else if(this.booking.userData.brand == 'Sony'){
		// 	  		this.repair.models = sonymodels;
		// 	}
		// 	else if(this.booking.userData.brand == 'Nokia'){
		// 			  		this.repair.models = nokiamodels;
		// 	}

		// }

		// else if (this.booking.userData.device == 'Tablet'){
		// 	if(this.booking.userData.brand == 'iPad'){
		// 		this.repair.models = ipadmodels;
		// 	}
		// 	else if (this.booking.userData.brand == 'Samsung') {
		// 		this.repair.models = samsungtablet;
		// 	}
		// 	else{
		// 		this.repair.models = huaweitablet;
		// 	}
		// } else if (this.booking.userData.device == 'MacBook'){
		// 	this.repair.models = macbookmodels;
		// }

		let loading = this.loadingCtrl.create({
			//content: 'Logging in please wait...'
		 });
		 loading.present();
			
		 let data = new FormData();
		 	data.append("devtype_id", this.booking.userData.deviceKey);
			data.append("phonebrand_id", this.booking.userData.brandKey);
		
			let xhr = new XMLHttpRequest();
			//xhr.withCredentials = true;
		
			xhr.addEventListener("readystatechange",  () =>{
				if (xhr.readyState === 4) {
				console.log(xhr.responseText);
				let result = JSON.parse(xhr.responseText);
				console.log(result);
				}
			});
		
			xhr.open("POST", "https://admin.iphixx.com/api/v1/bookings/devices/");
		
			xhr.send(data);

	}

	ionViewWillEnter(){
		// if (this.booking.userData.device == 'Laptop'){
		// 	document.getElementById('mobile').style.display = 'none';
		// 	document.getElementById('laptop').style.display = 'block';
		// }else{
		// 	document.getElementById('mobile').style.display = 'block';
		// 	document.getElementById('laptop').style.display = 'none';
		// }
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

  selectModel(model,modelNum,key){
	this.booking.userData.model = model;
	console.log(modelNum);
	this.booking.userData.modelNum = modelNum;
	this.booking.userData.modelKey = key;
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
	  if (this.booking.userData.device=="MacBook"){
		this.navCtrl.push(RepairPage);
	  }else{
		console.log(model);
  	this.navCtrl.push(ColorPage);
	  }
  }

  goToRepair(model){
	this.booking.userData.model = model.model;
	console.log(this.booking.userData.model)
	this.booking.userData.modelNum = '';
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
	  this.navCtrl.setRoot(RepairPage);
  }

	ionViewDidLoad() {

		this.navigation.activePageIndex = 9;
	}
}
