import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RepairPage} from '../repair/repair';

import { BookingProvider } from '../../providers/booking/booking';
import { CartProvider } from '../../providers/cart/cart';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationProvider } from '../../providers/navigation/navigation';

/**
 * Generated class for the OtherrepairPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otherrepair',
  templateUrl: 'otherrepair.html',
})
export class OtherrepairPage {

  repairOption='';
  repairCost;

  otherRepair: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams,public booking: BookingProvider,public cart: CartProvider,public formBuilder: FormBuilder,public navigation:NavigationProvider) {
    this.otherRepair = formBuilder.group({
      'repairOption': ['', Validators.compose([Validators.required])],
      'repairCost': ['', Validators.compose([Validators.required])],
    });
  }

  goToCheckout() {
   
    this.navCtrl.setRoot(RepairPage);
    console.log(this.cart.otherRepairSelected);
    this.cart.otherRepairSelected=true;
   
    //this.cart.costs.push(this.repairCost+".00");
    //this.cart.Total=this.cart.Total+parseInt(this.repairCost);
    //this.cart.selectedRepairs.push(this.repairOption);
    this.cart.otherRepair(this.repairOption,this.repairCost+'.00');
   
    console.log("repair option"+this.repairOption);
    console.log("repair option"+this.cart.selectedRepairs[0]);
 
    
  }
  ionViewDidLoad(){
    this.navigation.activePageIndex=20;
    this.navigation.otherRepair=1;
    this.navigation.otherDev=0;
  }

}
