import { Injectable } from '@angular/core';

import { BookingProvider } from '../../providers/booking/booking';

import { mobilerepairs } from '../../models/mobilerepairs';
import { laptoprepairs } from '../../models/laptoprepairs';
import { gamerepairs } from '../../models/gamerepairs';
import { macbookrepairs } from '../../models/macbookrepairs';

/*
  Generated class for the RepairProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RepairProvider {

  brand:string;
  model:string;
  device:string;
  other=0;

  repairs;
  modelrepairs =[];

  prices=[];
  models = [];

  constructor(public booking:BookingProvider) {
    if (this.booking.userData.device=='Gaming Console'){
      this.repairs = gamerepairs;
    }
    if (this.booking.userData.device=='MacBook'){
      this.repairs = macbookrepairs;
    }
    if (this.booking.userData.device=='Laptop'){
      this.repairs = laptoprepairs;
    }else{ 
      this.repairs = mobilerepairs;
    }
  }
  
  updatemodelrepairs(){
    this.brand=this.booking.userData.brand;
    this.model=this.booking.userData.model;
    this.device=this.booking.userData.device;
    console.log("model"+this.model);
    console.log("device" + this.device);

    if (this.booking.userData.device=='Gaming Console'){
      this.repairs = gamerepairs;
      for (var i=0;i<this.repairs.length;i++){
      this.modelrepairs.push(this.repairs[i].repair);
      this.prices.push(this.repairs[i].price);
      console.log("game"+this.modelrepairs);}
    }
    
    if (this.booking.userData.device=='Laptop'){
      this.repairs = laptoprepairs;
      for (var i=0;i<this.repairs.length;i++){
      this.modelrepairs.push(this.repairs[i].repair);
      this.prices.push(this.repairs[i].price);
      console.log("laptop"+this.modelrepairs);}
    }else{ 
      
    
  for (var i=0;i<this.models.length;i++){
    if (this.booking.userData.model == this.models[i].model){
      console.log("true")
      if (this.models[i].screenrep!=null){
        this.prices.push(this.models[i].screenrep);
        this.modelrepairs.push("Screen Replacement");
        console.log("Screen Rep");
      }
      if (this.models[i].headphonerep!=null){
        this.prices.push(this.models[i].headphonerep);
        this.modelrepairs.push("Headphone Repair");
      }
      if (this.models[i].earpiecerep!=null){
        this.prices.push(this.models[i].earpiecerep);
        this.modelrepairs.push("Earpiece Repair");
      }
	    if (this.models[i].powerrep!=null){
        this.prices.push(this.models[i].powerrep);
        this.modelrepairs.push("Power Button Repair");
      }
      if (this.models[i].rearcamrep!=null){
        this.prices.push(this.models[i].rearcamrep);
        this.modelrepairs.push("Rear Camera Repair");
      }
      if (this.models[i].frontcamrep!=null){
        this.prices.push(this.models[i].frontcamrep);
        this.modelrepairs.push("Front Camera Repair");
      }
      if (this.models[i].homerep!=null){
        this.prices.push(this.models[i].homerep);
        this.modelrepairs.push("Home Button Repair");
      }
      if (this.models[i].upmicrep!=null){
        this.prices.push(this.models[i].upmicrep);
        this.modelrepairs.push("Microphone Repair");
      }
      if (this.models[i].chargeportrep!=null){
        this.prices.push(this.models[i].chargeportrep);
        this.modelrepairs.push("Charger Port Repair");
      }
      if (this.models[i].volumerep!=null){
        this.prices.push(this.models[i].volumerep);
        this.modelrepairs.push("Volume Button Repair");
      }
      if (this.models[i].battrep!=null){
        this.prices.push(this.models[i].battrep);
        this.modelrepairs.push("Battery Replacement");
      }
      if (this.models[i].signalrep!=null){
        this.prices.push(this.models[i].signalrep);
        this.modelrepairs.push("Cellular Signal Repair");
      }
      if (this.models[i].backglassrep!=null){
        this.prices.push(this.models[i].backglassrep);
        this.modelrepairs.push("Back Glass Repair");
      }
      if (this.models[i].trackpadrep!=null){
        this.prices.push(this.models[i].trackpadrep);
        this.modelrepairs.push("Trackpad Replacement");
      }
      if (this.device =="Tablet"){
        console.log("worked");
        this.other=1;
      }      
    }
  }}
  console.log(this.modelrepairs);
  }

  getmodelrepairs(){
    return this.modelrepairs;
  }

}
