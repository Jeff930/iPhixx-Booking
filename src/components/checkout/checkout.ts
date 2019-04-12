import { Component } from '@angular/core';
import { CartProvider } from '../../providers/cart/cart';
import { BookingProvider } from '../../providers/booking/booking';
import { TestInPage } from '../../pages/test-in/test-in';
import { NavController, NavParams } from 'ionic-angular';
import { CustomerdetailsPage } from '../../pages/customerdetails/customerdetails';
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
    if (this.booking.userData.device=='Gaming Console')
      this.navCtrl.push(CustomerdetailsPage);
    else
      this.navCtrl.push(TestInPage);    
  }

  completeCheckout(){
    console.log(this.booking.userData.selectedRepair);
    console.log(this.cart.selectedRepairs);
    this.booking.userData.selectedRepair = this.cart.selectedRepairs;
    console.log(this.booking.userData.selectedRepair);
    console.log(this.cart.selectedRepairs);
    this.navCtrl.push(CustomerdetailsPage);
  }
}
