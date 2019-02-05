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
      var unselected = document.getElementsByClassName("repair");
      unselected[index].setAttribute("style","background-color:lightgray");}
      this.selectedRepairs.push(selectedRepair);
      this.selectedIndex.push(index);
      console.log(price);
      console.log(index);
      this.costs.push(price);
      this.Total=this.Total + parseInt(price);

    }else{
      console.log("already selected");
    }
      this.checkMessage();

  }

 

  checkSelected(){
    var unselected = document.getElementsByClassName("repair");
    if (this.selectedIndex!=null){
    for (let i=0;i<=this.selectedIndex.length;i++){
      try{
      unselected[this.selectedIndex[i]].setAttribute("style","background-color:lightgray");
      }
      catch{
        console.log("hello")
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
    var index;
    console.log("model" + JSON.stringify(this.repair.modelrepairs));
    for (let i=0;i<this.repair.modelrepairs.length;i++){
        if (this.repair.modelrepairs[i]==repair){
          index = i;
          this.Total=this.Total - parseInt(this.costs[selectedIndex]);
        }
    }
    if (repair == 'Temporary Phone') {
      this.Total=this.Total - 50;
      console.log("true")
    }
    if (repair == 'Nano Technology Tempered Glass') {
      this.Total=this.Total - 25;
      console.log("true2")
    }

    var selected = document.getElementsByClassName("repair");
    console.log("thissss" + JSON.stringify(index));
    try{
    selected[index].setAttribute("style","background-color:white");
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
  }       
  this.checkMessage(); 
  }

  

}
