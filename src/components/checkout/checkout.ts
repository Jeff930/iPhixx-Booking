import { Component } from '@angular/core';
import { CartProvider } from '../../providers/cart/cart';
import { BookingProvider } from '../../providers/booking/booking';
import { TestInPage } from '../../pages/test-in/test-in';
import { NavController, NavParams } from 'ionic-angular';
import { CustomerdetailsPage } from '../../pages/customerdetails/customerdetails'
/**
 * Generated class for the CheckoutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutComponent{

  constructor(public cart:CartProvider,public navCtrl: NavController,public booking:BookingProvider) {
    console.log('Hello CheckoutComponent Component');
  }

  goCheckout(){
    this.navCtrl.push(TestInPage);
  }

  completeCheckout(){
    this.booking.userData.selectedRepair = this.cart.selectedRepairs;
    this.navCtrl.push(CustomerdetailsPage);
  }
}
