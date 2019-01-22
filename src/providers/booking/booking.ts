// import { HttpClient } from '@angular/common/http';
// import * as $ from "jquery";

import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { HomePage } from '../../pages/home/home';
import { ChoosemodelPage } from '../../pages/choosemodel/choosemodel';
import { ChoosebrandPage } from '../../pages/choosebrand/choosebrand';
import { ColorPage } from '../../pages/color/color';
import { NetworkPage } from '../../pages/network/network';
import { RepairPage } from '../../pages/repair/repair';
// import { Observable } from 'rxjs/Observable';
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
  result;
  device:string;
  brand:string;
  model:string;
  color:string;
  carrier:string;
  repair:string;
  selected;
  currentPage="Select Device";

  constructor(public http: Http) {
    console.log('Hello BookingProvider Provider');
    this.userData = [
    { 
      device : '',
      brand: '',
      model: '',
      color: '',
      network: '',
      selectedRepair:[''],
      phoneoffer: false,
      upgradeoffer1: false,
      upgradeoffer2: false,
      user: {
          fullname: '',
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

  doLogin(user){

  	

 //  	$.ajax({
	//   type: "POST",
	//   url: 'https://iphixx.repairshopr.com/api/v1/sign_in',
	//   data: {email:'ryan.margolin81@gmail.com' , password: 'Iphixx2016!'},
	//   success: function(res){console.log(res); this.result = res; console.log( this.result)},
	//   // dataType: dataType
	// });

 //  	$.post('https://iphixx.repairshopr.com/api/v1/sign_in',
 //  		{email:'ryan.margolin81@gmail.com' , password: 'Iphixx2016!'} , function(res){
		
	// 	result = res;

	// })

 //  	;
    // return this.http.post( 'https://iphixx.repairshopr.com/api/v1/sign_in' ,{ 
    // 	email : 'ryan.margolin81@gmail.com',
    // 	password : 'Iphixx2016!'

    // })


    // .map(res => res.json()  );

    //     return this.http.get(
    //      'https://iphixx.repairshopr.com/api/v1/payment_methods?api_key=e15f82f8-7ebb-41e8-8946-21b90dd47ada' )


    // .map(res => res.json()  );

    
    

  }

  

  gettrackinginfo(id){
  	return this.http.get('https://iphixx.repairshopr.com/api/v1/tickets/?number='+id+'&api_key=b60db6c6-2740-48c0-a0fa-34a49ecf6b3f')
  	.map(res => res.json() );
  }
  getcustomer(id){
    return this.http.get('https://iphixx.repairshopr.com/api/v1/customers/'+id+'?api_key=b60db6c6-2740-48c0-a0fa-34a49ecf6b3f')
    .map(res => res.json() );
  }

}
