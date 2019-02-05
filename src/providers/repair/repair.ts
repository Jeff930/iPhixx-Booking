import { Injectable } from '@angular/core';

import { BookingProvider } from '../../providers/booking/booking';

import { mobilerepairs } from '../../models/mobilerepairs'
import { iphonemodels } from '../../models/iphonemodels';
import { samsungmodels } from '../../models/samsungmodels';
import { huaweimodels } from '../../models/huaweimodels';
import { huaweitablet } from '../../models/huaweitabletmodel';
import { sonymodels } from '../../models/sonymodels';
import { nokiamodels } from '../../models/nokiamodels';

import { ipadmodels } from '../../models/ipadmodels';
import { samsungtablet } from '../../models/samsungtabletmodel';
import { isRightSide } from 'ionic-angular/umd/util/util';
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

  repairs = mobilerepairs;
  modelrepairs =[];

  prices=[];
  models = [];

  constructor(public booking:BookingProvider) {}
  
  updatemodelrepairs(){

    this.brand=this.booking.userData.brand;
    this.model=this.booking.userData.model;
    this.device=this.booking.userData.device;
    console.log("model"+this.model);
    console.log("device" + this.device);

    // if(this.booking.userData.device == 'Phone'){	

    //   if(this.booking.userData.brand == 'iPhone'){
    //     this.models = iphonemodels;
    //   }
    //   else if(this.booking.userData.brand == 'Samsung'){
    //     this.models = samsungmodels;
    //   }
    // else if(this.booking.userData.brand == 'Huawei'){
    //       this.models = huaweimodels;
    //       console.log("Huawei");
    // }
    //   else if(this.booking.userData.brand == 'Sony'){
    //       this.models = sonymodels;
    // }
    // else if(this.booking.userData.brand == 'Nokia'){
    //           this.models = nokiamodels;
    // }

  // }

  // else{
  //   if(this.booking.userData.brand == 'iPad'){
  //     this.models = ipadmodels;
  //   }
  //   else if (this.booking.userData.brand == 'Samsung') {
  //     this.models = samsungtablet;
  //   }
  //   else{
  //     this.models = huaweitablet;
  //   }
  //}

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
      if (this.device =="Tablet"){
        console.log("worked");
        this.other=1;
      }      
    }
  }
  }

  getmodelrepairs(){
    return this.modelrepairs;
  }

}
