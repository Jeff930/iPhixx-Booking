import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,PopoverController } from 'ionic-angular';


import { BookingProvider } from '../../providers/booking/booking';
import { CartProvider } from '../../providers/cart/cart';
import { NavigationProvider } from '../../providers/navigation/navigation';

import { ChoosemodelPage } from '../choosemodel/choosemodel';
import { OtherdevicePage } from '../otherdevice/otherdevice';

import { phonebrands } from '../../models/phonebrands';
import { tabletbrands } from '../../models/tabletbrands';
import { laptopbrands } from '../../models/laptopbrands';




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
  	public popoverCtrl: PopoverController,public cart: CartProvider,public navigation: NavigationProvider,) {
  	this.device = this.booking.userData.device;
      console.log("brand" + this.device);

    switch (this.device){
      case 'Phone':
        this.brands = phonebrands;
        break;
      case 'Tablet':
        this.brands = tabletbrands;
        break;
      case 'Laptop':
        this.brands = laptopbrands
        break;
    }
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
  }

  selectBrand(brand){
    if(brand == 'Other'){
      this.navCtrl.push(OtherdevicePage);
    }
    else{
  	this.navCtrl.push(ChoosemodelPage , { brand: brand});
  	this.booking.userData.brand = brand;
    }
  }

  

  // presentPopover(myEvent) {
  //   let popover = this.popoverCtrl.create(OtherPage);
  //   popover.present({
  //     ev: myEvent
  //   });
  // }

}
