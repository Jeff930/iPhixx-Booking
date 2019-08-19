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
		 this.customers =result.customers;
		 console.log(this.customers);
		 console.log(this.customers.length);
		 //console.log("id",result.customer.id);
		   if(this.customers!=undefined){
			 loading.dismiss();
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
			loading.dismiss();
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
		 this.customers =result.customers;
		 console.log(this.customers);
		 console.log(this.customers.length);
		 //console.log("id",result.customer.id);
		   if(this.customers!=undefined){
			 loading.dismiss();
			 document.getElementById("emptyResult").style.display="none";
			 document.getElementById("result").style.display="block";
			 //localStorage.setItem('authenticated' , JSON.stringify(result));
			 //this.booking.userData.customer_id = result.user_id;
			 //console.log(result.customer.id);
			 //this.createTicket(user,result.customer.id);
			 //this.navCtrl.setRoot(ConfirmationPage);
		  }
		   else{
			loading.dismiss();
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

  check(user){
	  console.log(user);
	  if(user.consentStore){
		if(user.consentMarketing){
			//this.createCustomer(user);
			this.prepareData(user,'');
		  }else{
			let alert = this.alertCtrl.create({
				title: 'Required Consent for Marketing',
				subTitle: 'Please check the Consent to Email for Marketing',
				buttons: ['Ok']
			  });
			  alert.present();
		  }
	  }else{
		let alert = this.alertCtrl.create({
			title: 'Required Consent for Storing Data',
			subTitle: 'Please check the Consent to Store Data checkbox',
			buttons: ['Ok']
		  });
		  alert.present();
	  }
  }

  prepareData(user,addData){
	  console.log(user);
	  console.log(addData);
	let loading = this.loadingCtrl.create({
	  //content: 'Preparing Data...'
   	});
   	loading.present();
   	this.device=this.booking.userData.device;
   	this.brand=this.booking.userData.brand;
   	this.model=this.booking.userData.model;
   	this.color=this.booking.userData.color;
	this.carrier=this.booking.userData.network;
	if (this.action=="Create Customer"){
		this.pin=user.pin;
	}else{
		this.pin=addData.pin;
	}

   	this.screenProtect=this.booking.userData.screenoffer;
   	this.tempPhone=this.booking.userData.phoneoffer;
	this.notes=this.booking.note;
	   
	if (this.cart.otherRepairSelected==true){
		this.customRepair=this.cart.customRepair;
		this.customRepairPrice=this.cart.customRepairPrice;
	}

   	
	for (var i=0;i<this.selectedRepairs.length;i++){
		switch (this.selectedRepairs[i]){
			case "Screen Replacement":
				this.screenRep = "Yes";
				break;

			case "Headphone Repair":
				this.headRep = "Yes";
				break;

			case "Earpiece Repair":
				this.earPieceRep = "Yes";
				break;

			case "Power Button Repair":
				this.powerRep = "Yes";
				break;

			case "Rear Camera Repair":
				this.rearCamRep = "Yes";
				break;
			
			case "Front Camera Repair":
				this.frontCamRep = "Yes";
				break;

			case "Home Button Repair":
				this.homeRep = "Yes";
				break;

			case "Microphone Repair":
				this.micRep = "Yes";
				break;

			case "Charger Port Repair":
				this.chargePortRep = "Yes";
				break;

			case "Power Button Repair":
				this.powerRep = "Yes";
				break;

			case "Volume Button Repair":
				this.volumeRep = "Yes";
				break;
			
			case "Battery Replacement":
				this.battRep = "Yes";
				break;

			case "Cellular Signal Repair":
				this.signalRep = "Yes";
				break;

			case "Back Glass Repair":
				this.backGlassRep = "Yes";
				break;
			
			case "Trackpad Replacement":
				this.trackpadRep = "Yes";
				break;		
		}
		if (this.device == 'Phone'||this.device =='Tablet'){
			var testForm=this.booking.mobileTest;
			console.log(testForm);
  			this.sdTest=testForm.SD;
  			this.frontCamTest=testForm.frontCam;
  			this.rearCamTest=testForm.rearCam;
  			this.homeTest=testForm.home;
  			this.volumeTest=testForm.volume;
			this.vibrateTest=testForm.vibrate;
			this.lockTest=testForm.lock;
			this.lightSensorTest=testForm.vibrate;
			this.earpieceTest=testForm.earpiece;
			this.speakerTest=testForm.speaker;
			this.micTest=testForm.microphone;
			this.headphoneTest=testForm.headphone;
			this.moistureTest=testForm.moisture;
			this.wifiTest=testForm.wifi;			
  			this.barredTest=testForm.barred;
		}else{
			var testForm=this.booking.nonMobileTest;
			console.log(testForm);
			this.powerTest=testForm.power;
			this.displayTest=testForm.display;
  			this.systemBootTest=testForm.systemBoot;
  			this.audioTest=testForm.audio;
  			this.keyboardTest=testForm.keyboard;
			this.touchpadtest=testForm.touchpad;
			this.wifiTest=testForm.wifi;
			this.portTest=testForm.port;
			this.webCamTest=testForm.webcam;
  			this.battTest=testForm.battery;
			this.harddriveTest=testForm.HDD;
		}
	}

		
	loading.dismiss();
	if (this.action=="Create Customer"){
		this.createCustomer(user);
	}else{
		this.assignCustomer(user,addData);
	}

	
	
  }

  createCustomer(user){
	this.booking.phone=user.phone;
	this.booking.mobile=user.phone2;
	
	console.log(user);
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
			//console.log("id",result.customer.id);
			  if(result.customer!=undefined){
				loading.dismiss();
				//localStorage.setItem('authenticated' , JSON.stringify(result));
				//this.booking.userData.customer_id = result.user_id;
				console.log(result.customer.id);
				this.createTicket(user,result.customer.id);
				//this.navCtrl.setRoot(ConfirmationPage);
			 }else{
				loading.dismiss();
				let message = result.message;
				if (result.message=="Email has already been taken")
					message = "Customer Creation failed due to Duplicate Email";
				console.log(result.message);
				console.log(message);
				let alert = this.alertCtrl.create({
				  title: 'Error: Customer Not Created',
				  subTitle: message,
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
			var url = "https://cors-anywhere.herokuapp.com/https://iphixx.repairshopr.com/api/v1/customers?api_key=8e5044d0-6f23-49ef-9c9a-25c516f3debc&email="+
			user.email+"&mobile="+user.phone+"&lastname="+user.lastname+"&firstname="+user.firstname+"&phone="+user.phone+"&properties[Birthdate]="+user.birthdate+"&consent[store_data]=1"+"&consent[marketing]=1";
		console.log(url);
		xhr.open("POST", url);
	   // xhr.open("POST", "https://admin.iphixx.com/api/v1/customers/sign-in");
	
		xhr.send();
		}
	
		createTicket(user,id){
			console.log(user);
		console.log(user.password);
			console.log(user.password);
			this.booking.userData.user = user;
			console.log(this.booking.userData);
		 // this.presentPrompt();
			this.booking.userData.selectedRepair = this.cart.selectedRepairs;
			let loading = this.loadingCtrl.create({
			//content: 'Logging in please wait...'
		 });
		 loading.present();
	
		 let data = new FormData();
			// data.append("email", user.email);
			// data.append("password", user.password);
			let xhr = new XMLHttpRequest();
			//xhr.withCredentials = true;
		
			xhr.addEventListener("readystatechange",  () =>{
				if (xhr.readyState === 4) {
				console.log(xhr.responseText);
				let result = JSON.parse(xhr.responseText);
				console.log(result);
					if(result.ticket!=null){
					loading.dismiss();
					this.booking.ticketNumber = result.ticket.number;
					this.booking.created = result.ticket.created_at;
					console.log(this.booking.ticketNumber);
					console.log(this.booking.created);
					//localStorage.setItem('authenticated' , JSON.stringify(result));
					//this.booking.userData.customer_id = result.user_id;
					this.navCtrl.setRoot(ConfirmationPage);
				 }
					else{
					loading.dismiss();
					let alert = this.alertCtrl.create({
						title: 'Error',
						subTitle: 'Ticket not created',
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
			var issue = this.device + " issue";
			var subject = this.brand + " " + this.model+ " repair";
			var url = "https://cors-anywhere.herokuapp.com/https://iphixx.repairshopr.com/api/v1/tickets?api_key=8e5044d0-6f23-49ef-9c9a-25c516f3debc&customer_id="+
				id+"&subject="+subject+"&problem_type="+issue+"&location_id="+user.location+"&properties[Device Type]="+this.device+"&properties[Birthdate]="+user.birthdate+"&properties[Brand]="+
				this.brand+"&properties[Model]="+this.model+"&properties[Color]="+this.color+"&properties[Custom Repair]="+this.customRepair+"&properties[Custom Repair Price]="+this.customRepairPrice+"&properties[Carrier]="+this.carrier+"&properties[Temporary Phone]="+this.tempPhone+"&properties[Screen Protector]="+this.screenProtect
				+"&properties[Additional Details]="+this.notes+"&properties[Screen Replacement]="+this.screenRep+"&properties[Trackpad Replacement]="+this.trackpadRep+"&properties[Ear Piece Repair]="+this.earPieceRep
				+"&properties[Power Button Repair]="+this.powerRep+"&properties[Head Phone Repair]="+this.headRep+"&properties[Rear Camera Repair]="+this.rearCamRep+"&properties[Front Camera Repair]="+this.frontCamRep+"&properties[Home Button Repair]="+this.homeRep
				+"&properties[Upper Microphone Repair]="+this.micRep+"&properties[Charging Port Repair]="+this.chargePortRep+"&properties[Back Glass Repair]="+this.backGlassRep+"&properties[PIN]="+this.pin+"&properties[Volume Button Repair]="+this.volumeRep
				+"&properties[Battery Replacement]="+this.battRep+"&properties[Hard Drive Repairs]="+this.harddriveRep+"&properties[Cellular Signal Repair]="+this.signalRep+"&properties[HDMI Port Replacement]="+this.hdmiRep+"&properties[Keyboard Replacement]="+this.keyboardRep
				+"&properties[Fan Replacement]="+this.fanRep+"&properties[Web Camera Repair]="+this.webCamRep+"&properties[Speaker Repair]="+this.speakerRep+"&properties[Data Recovery]="+this.dataRecovery+"&properties[Virus Removal]="+this.virusRemoval
				+"&properties[SSD Replacement (500GB with OS and Data Transfer)]="+this.SSD500GBOSDT+"&properties[HDD Replacement (1TB with OS)]="+this.HDD1TBOS+"&properties[SSD Replacement (500GB with OS)]="+this.SSD500GBOS+"&properties[HDD Replacement (500GB with OS and Data Transfer)]="+this.HDD500GBOSDT+"&properties[HDD Replacement (1TB with OS and Data Transfer)]="+this.HDD1TBOSDT
				+"&properties[SSD Replacement (1TB with OS and Data Transfer)]="+this.SSD1TBOSDT+"&properties[HDD Replacement (500GB with OS)]="+this.HDD500GBOS+"&properties[SSD Replacement (1TB with OS)]="+this.SSD1TBOS+"&properties[HDD Replacement (1TB with OS and Data Transfer)]="+this.HDD1TBOSDT+"&properties[Lock Button Test]="+this.lockTest+"&properties[Web Camera Test]="+this.webCamTest+"&properties[SD Card Test]="+this.sdTest
				+"&properties[Front Camera Test]="+this.frontCamTest+"&properties[Rear Camera Test]="+this.rearCamTest+"&properties[Home Button Test]="+this.homeTest+"&properties[Volume Button Test]="+this.volumeTest+"&properties[Ear Piece Test]="+this.earpieceTest
				+"&properties[Headphone Test]="+this.headphoneTest+"&properties[Vibration Test]="+this.vibrateTest+"&properties[Light Sensor Test]="+this.lightSensorTest+"&properties[Speaker Test]="+this.speakerTest+"&properties[Microphone Test]="+this.micTest
				+"&properties[Moisture Tabs Test]="+this.moistureTest+"&properties[Power Button Test]="+this.powerTest+"&properties[Wifi Test]="+this.wifiTest+"&properties[Barred Test]="+this.barredTest+"&properties[Display Test]="+this.displayTest
				+"&properties[System Boot Test]="+this.systemBootTest+"&properties[Audio Test]="+this.audioTest+"&properties[Keyboard Test]="+this.keyboardTest+"&properties[Touchpad Test]="+this.touchpadtest+"&properties[Port Test]="+this.portTest
				+"&properties[Battery Test]="+this.battTest+"&properties[Hard Drive Test]="+this.harddriveTest;
				//+"&properties="+userData;
			console.log(url);
			xhr.open("POST", url);
			 // xhr.open("POST", "https://admin.iphixx.com/api/v1/customers/sign-in");
		
			xhr.send();
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
		this.createTicket(userDetails,customer.id);
	}
}
