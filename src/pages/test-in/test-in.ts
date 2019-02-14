import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { BookingProvider } from '../../providers/booking/booking';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { UpgradeofferPage } from '../../pages/upgradeoffer/upgradeoffer';
import { CustomerdetailsPage } from '../../pages/customerdetails/customerdetails';

/**
 * Generated class for the TestInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test-in',
  templateUrl: 'test-in.html',
})
export class TestInPage {

  device;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private cart: CartProvider,
              private booking: BookingProvider,
              private navigation: NavigationProvider,
              ) {
                

  }

  ionViewDidLoad() {
    this.cart.goCheckout=0;
  this.cart.completeCheckout=0;
  this.device=this.booking.userData.device;
  console.log(this.device);
  this.navigation.activePageIndex=21;
  console.log(this.navigation.activePageIndex);
  }

  Proceed(){
    if (this.device=='Phone'|| this.device=='Tablet')
      this.navCtrl.setRoot(UpgradeofferPage);
    else
      this.navCtrl.setRoot(CustomerdetailsPage);
  }

}
