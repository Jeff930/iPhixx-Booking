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
  
    screenrep_selected='0';
    headrep_selected='0';
    earrep_selected='0';
    powerrep_selected='0';
    rearcamrep_selected='0';
    frontcamrep_selected='0';
    homerep_selected='0';
    microphone_selected='0';
    chargeport_selected='0';
    volumerep_selected='0';
    battrep_selected='0';
    signalrep_selected='0';
    backglassrep_selected='0';
    harddriverep_selected='0';
    hdmirep_selected='0';
    
    laptopscreenrep_selected='0';
		laptopcamrep_selected='0';
		keyboardrep_selected='0';
		fanrep_selected='0';
		laptopspeakerrep_selected='0';
		datarecovery='0';
		virusremoval='0';
		virusremoval_withsoftware='0';
		HDDHalfTeraWithDataTransfer='0';
		HDDTeraWithDataTransfer='0';
		HDDHalfTera='0';
		HDDTera='0';
		SSDHalfTeraWithDataTransfer='0';
		SSDTeraWithDataTransfer='0';
		SSDHalfTera='0';
		SSDTera='0';
  
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
      console.log("selected",selectedRepair);
      if (selectedRepair=="Screen Replacement"){
        this.screenrep_selected = '1';
      }
      if (selectedRepair=="Headphone Repair"){
        this.headrep_selected = '1';
      }
      if (selectedRepair=="Earpiece Repair"){
        this.earrep_selected = '1';
      }
      if (selectedRepair=="Power Button Repair"){
        this.powerrep_selected = '1';
      }
      if (selectedRepair=="Rear Camera Repair"){
        this.rearcamrep_selected = '1';
      }
      if (selectedRepair=="Front Camera Repair"){
        this.frontcamrep_selected = '1';
      }
      if (selectedRepair=="Home Button Repair"){
        this.homerep_selected = '1';
      }
      if (selectedRepair=="Microphone Repair"){
        this.microphone_selected = '1';
      }
      if (selectedRepair=="Charger Port Repair"){
        this.chargeport_selected = '1';
      }
      if (selectedRepair=="Volume Button Repair"){
        this.volumerep_selected = '1';
      }
      if (selectedRepair=="Battery Replacement"){
        this.battrep_selected = '1';
      }
      if (selectedRepair=="Cellular Signal Repair"){
        this.signalrep_selected = '1';
      }
      if (selectedRepair=="Back Glass Repair"){
        this.backglassrep_selected = '1';
      }
      if (selectedRepair=="Hard Drive Repair"){
        this.harddriverep_selected = '1';
      }
      if (selectedRepair=="HDMI Port Replacement"){
        this.hdmirep_selected = '1';
      }

      if (selectedRepair=="Laptop Screen Replacement"){
        this.laptopscreenrep_selected = '1';
        ='0';
		='0';
		='0';
		='0';
		laptopspeakerrep_selected='0';
		datarecovery='0';
		virusremoval='0';
		virusremoval_withsoftware='0';
		HDDHalfTeraWithDataTransfer='0';
		HDDTeraWithDataTransfer='0';
		HDDHalfTera='0';
		HDDTera='0';
		SSDHalfTeraWithDataTransfer='0';
		SSDTeraWithDataTransfer='0';
		SSDHalfTera='0';
		SSDTera='0';
      }
      if (selectedRepair=="Keyboard Replacement"){
        this.keyboardrep_selected = '1';
      }
      if (selectedRepair=="Fan Replacement"){
        this.fanrep_selected = '1';
      }
      if (selectedRepair=="Laptop Camera Repair"){
        this.laptopcamrep_selected = '1';
      }
      if (selectedRepair=="Laptop Speaker Repair"){
        this.rearcamrep_selected = '1';
      }
      if (selectedRepair=="Laptop Charging Port Repair"){
        this.frontcamrep_selected = '1';
      }
      if (selectedRepair=="Data Recovery"){
        this.homerep_selected = '1';
      }
      if (selectedRepair=="Battery Replacement"){
        this.microphone_selected = '1';
      }
      if (selectedRepair=="Virus Removal with 1 free year of Anti-Virus Software"){
        this.chargeport_selected = '1';
      }
      if (selectedRepair=="Hard Drive Replacement - 500GB HDD (Operating System Reinstall)"){
        this.volumerep_selected = '1';
      }
      if (selectedRepair=="Hard Drive Replacement - 1TB HDD (Operating System Reinstall)"){
        this.battrep_selected = '1';
      }
      if (selectedRepair=="Hard Drive Replacement - 500GB SSD (Operating System Reinstall)"){
        this.signalrep_selected = '1';
      }
      if (selectedRepair=="Hard Drive Replacement - 1TB SSD (Operating System Reinstall)"){
        this.backglassrep_selected = '1';
      }
      if (selectedRepair=="Hard Drive Replacement - 500GB HDD (Operating System & Data Transfer)"){
        this.harddriverep_selected = '1';
      }
      if (selectedRepair=="Hard Drive Replacement - 1TB HDD (Operating System & Data Transfer)"){
        this.hdmirep_selected = '1';
      }
      if (selectedRepair=="Hard Drive Replacement - 500GB SSD (Operating System & Data Transfer)"){
        this.hdmirep_selected = '1';
      }
      if (selectedRepair=="Hard Drive Replacement - 1TB SSD (Operating System & Data Transfer)"){
        this.hdmirep_selected = '1';
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
    this.booking.repairKey={
      'screenrep_selected':this.screenrep_selected,
      'headrep_selected':this.headrep_selected,
      'earrep_selected':this.earrep_selected,
      'powerrep_selected':this.powerrep_selected,
      'rearcamrep_selected':this.rearcamrep_selected,
      'frontcamrep_selected':this.frontcamrep_selected,
      'homerep_selected':this.homerep_selected,
      'microphone_selected':this.microphone_selected,
      'chargeport_selected':this.chargeport_selected,
      'volumerep_selected':this.volumerep_selected,
      'battrep_selected':this.battrep_selected,
      'signalrep_selected':this.signalrep_selected,
      'backglassrep_selected':this.backglassrep_selected,
      'harddriverep_selected':this.harddriverep_selected,
      'hdmirep_selected':this.hdmirep_selected,
    }
    console.log(this.booking.repairKey);
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
    console.log(this.selectedRepairs[index]);
    if (index !== -1) {
      
      console.log(this.selectedRepairs[index]);
      if (this.selectedRepairs[index]=="Screen Replacement"){
        this.screenrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Headphone Repair"){
        this.headrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Earpiece Repair"){
        this.earrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Power Button Repair"){
        this.powerrep_selected = '0';
        console.log("removed");
      }
      if (this.selectedRepairs[index]=="Rear Camera Repair"){
        this.rearcamrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Front Camera Repair"){
        this.frontcamrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Home Button Repair"){
        this.homerep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Microphone Repair"){
        this.microphone_selected = '0';
      }
      if (this.selectedRepairs[index]=="Charger Port Repair"){
        this.chargeport_selected = '0';
      }
      if (this.selectedRepairs[index]=="Volume Button Repair"){
        this.volumerep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Battery Replacement"){
        this.battrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Cellular Signal Repair"){
        this.signalrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Back Glass Repair"){
        this.backglassrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="Hard Drive Repair"){
        this.signalrep_selected = '0';
      }
      if (this.selectedRepairs[index]=="HDMI Port Replacement"){
        this.backglassrep_selected = '0';
      }
      this.selectedRepairs.splice(index, 1);
      this.costs.splice(index,1);
  }else{
    console.log("hayy");
  }       
  this.checkMessage(); 
  }

  

}
