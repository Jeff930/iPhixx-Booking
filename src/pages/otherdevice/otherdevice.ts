import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingProvider } from '../../providers/booking/booking';
import { ColorPage } from '../color/color';
import { NavigationProvider } from '../../providers/navigation/navigation';
/**
 * Generated class for the OtherdevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otherdevice',
  templateUrl: 'otherdevice.html',
})
export class OtherdevicePage {

  device:string;
  models = [];
  brand : string;
  model : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public booking : BookingProvider,public navigation: NavigationProvider,) {
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
    this.navigation.activePageIndex=8;
    this.navigation.other=1;
	}

  selectModel(){
    this.booking.userData.brand = this.brand;
    this.device = this.booking.userData.device+', '+this.booking.userData.brand;
    this.booking.userData.model = this.model;
    this.navCtrl.push(ColorPage);
  }

}
