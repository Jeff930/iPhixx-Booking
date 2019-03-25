// import { HttpClient } from '@angular/common/http';
// import * as $ from "jquery";

import { Injectable } from '@angular/core';
import * as $ from "jquery";
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

/*
  Generated class for the BookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingProvider {
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

  constructor(public http: Http,  ) {
    console.log('Hello BookingProvider Provider');
    this.repairKey=[{
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
    }];
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
      colorKey: '',
      network: '',
      networkKey: '',
      selectedRepair:[''],
      phoneoffer: false,
      upgradeoffer1: false,
      user: {
          firstname: '',
          lastname: '',
          birthdate:'',
          email: '',
          phone: '',
          phone2: '',
          pin : ''  
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
  	return this.http.get('https://iphixx.repairshopr.com/api/v1/tickets/?number='+id+'&api_key=79bc78aa-81d3-4d8c-94db-5a07a0374670')
  	.map(res => res.json() );
  }
  getcustomer(id){
    return this.http.get('https://iphixx.repairshopr.com/api/v1/customers/'+id+'?api_key=b60db6c6-2740-48c0-a0fa-34a49ecf6b3f')
    .map(res => res.json() );
  }

}
