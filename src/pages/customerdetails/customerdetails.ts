import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController  } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { NavigationProvider } from '../../providers/navigation/navigation';

import { BookingProvider } from '../../providers/booking/booking';

import { ModalController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { ConfirmationPage } from '../../pages/confirmation/confirmation';


/**
 * Generated class for the CustomerdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-customerdetails',
  templateUrl: 'customerdetails.html',
})
export class CustomerdetailsPage {
  customerDetails: FormGroup;
  assignCustomerForm: FormGroup;
  error_message: string;
  smsService;
  consentStore;
  consentBusiness;
  device;
  brand;
  model;
  color;
  carrier;
  pin;
  screenProtect;
  tempPhone;
  notes;

  screenRep="No";
  trackpadRep="No";
  earPieceRep="No";
  powerRep="No";
  headRep="No";
  rearCamRep="No";
  frontCamRep="No";
  homeRep="No";
  micRep="No";
  chargePortRep="No";
  backGlassRep="No";
  volumeRep="No";
  battRep="No";
  harddriveRep="No";
  birthdate="No";
  signalRep="No";
  hdmiRep="No";
  keyboardRep="No";
  fanRep="No";
  webCamRep="No";
  speakerRep="No";
  dataRecovery="No";
  virusRemoval="No";
  SSD500GBOS="No";
  SSD1TBOS="No";
  HDD500GBOS="No";
  HDD1TBOS="No";
  SSD500GBOSDT="No";
  SSD1TBOSDT="No";
  HDD500GBOSDT="No";
  HDD1TBOSDT="No";

  lockTest="Can't Test";
  sdTest="Can't Test";
  frontCamTest="Can't Test";
  rearCamTest="Can't Test";
  homeTest="Can't Test";
  volumeTest="Can't Test";
  earpieceTest="Can't Test";
  headphoneTest="Can't Test";
  vibrateTest="Can't Test";
  lightSensorTest="Can't Test";
  speakerTest="Can't Test";
  micTest="Can't Test";
  moistureTest="Can't Test";
  powerTest="Can't Test";
  wifiTest="Can't Test";
  barredTest="Can't Test";
  displayTest="Can't Test";
  systemBootTest="Can't Test";
  audioTest="Can't Test";
  keyboardTest="Can't Test";
  touchpadtest="Can't Test";
  portTest="Can't Test";
  webCamTest="Can't Test";
  battTest="Can't Test";
  harddriveTest="Can't Test";
  customRepair="";
  customRepairPrice='';

  searchInput="";
  filter=false;

  locations;
  selectedRepairs = this.cart.selectedRepairs;
  action="Create Customer";

  customers;
  selectedCustomer=[{
	location:null,
	birthdate:null,
}]

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public booking: BookingProvider,
		public alertCtrl: AlertController,
		public navigation: NavigationProvider,
		public modalCtrl : ModalController,
		public cart:CartProvider


     ) {

		this.action="Create Customer";
				this.customerDetails = formBuilder.group({
					'firstname':['', Validators.compose([Validators.required])],
					'lastname':['', Validators.compose([Validators.required])],
					'birthdate':['', Validators.compose([Validators.required])],
					'email':['', Validators.compose([Validators.required])],
					'phone':['', Validators.compose([Validators.required])],
					'phone2':['', Validators.compose([Validators.required])],
					//'location':['', Validators.compose([Validators.required])],
					'smsService':[],
					'consentStore':[],
					// //'consentStoreSource':[],
					'consentBusiness':[],
					// //'consentBusinessSource':[],
					'consentMarketing':[],
					// //'consentMarketingSource':[],
					// // 'portalInvite':[],
					// // 'portalInviteSource':[],
					'pin':['', Validators.compose([Validators.required])],
				});
				this.assignCustomerForm = formBuilder.group({
					//'location':['', Validators.compose([Validators.required])],
					'pin':['', Validators.compose([Validators.required])],
					'smsService':[],
				});
				//this.locations=JSON.parse(localStorage.getItem('locations'));
				//console.log(JSON.parse(this.locations));
				//console.log([this.locations]);
				


  }

  ionViewDidLoad() {
		console.log('ionViewDidLoad CustomerdetailsPage');
		this.navigation.activePageIndex=15;
  }

  Search(){
	this.filter=true;
	// let loading = this.loadingCtrl.create({
	// 	//content: 'Creating Customer...'
	//  });
	//  loading.present();
	 let xhr = new XMLHttpRequest();
	 //xhr.withCredentials = true;
 
	 xhr.addEventListener("readystatechange",  () =>{
	   if (xhr.readyState === 4) {
		 console.log(xhr.responseText);
		 let result = JSON.parse(xhr.responseText);
		 this.customers =result.customers;
		 console.log(this.customers);
		 console.log(this.customers.length);
		 //console.log("id",result.customer.id);
		   if(this.customers!=undefined){
			 //loading.dismiss();
			 if (this.customers.length==0){
				document.getElementById("emptyResult").style.display="block";
				document.getElementById("result").style.display="none";
			 }else{
				document.getElementById("emptyResult").style.display="none";
				document.getElementById("result").style.display="block";
			 }
			 //localStorage.setItem('authenticated' , JSON.stringify(result));
			 //this.booking.userData.customer_id = result.user_id;
			 //console.log(result.customer.id);
			 //this.createTicket(user,result.customer.id);
			 //this.navCtrl.setRoot(ConfirmationPage);
		  }
		   else{
			//loading.dismiss();
			 let alert = this.alertCtrl.create({
			   title: 'Error: Customers Details Not Received',
			   subTitle: this.customers.message,
			   buttons: ['Ok']
			 });
			 alert.present();
		  }
	   }
	 });
	 console.log(JSON.stringify(this.booking.userData));
	 var userData = JSON.stringify(this.booking.userData);
	 userData = userData.substring(1,userData.length-1);
	 console.log(userData);
	 // var url = "https://cors-anywhere.herokuapp.com/https://iphixx.repairshopr.com/api/v1/customers?api_key=79bc78aa-81d3-4d8c-94db-5a07a0374670&email="+
	 // 	user.email+"&mobile="+user.phone+"&lastname="+user.lastname+"&firstname="+user.firstname+"&phone="+user.phone+"&properties="+JSON.stringify(properties);
		 //+"&properties="+userData;
		 var url = "https://cors-anywhere.herokuapp.com/https://iphixx.repairshopr.com/api/v1/customers?api_key=8e5044d0-6f23-49ef-9c9a-25c516f3debc&query="+this.searchInput;
	 console.log(url);
	 xhr.open("GET", url);
	// xhr.open("POST", "https://admin.iphixx.com/api/v1/customers/sign-in");
 
	 xhr.send();

  }

  selectCustomer(){
	this.action = "Select Customer";
	this.getCustomerList(1);
  }

  getCustomerList(page){
	this.filter=false;
	// let loading = this.loadingCtrl.create({
	// 	//content: 'Creating Customer...'
	//  });
	//  loading.present();
	 let xhr = new XMLHttpRequest();
	 //xhr.withCredentials = true;
 
	 xhr.addEventListener("readystatechange",  () =>{
	   if (xhr.readyState === 4) {
		 console.log(xhr.responseText);
		 let result = JSON.parse(xhr.responseText);
		 this.customers =result.customers;
		 console.log(this.customers);
		 console.log(this.customers.length);
		 //console.log("id",result.customer.id);
		   if(this.customers!=undefined){
			 //loading.dismiss();
			 document.getElementById("emptyResult").style.display="none";
			 document.getElementById("result").style.display="block";
			 //localStorage.setItem('authenticated' , JSON.stringify(result));
			 //this.booking.userData.customer_id = result.user_id;
			 //console.log(result.customer.id);
			 //this.createTicket(user,result.customer.id);
			 //this.navCtrl.setRoot(ConfirmationPage);
		  }
		   else{
			//loading.dismiss();
			 let alert = this.alertCtrl.create({
			   title: 'Error: Customers Details Not Received',
			   subTitle: this.customers.message,
			   buttons: ['Ok']
			 });
			 alert.present();
		  }
	   }
	 });
	 console.log(JSON.stringify(this.booking.userData));
	 var userData = JSON.stringify(this.booking.userData);
	 userData = userData.substring(1,userData.length-1);
	 console.log(userData);
	 // var url = "https://cors-anywhere.herokuapp.com/https://iphixx.repairshopr.com/api/v1/customers?api_key=79bc78aa-81d3-4d8c-94db-5a07a0374670&email="+
	 // 	user.email+"&mobile="+user.phone+"&lastname="+user.lastname+"&firstname="+user.firstname+"&phone="+user.phone+"&properties="+JSON.stringify(properties);
		 //+"&properties="+userData;
		 var url = "https://cors-anywhere.herokuapp.com/https://iphixx.repairshopr.com/api/v1/customers?api_key=8e5044d0-6f23-49ef-9c9a-25c516f3debc&page="+page;
	 console.log(url);
	 xhr.open("GET", url);
	// xhr.open("POST", "https://admin.iphixx.com/api/v1/customers/sign-in");
 
	 xhr.send();
  }

  newCustomer(){
	this.action = "Create Customer";
  }

//   check(user){
// 	  console.log(user);
// 	  if(user.consentStore){
// 		if(user.consentMarketing){
// 			//this.createCustomer(user);
// 			this.prepareData(user,'');
// 		  }else{
// 			let alert = this.alertCtrl.create({
// 				title: 'Required Consent for Marketing',
// 				subTitle: 'Please check the Consent to Email for Marketing',
// 				buttons: ['Ok']
// 			  });
// 			  alert.present();
// 		  }
// 	  }else{
// 		let alert = this.alertCtrl.create({
// 			title: 'Required Consent for Storing Data',
// 			subTitle: 'Please check the Consent to Store Data checkbox',
// 			buttons: ['Ok']
// 		  });
// 		  alert.present();
// 	  }
//   }

//   prepareData(user,addData){
// 	  console.log(user);
// 	  console.log(addData);
// 	// let loading = this.loadingCtrl.create({
// 	//   //content: 'Preparing Data...'
//    	// });
//    	// loading.present();
//    	this.device=this.booking.userData.device;
//    	this.brand=this.booking.userData.brand;
//    	this.model=this.booking.userData.model;
//    	this.color=this.booking.userData.color;
// 	this.carrier=this.booking.userData.network;
// 	if (this.action=="Create Customer"){
// 		this.pin=user.pin;
// 	}else{
// 		this.pin=addData.pin;
// 	}

//    	this.screenProtect=this.booking.userData.screenoffer;
//    	this.tempPhone=this.booking.userData.phoneoffer;
// 	this.notes=this.booking.note;
	
// 	if (this.cart.otherRepairSelected==true){
// 		this.customRepair=this.cart.customRepair;
// 		this.customRepairPrice=this.cart.customRepairPrice;
// 	}

   	
// 	for (var i=0;i<this.selectedRepairs.length;i++){
// 		switch (this.selectedRepairs[i]){
// 			case "Screen Replacement":
// 				this.screenRep = "Yes";
// 				break;

// 			case "Headphone Repair":
// 				this.headRep = "Yes";
// 				break;

// 			case "Earpiece Repair":
// 				this.earPieceRep = "Yes";
// 				break;

// 			case "Power Button Repair":
// 				this.powerRep = "Yes";
// 				break;

// 			case "Rear Camera Repair":
// 				this.rearCamRep = "Yes";
// 				break;
			
// 			case "Front Camera Repair":
// 				this.frontCamRep = "Yes";
// 				break;

// 			case "Home Button Repair":
// 				this.homeRep = "Yes";
// 				break;

// 			case "Microphone Repair":
// 				this.micRep = "Yes";
// 				break;

// 			case "Charger Port Repair":
// 				this.chargePortRep = "Yes";
// 				break;

// 			case "Power Button Repair":
// 				this.powerRep = "Yes";
// 				break;

// 			case "Volume Button Repair":
// 				this.volumeRep = "Yes";
// 				break;
			
// 			case "Battery Replacement":
// 				this.battRep = "Yes";
// 				break;

// 			case "Cellular Signal Repair":
// 				this.signalRep = "Yes";
// 				break;

// 			case "Back Glass Repair":
// 				this.backGlassRep = "Yes";
// 				break;
			
// 			case "Trackpad Replacement":
// 				this.trackpadRep = "Yes";
// 				break;		
// 		}
		
// 	}

// 	if (this.device == 'Phone'||this.device =='Tablet'){
// 		var testForm=this.booking.mobileTest;
// 		console.log(testForm);
// 		  this.sdTest=testForm.SD;
// 		  this.frontCamTest=testForm.frontCam;
// 		  this.rearCamTest=testForm.rearCam;
// 		  this.homeTest=testForm.home;
// 		  this.volumeTest=testForm.volume;
// 		this.vibrateTest=testForm.vibrate;
// 		this.lockTest=testForm.lock;
// 		this.lightSensorTest=testForm.vibrate;
// 		this.earpieceTest=testForm.earpiece;
// 		this.speakerTest=testForm.speaker;
// 		this.micTest=testForm.microphone;
// 		this.headphoneTest=testForm.headphone;
// 		this.moistureTest=testForm.moisture;
// 		this.wifiTest=testForm.wifi;			
// 		this.barredTest=testForm.barred;  
// 	}else{
// 		var testForm=this.booking.nonMobileTest;
// 		console.log(testForm);
// 		this.powerTest=testForm.power;
// 		this.displayTest=testForm.display;
// 		  this.systemBootTest=testForm.systemBoot;
// 		  this.audioTest=testForm.audio;
// 		  this.keyboardTest=testForm.keyboard;
// 		this.touchpadtest=testForm.touchpad;
// 		this.wifiTest=testForm.wifi;
// 		this.portTest=testForm.port;
// 		this.webCamTest=testForm.webcam;
// 		  this.battTest=testForm.battery;
// 		this.harddriveTest=testForm.HDD;
// 	}

		
// 	//loading.dismiss();
// 	if (this.action=="Create Customer"){
// 		this.createCustomer(user);
// 	}else{
// 		this.assignCustomer(user,addData);
// 	}
//   }

  createCustomer(user){
	console.log(user);
	this.booking.phone=user.phone;
	this.booking.mobile=user.phone2;
	this.booking.userData.user = user;
	// var url = "https://cors-anywhere.herokuapp.com/https://iphixx.repairshopr.com/api/v1/customers?api_key=79bc78aa-81d3-4d8c-94db-5a07a0374670&email="+
		// 	user.email+"&mobile="+user.phone+"&lastname="+user.lastname+"&firstname="+user.firstname+"&phone="+user.phone+"&properties="+JSON.stringify(properties);
			//+"&properties="+userData;
	let data = new FormData();
	data.append("email", user.email);
	data.append("lastName", user.lastname);
	data.append("firstName", user.firstname);
	data.append("birthdate", user.birthdate);
	data.append("mobile", user.phone);
	data.append("phone", user.phone2);
	console.log(data);
	  let loading = this.loadingCtrl.create({
		//content: 'Creating Customer...'
	 });
	 loading.present();

		let xhr = new XMLHttpRequest();
		//xhr.withCredentials = true;
	
		xhr.addEventListener("readystatechange",  () =>{
			
		  if (xhr.readyState === 4) {
			console.log(xhr.responseText);
			let result = JSON.parse(xhr.responseText);
			console.log(result);
			console.log(result.id);
			  if(result.id!=undefined){
				loading.dismiss();
				//localStorage.setItem('authenticated' , JSON.stringify(result));
				//this.booking.userData.customer_id = result.user_id;
				console.log(result.id);
				this.createBooking(result.id);
				//this.navCtrl.setRoot(ConfirmationPage);
			 }else{
				loading.dismiss();
				console.log(result);
				let alert = this.alertCtrl.create({
				  title: 'Error',
				  subTitle: 'Customer Not Created',
				  buttons: ['Ok']
				});
				alert.present();
			 }
		  }
		});
		console.log(JSON.stringify(this.booking.userData));
		var userData = JSON.stringify(this.booking.userData);
		userData = userData.substring(1,userData.length-1);
		console.log(userData);
		// var url = "https://cors-anywhere.herokuapp.com/https://iphixx.repairshopr.com/api/v1/customers?api_key=79bc78aa-81d3-4d8c-94db-5a07a0374670&email="+
		// 	user.email+"&mobile="+user.phone+"&lastname="+user.lastname+"&firstname="+user.firstname+"&phone="+user.phone+"&properties="+JSON.stringify(properties);
			//+"&properties="+userData;
			var url = "https://admin.iphixx.com/api/v1/customers/";
			xhr.open("POST", url);
	   // xhr.open("POST", "https://admin.iphixx.com/api/v1/customers/sign-in");
	
		xhr.send(data);
		}
	
		createBooking(id){
			console.log(this.booking.repairKey);
			console.log(this.booking.repairKey);
			console.log(this.booking.userData.selectedRepair);
			console.log(this.booking.userData);
			console.log(this.cart.Total);
			this.booking.userData.selectedRepair = this.cart.selectedRepairs;
			console.log(this.booking.repairKey);
			let loading = this.loadingCtrl.create({
			//content: 'Logging in please wait...'
		 });
		 loading.present();
			
		 let data = new FormData();
		 	data.append("agent_id", JSON.parse(localStorage.getItem("authenticated")).agent_id);
			data.append("customer_id", id);
			data.append("device", this.booking.userData.deviceKey);
			data.append("brand", this.booking.userData.brandKey);
			data.append("model", this.booking.userData.modelKey);
			data.append("network", this.booking.userData.networkKey);
			data.append("color", this.booking.userData.colorKey);
			data.append("total", this.cart.Total);

			//mobile
			data.append('screenrep_selected',this.booking.repairKey.screenrep_selected);
			data.append("headrep_selected",this.booking.repairKey.headrep_selected);
			data.append("earrep_selected",this.booking.repairKey.earrep_selected);
			data.append("powerrep_selected",this.booking.repairKey.powerrep_selected);
			data.append("rearcamrep_selected",this.booking.repairKey.rearcamrep_selected);
			data.append("frontcamrep_selected",this.booking.repairKey.frontcamrep_selected);
			data.append("homerep_selected",this.booking.repairKey.homerep_selected);
			data.append("microphone_selected",this.booking.repairKey.microphone_selected);
			data.append("chargeport_selected",this.booking.repairKey.chargeport_selected);
			data.append("volumerep_selected",this.booking.repairKey.volumerep_selected);
			data.append("battrep_selected",this.booking.repairKey.battrep_selected);
			data.append("signalrep_selected",this.booking.repairKey.signalrep_selected);
			data.append("backglassrep_selected",this.booking.repairKey.backglassrep_selected);
			data.append("screenOffer", this.booking.userData.screenoffer);
			data.append("phoneOffer", this.booking.userData.phoneoffer);

			//Laptop
			data.append('laptopscreenrep_selected',this.booking.repairKey.laptopscreenrep_selected);
			data.append('laptopcamrep_selected',this.booking.repairKey.laptopcamrep_selected);
			data.append('keyboardrep_selected',this.booking.repairKey.keyboardrep_selected);
			data.append('fanrep_selected',this.booking.repairKey.fanrep_selected);
			data.append('laptopspeakerrep_selected',this.booking.repairKey.laptopspeakerrep_selected);
			data.append('datarecovery',this.booking.repairKey.datarecovery);
			data.append('virusremoval',this.booking.repairKey.virusremoval);
			data.append('virusremoval_withsoftware',this.booking.repairKey.virusremoval_withsoftware);
			data.append('HDDHalfTeraWithDataTransfer',this.booking.repairKey.HDDHalfTeraWithDataTransfer);
			data.append('HDDTeraWithDataTransfer',this.booking.repairKey.HDDTeraWithDataTransfer);
			data.append('HDDHalfTera',this.booking.repairKey.HDDHalfTera);
			data.append('HDDTera',this.booking.repairKey.HDDTera);
			data.append('SSDHalfTeraWithDataTransfer',this.booking.repairKey.SSDHalfTeraWithDataTransfer);
			data.append('SSDTeraWithDataTransfer',this.booking.repairKey.SSDTeraWithDataTransfer);
			data.append('SSDHalfTera',this.booking.repairKey.SSDHalfTera);
			data.append('SSDTera',this.booking.repairKey.SSDTera);

			//Gaming Consoles


			if (this.device == 'Phone'||this.device =='Tablet')
				data.append("test",JSON.stringify(this.booking.mobileTest));
			else
				data.append("test",JSON.stringify(this.booking.nonMobileTest));
			console.log(data);

			let xhr = new XMLHttpRequest();
			//xhr.withCredentials = true;
		
			xhr.addEventListener("readystatechange",  () =>{
				if (xhr.readyState === 4) {
				console.log(xhr.responseText);
				let result = JSON.parse(xhr.responseText);
				console.log(result);
					if(result.id!=null){
					loading.dismiss();
					this.navCtrl.setRoot(ConfirmationPage);
				 }
					else{
					loading.dismiss();
					let alert = this.alertCtrl.create({
						title: 'Error',
						subTitle: 'Booking not created',
						buttons: ['Ok']
					});
					alert.present();
				 }
				}
			});
			console.log(JSON.stringify(this.booking.userData));
			var userData = JSON.stringify(this.booking.userData);
			userData = userData.substring(1,userData.length-1);
			console.log(userData);
			console.log(data);
			xhr.open("POST", "https://admin.iphixx.com/api/v1/bookings/");
		
			xhr.send(data);
			}

	presentPrompt() {
		var data = { source : 'pin' };
		var modalPage = this.modalCtrl.create('ModalPage',data,{cssClass: 'modal-content' });modalPage.present(); 
	}

	assignCustomer(customer,addData){
		this.booking.locationName = addData.location.name;
		let userDetails= {
			firstname: '',
			lastname: '',
			birthdate:'',
			email: '',
			phone: '',
			phone2: '',
			pin : '',
			location:'',  
			}
		console.log(customer);
		console.log(this.booking.userData.user);
		userDetails.firstname=customer.firstname;
		userDetails.lastname=customer.lastname;
		userDetails.birthdate=customer.properties.Birthdate;
		userDetails.email=customer.email;
		userDetails.phone=customer.phone;
		userDetails.phone2=customer.mobile;
		this.booking.phone=customer.phone;
		this.booking.mobile=customer.mobile;
		userDetails.pin=addData.pin;
		console.log(addData.location)
		userDetails.location=addData.location.id;

		//this.booking.userData.user=userDetails;
		console.log(this.booking.userData.user);

		console.log(customer);
		console.log(customer.firstname);
		
		
		// this.selectedCustomer[0].location=addData.location;
		// console.log(this.selectedCustomer[0].location);
		// this.selectedCustomer[0].birthdate=customer.properties.Birthdate;
		//console.log(this.selectedCustomer);
		//this.createTicket(userDetails,customer.id);
	}
}
