import * as $ from "jquery";
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { BookingProvider } from '../../providers/booking/booking';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { networks } from '../../models/network';

import { RepairPage } from '../repair/repair';

 
/**
 * Generated class for the NetworkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-network',
  templateUrl: 'network.html',
})
export class NetworkPage {
  networks = networks;
  device:string;
  brand:string;
  model:string;
  


  constructor(public navCtrl: NavController, public navParams: NavParams , public booking : BookingProvider,public modalCtrl : ModalController,public navigation: NavigationProvider,) {
  	this.device =  this.booking.userData.device+', '+this.booking.userData.brand+', '+
  	this.booking.userData.model+', '+this.booking.userData.color;
    this.brand=this.booking.userData.brand;
    this.model=this.booking.userData.model;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkPage');
  }

  selectNetwork(network){
    if (network=='Other'){
      this.presentPrompt();
    }else{
  	this.booking.userData.network = network;
  	this.navCtrl.push(RepairPage);}
  }

  presentPrompt() {
    var data = { source : 'network' };
    var modalPage = this.modalCtrl.create('ModalPage',data,{cssClass: 'modal-content' });modalPage.present(); 
 }

  Othernetwork(network){
    this.booking.userData.network = network;
    this.navCtrl.push(RepairPage);
  }

  ionViewWillEnter(){
    this.booking.carrier="selected";
		
		this.booking.selected=5;
    if (this.booking.selected==5){
      this.booking.device="selected";
      this.booking.brand="selected";
      this.booking.model="selected";
      this.booking.color="selected";
      this.booking.carrier="last-selected";
      this.booking.repair="last-not-selected";
    }
    this.navigation.activePageIndex=11;
  }
  }

