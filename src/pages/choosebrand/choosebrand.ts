import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,PopoverController } from 'ionic-angular';

import { BookingProvider } from '../../providers/booking/booking';
import { CartProvider } from '../../providers/cart/cart';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { RepairProvider } from '../../providers/repair/repair';

import { ChoosemodelPage } from '../choosemodel/choosemodel';
import { RepairPage } from '../repair/repair';
import { OtherdevicePage } from '../otherdevice/otherdevice';


/**
 * Generated class for the ChoosebrandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-choosebrand',
  templateUrl: 'choosebrand.html',
})
export class ChoosebrandPage {

	device:string;
  brands:any;
  devWidth:any;

  constructor(public navCtrl: NavController, public navParams: NavParams , public booking : BookingProvider ,
  	public popoverCtrl: PopoverController, public loadingCtrl: LoadingController,public cart: CartProvider,public navigation: NavigationProvider,public repair:RepairProvider) {	
  }

  ionViewWillEnter(){
    this.booking.brand="selected";
    this.booking.selected=2;
    if (this.booking.selected==2){
      this.booking.device="selected";
      this.booking.brand="last-selected";
      this.booking.model="not-selected";
      this.booking.color="not-selected";
      this.booking.carrier="not-selected";
      this.booking.repair="last-not-selected";
    }
    this.booking.updateCurrentPage();
    this.navigation.activePageIndex=7;
    this.navigation.other=0;

    this.device = this.booking.userData.device;
      console.log("device" + this.device);

      let loading = this.loadingCtrl.create({
        //content: 'Logging in please wait...'
       });
       loading.present();
      
       let data = new FormData();
          data.append("devtype_id", this.booking.userData.deviceKey);
      
        let xhr = new XMLHttpRequest();
      
        xhr.addEventListener("readystatechange",  () =>{
          if (xhr.readyState === 4) {
            console.log(xhr.responseText);
            let result = JSON.parse(xhr.responseText);
            console.log(result);
            console.log(result.length);
            loading.dismiss();
            if (result.length != 0){
              this.brands = result;
            }
          }
        });
        xhr.open("POST", "https://admin.iphixx.com/api/v1/bookings/list-brands-by-device/");
        xhr.send(data);


  }

  selectBrand(brand, key){
    if(brand == 'Other'){
      this.navCtrl.push(OtherdevicePage);
    }
    else{
      // if (this.device == 'Gaming Console'){
      //   this.booking.userData.model = '';
	    //   this.booking.userData.modelNum = '';
	    //   this.cart.selectedRepairs=[];
	    //   this.cart.selectedIndex=[];
	    //   this.cart.cartMessage="There are currently no items in your cart.";
	    //   this.cart.Total=0;
	    //   this.cart.costs=[];
	    //   this.repair.modelrepairs=[];
	    //   this.repair.other=0;
	    //   this.repair.prices=[];
	    //   this.cart.completeCheckout=[];
	    //   this.cart.goCheckout=[];
	    //   this.repair.updatemodelrepairs();
      //   this.navCtrl.setRoot(RepairPage);
      // }else{
        this.navCtrl.push(ChoosemodelPage , { brand: brand});
      //}
    }
    this.booking.userData.brand = brand;
    this.booking.userData.brandKey = key;
  }

  selectConsole(model,brandKey,modelKey,modelNum){
    this.booking.userData.model = model;
    console.log(modelNum);
    this.booking.userData.modelNum = modelNum;
    this.booking.userData.modelKey = modelKey;
    this.booking.userData.brandKey = brandKey;
    console.log(this.booking.userData);
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
    this.navCtrl.push(RepairPage);
    }

  ionViewDidLoad() {
    this.navigation.activePageIndex = 7;
  }
}
