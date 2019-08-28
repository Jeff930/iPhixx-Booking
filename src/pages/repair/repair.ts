import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookingProvider } from '../../providers/booking/booking';
import { RepairProvider } from '../../providers/repair/repair';
import { CartProvider } from '../../providers/cart/cart';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { OtherrepairPage} from '../otherrepair/otherrepair';

/**
 * Generated class for the RepairPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-repair',
  templateUrl: 'repair.html',
})
export class RepairPage {

 
  device:string;
  brand:string;
  model:string;
  devices;
  unselected;

  constructor(public navCtrl: NavController, public navParams: NavParams , public booking : BookingProvider,private cart: CartProvider,public navigation: NavigationProvider,public repair: RepairProvider) {
  	this.device =  this.booking.userData.device+', '+this.booking.userData.brand+', '+
    this.booking.userData.model+', '+this.booking.userData.color+', '+this.booking.userData.network;

    this.brand=this.booking.userData.brand;
    this.model=this.booking.userData.model;
    this.devices = this.booking.userData.device.toLowerCase();
    console.log("try"+this.model);
    console.log(this,repair);
  }

  ionViewWillEnter(){
    this.booking.repair="last";
		if (this.booking.selected<6)
      this.booking.selected=6;
	if (this.booking.selected==6){
    this.booking.device="selected";
    this.booking.brand="selected";
    this.booking.model="selected";
    this.booking.color="selected";
    this.booking.carrier="selected";
    this.booking.repair="last";
  }
  this.booking.updateCurrentPage();
  this.navigation.activePageIndex=12;
  this.cart.checkMessage();
  this.cart.checkSelected();
  }


  enterRepair() {
    console.log(this.cart.otherRepairSelected)
    if (this.cart.otherRepairSelected==false){
      this.navCtrl.push(OtherrepairPage);
    }else{
      console.log("Already selected");
    }
  }

  ionViewDidLoad() {
    this.navigation.activePageIndex = 12;
  }
}
