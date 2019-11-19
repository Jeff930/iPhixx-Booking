import { Injectable } from '@angular/core';

import { BookingProvider } from '../../providers/booking/booking';

import { mobilerepairs } from '../../models/mobilerepairs';
import { laptoprepairs } from '../../models/laptoprepairs';
import { gamerepairs } from '../../models/gamerepairs';

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
  deposit = [];
  prices=[];
  models = [];

  constructor(public booking:BookingProvider) {
    if (this.booking.userData.device=='Gaming Console'){
      this.repairs = gamerepairs;
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
      this.deposit.push(this.repairs[i].deposit);
      console.log("laptop"+this.modelrepairs);}
    }else{ 
      if (this.booking.userData.device=='Phone'
          ||this.booking.userData.device=='Tablet'
          ||this.booking.userData.device=='MacBook'){
      
    
  for (var i=0;i<this.models.length;i++){
    console.log(this.models[i].model_name+this.booking.userData.model);
    console.log(this.models[i].model_number+this.booking.userData.modelNum);
    if (this.booking.userData.model == this.models[i].model_name&&this.booking.userData.modelNum == this.models[i].model_number){
      console.log("true")
      if (this.models[i].screenrep_price!=null){
        this.prices.push(this.models[i].screenrep);
        this.modelrepairs.push("Screen Replacement");
        console.log("Screen Rep");
      }
      if (this.models[i].headrep_price!=null){
        this.prices.push(this.models[i].headphonerep);
        this.modelrepairs.push("Headphone Repair");
      }
      if (this.models[i].earrep_price!=null){
        this.prices.push(this.models[i].earpiecerep);
        this.modelrepairs.push("Earpiece Repair");
      }
	    if (this.models[i].powerrep_price!=null){
        this.prices.push(this.models[i].powerrep);
        this.modelrepairs.push("Power Button Repair");
      }
      if (this.models[i].rearcamrep_price!=null){
        this.prices.push(this.models[i].rearcamrep);
        this.modelrepairs.push("Rear Camera Repair");
      }
      if (this.models[i].frontcamrep_price!=null){
        this.prices.push(this.models[i].frontcamrep);
        this.modelrepairs.push("Front Camera Repair");
      }
      if (this.models[i].homerep_price!=null){
        this.prices.push(this.models[i].homerep);
        this.modelrepairs.push("Home Button Repair");
      }
      if (this.models[i].microphone_price!=null){
        this.prices.push(this.models[i].upmicrep);
        this.modelrepairs.push("Microphone Repair");
      }
      if (this.models[i].chargeport_price!=null){
        this.prices.push(this.models[i].chargeportrep);
        this.modelrepairs.push("Charger Port Repair");
      }
      if (this.models[i].volumerep_price!=null){
        this.prices.push(this.models[i].volumerep);
        this.modelrepairs.push("Volume Button Repair");
      }
      if (this.models[i].battrep_price!=null){
        this.prices.push(this.models[i].battrep);
        this.modelrepairs.push("Battery Replacement");
      }
      if (this.models[i].signalrep_price!=null){
        this.prices.push(this.models[i].signalrep);
        this.modelrepairs.push("Cellular Signal Repair");
      }
      if (this.models[i].backglassrep_price!=null){
        this.prices.push(this.models[i].backglassrep);
        this.modelrepairs.push("Back Glass Repair");
      }
      if (this.models[i].trackpadrep_price!=null){
        this.prices.push(this.models[i].trackpadrep);
        this.modelrepairs.push("Trackpad Replacement");
      }
        this.other=1;
    }
  }}}
  console.log(this.modelrepairs);
  }

  getmodelrepairs(){
    return this.modelrepairs;
  }

}