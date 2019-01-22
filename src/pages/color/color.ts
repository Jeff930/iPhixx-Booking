import * as $ from "jquery";
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { colors } from '../../models/color';
import { BookingProvider } from '../../providers/booking/booking';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { ModalController } from 'ionic-angular';
import { NetworkPage } from '../network/network';


/**
 * Generated class for the ColorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-color',
  templateUrl: 'color.html',
})
export class ColorPage {
  colors = colors;
  device:string;
  brand:string;
  model:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public booking : BookingProvider,public modalCtrl : ModalController,public navigation: NavigationProvider,) {
    this.device =  this.booking.userData.device+', '+this.booking.userData.brand+', '+this.booking.userData.model ;
    this.brand=this.booking.userData.brand;
    this.model=this.booking.userData.model;
  }

  ionViewWillEnter(){
    this.booking.color="selected";
		
    this.booking.selected=4;
    if (this.booking.selected==4){
      this.booking.device="selected";
      this.booking.brand="selected";
      this.booking.model="selected";
      this.booking.color="last-selected";
      this.booking.carrier="not-selected";
      this.booking.repair="last-not-selected";
    }
    this.booking.updateCurrentPage();
    this.navigation.activePageIndex=10;
    
  }

  selectColor(color){
    console.log(JSON.stringify(color));
    if (color=='Other'){
      this.presentPrompt();
    }else{
      this.booking.userData.color = color;
      this.navCtrl.push(NetworkPage);
    }
  }

  presentPrompt() {
     var data = { source : 'color' };
     var modalPage = this.modalCtrl.create('ModalPage',data,{cssClass: 'modal-content' });modalPage.present(); 
  }

  Othercolor(color){
    this.booking.userData.color = color;
    this.navCtrl.push(NetworkPage);
  }
}
