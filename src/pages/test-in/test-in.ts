import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { UpgradeofferPage } from '../../pages/upgradeoffer/upgradeoffer';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private cart: CartProvider) {
  }

  ionViewDidLoad() {
    this.cart.goCheckout=0;
	this.cart.completeCheckout=0;
	//this.navigation.activePageIndex=13;
  }

  proceed(){
    this.navCtrl.setRoot(UpgradeofferPage);
  }

}
