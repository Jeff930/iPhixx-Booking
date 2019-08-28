import { Injectable } from '@angular/core';
import { mobilerepairs } from '../../models/mobilerepairs'
import { RepairProvider } from '../../providers/repair/repair';
import { BookingProvider } from '../../providers/booking/booking';
import { NavigationProvider } from '../../providers/navigation/navigation';
/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {
  selectedRepairs:Array<string>;
  selectedIndex:Array<number>;
  cartMessage: string;
  Total;
  goCheckout;
  completeCheckout;
  repairs = mobilerepairs;
  costs=[];
  selected;
  unselected;
  otherRepairSelected=false;
  customRepair="";
  customRepairPrice='';
  repairKey={
    screenrep_selected:null,
    headrep_selected:null,
    earrep_selected:null,
    powerrep_selected:null,
    rearcamrep_selected:null,
    frontcamrep_selected:null,
    homerep_selected:null,
    microphone_selected:null,
    chargeport_selected:null,
    volumerep_selected:null,
    battrep_selected:null,
    signalrep_selected:null,
    backglassrep_selected:null,
  };



  constructor(public repair: RepairProvider,public booking:BookingProvider,public navigation:NavigationProvider) {
    console.log('Hello CartProvider Provider');
    this.selectedRepairs=[];
    this.selectedIndex=[];
    this.cartMessage="There are currently no items in your cart.";
    this.Total=0;
  }

  updateRepairs(selectedRepair:string,index,price){
    this.goCheckout=1;
    this.completeCheckout=0; 
    if (this.selectedRepairs.indexOf(selectedRepair)==-1){
      if (index!=null){
      this.unselected = document.getElementsByClassName("repair");
      console.log(this.unselected);
      this.unselected[index].setAttribute("style","background-color:lightgray");}
      this.selectedRepairs.push(selectedRepair);
      if (selectedRepair=="Screen Replacement"){
        this.repairKey.screenrep_selected.append('1');
      }else{
        this.repairKey.screenrep_selected = '0';
      }
      if (selectedRepair=="Headphone Repair"){
        this.repairKey.headrep_selected = '1';
      }else{
        this.repairKey.headrep_selected = '0';
      }
      if (selectedRepair=="Earpiece Repair"){
        this.repairKey.earrep_selected = '1';
      }else{
        this.repairKey.earrep_selected = '0';
      }
      if (selectedRepair=="Power Button Repair"){
        this.repairKey.powerrep_selected = '1';
      }else{
        this.repairKey.powerrep_selected = '0';
      }
      if (selectedRepair=="Rear Camera Repair"){
        this.repairKey.rearcamrep_selected = '1';
      }else{
        this.repairKey.rearcamrep_selected = '0';
      }
      if (selectedRepair=="Front Camera Repair"){
        this.repairKey.frontcamrep_selected = '1';
      }else{
        this.repairKey.frontcamrep_selected = '0';
      }
      if (selectedRepair=="Home Button Repair"){
        this.repairKey.homerep_selected = '1';
      }else{
        this.repairKey.homerep_selected = '0';
      }
      if (selectedRepair=="Microphone Repair"){
        this.repairKey.microphone_selected = '1';
      }else{
        this.repairKey.microphone_selected = '0';
      }
      if (selectedRepair=="Charger Port Repair"){
        this.repairKey.chargeport_selected = '1';
      }else{
        this.repairKey.chargeport_selected = '0';
      }
      if (selectedRepair=="Volume Button Repair"){
        this.repairKey.volumerep_selected = '1';
      }else{
        this.repairKey.volumerep_selected = '0';
      }
      if (selectedRepair=="Battery Replacement"){
        this.repairKey.battrep_selected = '1';
      }else{
        this.repairKey.battrep_selected = '0';
      }
      if (selectedRepair=="Cellular Signal Repair"){
        this.repairKey.signalrep_selected = '1';
      }else{
        this.repairKey.signalrep_selected = '0';
      }
      if (selectedRepair=="Back Glass Repair"){
        this.repairKey.backglassrep_selected = '1';
      }else{
        this.repairKey.backglassrep_selected = '0';
      }
      this.selectedIndex.push(index);
      console.log(price);
      console.log(index);
      this.costs.push(price);
      this.Total=this.Total + parseInt(price);

    }else{
      let a;
      let indexRepair;
      for (let b = 0; b<this.selectedRepairs.length; b++) {
        if (selectedRepair==this.selectedRepairs[b]) {
          a=this.selectedRepairs[b];
          indexRepair = b;
        }
      }
      console.log(a);
      this.removeIndex(a, indexRepair);
    }
      this.checkMessage();

  }

  otherRepair(option,cost){
    console.log(cost);
    this.unselected = document.getElementsByClassName("repair");
    this.customRepair=option;
    this.customRepairPrice=cost;
    this.updateRepairs(option,this.unselected.length-1,cost);
  }

 

  checkSelected(){
    this.unselected = document.getElementsByClassName("repair");
    console.log(JSON.stringify(this.selectedIndex));
    console.log(this.unselected[this.selectedIndex[0]]);
    console.log(this.unselected[1]);
    if (this.selectedIndex!=null){
    for (let i=0;i<=this.selectedIndex.length;i++){
      try{
        console.log(this.unselected[this.selectedIndex[i]]);
      this.unselected[this.selectedIndex[i]].setAttribute("style","background-color:lightgray");
      }
      catch(e){
        console.log(e);
      }
   }}}

  checkMessage(){
    if (this.selectedRepairs.length==0){
      this.cartMessage="There are currently no items in your cart.";
      this.Total=0;
      this.goCheckout=0;
      this.completeCheckout=0;
    }else{
    this.cartMessage="Selected Repair Option/s :";
    if (this.completeCheckout==1)
      this.goCheckout=0;
    else
      if (this.navigation.activePageIndex==13||this.navigation.activePageIndex==14){
        this.goCheckout=0;
      }else{
        this.goCheckout=1;
      }
    }
  }

  removeIndex(repair,selectedIndex){
    console.log(selectedIndex);
    console.log(repair);
    console.log(this.costs[selectedIndex]);
    var index;
    console.log("model" + JSON.stringify(this.repair.modelrepairs));
    this.selected = document.getElementsByClassName("repair");

    switch (repair){
      case 'Temporary Phone':
        this.Total=this.Total - 50;
        this.booking.userData.phoneoffer=false;
      break;

      case 'Nano Technology Tempered Glass':
        this.Total=this.Total - 15;
        this.booking.userData.screenoffer=false;
      break;
      
      default:
        if (this.repair.modelrepairs.indexOf(repair)==-1){
          if (this.otherRepairSelected==true){
            this.otherRepairSelected=false;
            this.customRepair="";
            this.customRepairPrice='';
            index = this.selected.length-1;
          }
          this.Total=this.Total - parseInt(this.costs[selectedIndex]);
        }else{
          index=this.repair.modelrepairs.indexOf(repair);
          this.Total=this.Total - parseInt(this.costs[selectedIndex]);
        }
    }

    console.log(index);
    console.log(this.selected);
    console.log("thissss" + JSON.stringify(index));
    try{
    this.selected[index].setAttribute("style","background-color:white");
    this.selectedIndex.splice(this.selectedIndex.indexOf(index),1);
    
    console.log("indexx"+index)
    }
    catch{
      console.log("hi");
    }
    this.removeRepair(selectedIndex);
  }

  removeRepair(index){
    if (index !== -1) {
      this.selectedRepairs.splice(index, 1);
      this.costs.splice(index,1);
      if (this.selectedRepairs[index]=="Screen Replacement"){
        this.repairKey.screenrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Headphone Repair"){
        this.repairKey.headrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Earpiece Repair"){
        this.repairKey.earrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Power Button Repair"){
        this.repairKey.powerrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Rear Camera Repair"){
        this.repairKey.rearcamrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Front Camera Repair"){
        this.repairKey.frontcamrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Home Button Repair"){
        this.repairKey.homerep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Microphone Repair"){
        this.repairKey.microphone_selected = '0';
      }
      if (this.selectedRepairs[index]=="Charger Port Repair"){
        this.repairKey.chargeport_selected = '0';
      }
      if (this.selectedRepairs[index]=="Volume Button Repair"){
        this.repairKey.volumerep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Battery Replacement"){
        this.repairKey.battrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Cellular Signal Repair"){
        this.repairKey.signalrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Back Glass Repair"){
        this.repairKey.backglassrep_selected = '0';
      }
  }       
  this.checkMessage(); 
  }

  

}
