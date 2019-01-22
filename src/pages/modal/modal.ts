import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { BookingProvider } from '../../providers/booking/booking';
import { NetworkPage } from '../network/network';
import { RepairPage } from '../repair/repair';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  question:string;
  tip:string;
  source:string;
  input:string;


  constructor(public navCtrl: NavController, public viewCtrl : ViewController, public navParams: NavParams,public booking : BookingProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage' + this.navParams.get('source'));
    this.source=this.navParams.get('source');
    if ( this.source =='color'){
      this.question = "Other Color";
      this.tip = "What color is your phone?"
    }else{
      this.question = "Other Carrier Name";
      this.tip = "What carrier do you have?"
    }
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  Done(){
    if ( this.source =='color'){
      this.booking.userData.color = this.input;
      this.navCtrl.push(NetworkPage);
    }else{
      this.booking.userData.network = this.input;
      this.navCtrl.push(RepairPage);
    }

}}
