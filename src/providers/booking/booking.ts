// import { HttpClient } from '@angular/common/http';
// import * as $ from "jquery";

import { Injectable } from '@angular/core';
import * as $ from "jquery";
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { Header } from 'ionic-angular/umd';

/*
  Generated class for the BookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingProvider {
  bookingNumber : any;
  userData : any;	
  repairKey:any;
  result;
  device:string;
  brand:string;
  model:string;
  color:string;
  carrier:string;
  repair:string;
  selected;
  currentPage="Select Device";
  agentName='';
  note='';
  mobileTest:any;
  nonMobileTest:any;
  locationName='';
  ticketNumber='';
  phone='';
  mobile='';
  created:any;
  apiUrl = 'https://api.sendinblue.com/v3/contacts';

  constructor(public http: Http,  ) {
    console.log('Hello BookingProvider Provider')
    this.userData = [
    { 
      device : '',
      deviceKey : '',
      brand: '',
      brandKey: '',
      model: '',
      modelKey: '',
      modelNum:'',
      color: '',
      colorKey: '0',
      network: '',
      networkKey: '0',
      selectedRepair:[''],
      phoneoffer: "0",
      screenoffer: "0",
      user: {
          firstname: '',
          lastname: '',
          birthdate:'',
          email: '',
          phone: '',
          phone2: '',
          pin : '',
          location:'',  
          }
    }
  ];
  this.device="not-selected";
  this.brand="not-selected";
  this.model="not-selected";
  this.color="not-selected";
  this.carrier="not-selected";
  this.repair="last-not-selected";
  this.selected=1;
  }

  updateCurrentPage(){
    console.log("heto" + this.currentPage);
    switch(this.selected){
      case 1:
        this.currentPage="Select Device";
      break;
      case 2:
        this.currentPage="Select Brand";
      break;
      case 3:
        this.currentPage="Select Model";
      break;
      case 4:
        this.currentPage="Select Color";
      break;
      case 5:
        this.currentPage="Select Carrier";
      break;
      case 6:
        this.currentPage="Select Repair";
      break;
      default:
    }
  }

  gettrackinginfo(id){
  	return this.http.get('https://admin.iphixx.com/api/v1/bookings/ticket/'+id)
  	.map(res => res.json() );
  }

  getInvoice(id){
    return this.http.get('https://admin.iphixx.com/api/v1/bookings/invoice/'+id)
  	.map(res => res.json() );
  }
  getcustomer(id){
    return this.http.get('https://iphixx.repairshopr.com/api/v1/customers/'+id+'?api_key=8e5044d0-6f23-49ef-9c9a-25c516f3debc')
    .map(res => res.json() );
  }
  
}
