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
  screenRep;
  trackpadRep;
  earPieceRep;
  powerRep;
  headRep;
  rearCamRep;
  frontCamRep;
  homeRep;
  micRep;
  chargePortRep;
  backGlassRep;
  volumeRep;
  battRep;
  harddriveRep;
  birthdate;
  signalRep;
  hdmiRep;
  keyboardRep;
  fanRep;
  webCamRep;
  speakerRep;
  dataRecovery;
  virusRemoval;
  SSD500GBOS;
  SSD1TBOS;
  HDD500GBOS;
  HDD1TBOS;
  SSD500GBOSDT;
  SSD1TBOSDT;
  HDD500GBOSDT;
  HDD1TBOSDT;
  lockTest;
  sdTest;
  frontCamTest;
  rearCamTest;
  homeTest;
  volumeTest;
  earpieceTest;
  headphoneTest;
  vibrateTest;
  lightSensorTest;
  speakerTest;
  micTest;
  moistureTest;
  powerTest;
  wifiTest;
  barredTest;
  displayTest;
  systemBootTest;
  audioTest;
  keyboardTest;
  touchpadtest;
  portTest;
  battTest;
  harddriveTest;











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
				this.customerDetails = formBuilder.group({
					'firstname':['', Validators.compose([Validators.required])],
					'lastname':['', Validators.compose([Validators.required])],
					'birthdate':['', Validators.compose([Validators.required])],
					'email':['', Validators.compose([Validators.required])],
					'phone':['', Validators.compose([Validators.required])],
					'phone2':['', Validators.compose([Validators.required])],
					'smsService':[],
					'consentStore':[],
					'consentStoreSource':[],
					'consentBusiness':[],
					'consentBusinessSource':[],
					'consentMarketing':[],
					'consentMarketingSource':[],
					'portalInvite':[],
					'portalInviteSource':[],
					'pin':['', Validators.compose([Validators.required])],
				});
  }

  ionViewDidLoad() {
		console.log('ionViewDidLoad CustomerdetailsPage');
		this.navigation.activePageIndex=15;
  }

  ionViewWillLoad() {
  }

  login(user){
	  console.log(user);
	  if(user.consentStore){
		if(user.consentMarketing){
			//this.createCustomer(user);
			this.prepareData(user);
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

  prepareData(user){
  	
	let loading = this.loadingCtrl.create({
	  content: 'Preparing Data...'
   });
   loading.present();
   this.device=this.booking.userData.device;
   this.brand=this.booking.userData.brand;
   this.model=this.booking.userData.model;
   this.color=this.booking.userData.color;
   this.carrier=this.booking.userData.carrier;
   this.pin=user.pin;
   this.screenProtect=this.booking.userData.screenoffer;
   this.tempPhone=this.booking.userData.phoneoffer;
   this.notes=this.booking.note;


  	this.screenRep;
  	this.trackpadRep;
  	this.earPieceRep;
  	this.powerRep;
  	this.headRep;
  	this.rearCamRep;
  	this.frontCamRep;
  	this.homeRep;
  	this.micRep;
  	this.chargePortRep;
  	this.backGlassRep;
  	this.volumeRep;
  	this.battRep;
  	this.harddriveRep;
  	this.birthdate;
  	this.signalRep;
  	this.hdmiRep;
	this.keyboardRep;
  	this.fanRep;
  	this.webCamRep;
  	this.speakerRep;
  	this.dataRecovery;
  	this.virusRemoval;
  	this.SSD500GBOS;
  	this.SSD1TBOS;
  	this.HDD500GBOS;
  	this.HDD1TBOS;
  	this.SSD500GBOSDT;
  	this.SSD1TBOSDT;
  	this.HDD500GBOSDT;
  	this.HDD1TBOSDT;
  	this.lockTest;
  	this.sdTest;
  	this.frontCamTest;
  	this.rearCamTest;
  	this.homeTest;
  	this.volumeTest;
  	this.earpieceTest;
  	this.headphoneTest;
  	this.vibrateTest;
  	this.lightSensorTest;
  	this.speakerTest;
  	this.micTest;
  	this.moistureTest;
  	this.powerTest;
  	this.wifiTest;
  	this.barredTest;
  	this.displayTest;
  	this.systemBootTest;
  	this.audioTest;
  	this.keyboardTest;
  	this.touchpadtest;
  	this.portTest;
  	this.battTest;
  	this.harddriveTest;

   

	 
	 

  }

  createCustomer(user){
	console.log(user);
  	
	  let loading = this.loadingCtrl.create({
		content: 'Creating Customer...'
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
				this.booking.userData.customer_id = result.user_id;
				this.createTicket(user);
				//this.navCtrl.setRoot(ConfirmationPage);
			 }
			  else{
				loading.dismiss();
				if (result.message == 'Email has already been taken'){
					this.createTicket(user);
				}else{
				let alert = this.alertCtrl.create({
				  title: 'Error: Customer Not Created',
				  subTitle: result.message,
				  buttons: ['Ok']
				});
				alert.present();
				}
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
		
		// createLead(user){
		// 	console.log(user.username);
		// 	console.log(user.password);
		// 	console.log(user.password);
		// 	this.booking.userData.user = user;
		// 	console.log(this.booking.userData);
		//  // this.presentPrompt();
		// 	this.booking.userData.selectedRepair = this.cart.selectedRepairs;
		// 	let loading = this.loadingCtrl.create({
		// 	//content: 'Logging in please wait...'
		//  });
		//  loading.present();
	
		//  let data = new FormData();
		// 	data.append("email", user.email);
		// 	data.append("password", user.password);
		// 	let xhr = new XMLHttpRequest();
		// 	//xhr.withCredentials = true;
		
		// 	xhr.addEventListener("readystatechange",  () =>{
		// 		if (xhr.readyState === 4) {
		// 		console.log(xhr.responseText);
		// 		let result = JSON.parse(xhr.responseText);
		// 		console.log(result);
		// 			if(result.lead.id!=undefined){
		// 			loading.dismiss();
					
		// 			//this.createTicket(user);
		// 			this.navCtrl.setRoot(ConfirmationPage);
		// 		 }
		// 			else{
		// 			loading.dismiss();
		// 			let alert = this.alertCtrl.create({
		// 				title: 'Error',
		// 				subTitle: 'Lead not created',
		// 				buttons: ['Ok']
		// 			});
		// 			alert.present();
		
		// 		 }
		// 		}
		// 	});
		// 	console.log(JSON.stringify(this.booking.userData));
		// 	var userData = JSON.stringify(this.booking.userData);
		// 	userData = userData.substring(1,userData.length-1);
		// 	console.log(userData);
		// 	var url = "https://cors-anywhere.herokuapp.com/https://iphixx.repairshopr.com/api/v1/leads?api_key=8e5044d0-6f23-49ef-9c9a-25c516f3debc&email="+
		// 		user.email+"&phone="+this.booking.userData.user.phone+"&last_name="+this.booking.userData.user.lastname+"&first_name="+this.booking.userData.user.firstname;
		// 		//+"&properties="+userData;
		// 	console.log(url);
		// 	xhr.open("POST", url);
		// 	 // xhr.open("POST", "https://admin.iphixx.com/api/v1/customers/sign-in");
		
		// 	xhr.send();
		// 	}
	
		createTicket(user){
			console.log(user.username);
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
			data.append("email", user.email);
			data.append("password", user.password);
			let xhr = new XMLHttpRequest();
			//xhr.withCredentials = true;
		
			xhr.addEventListener("readystatechange",  () =>{
				if (xhr.readyState === 4) {
				console.log(xhr.responseText);
				let result = JSON.parse(xhr.responseText);
				console.log(result);
					if(result.id!=null){
					loading.dismiss();
					localStorage.setItem('authenticated' , JSON.stringify(result));
					this.booking.userData.customer_id = result.user_id;
					this.navCtrl.setRoot(ConfirmationPage);
				 }
					else{
					loading.dismiss();
					let alert = this.alertCtrl.create({
						title: 'Error',
						subTitle: 'Lead not created',
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
			var url = "https://cors-anywhere.herokuapp.com/https://iphixx.repairshopr.com/api/v1/tickets?api_key=79bc78aa-81d3-4d8c-94db-5a07a0374670&email="+
				user.email+"&phone="+this.booking.userData.user.phone+"&last_name="+this.booking.userData.user.lastname+"&first_name="+this.booking.userData.user.firstname;
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
}
