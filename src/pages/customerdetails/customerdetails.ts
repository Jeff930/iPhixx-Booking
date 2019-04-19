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
  ishidden=true;
  src;
  loginok = false;
  smsService;
  consentStore;
  consentBusiness;




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
		this.createCustomer(user);
	  }else{
		let alert = this.alertCtrl.create({
			title: 'Required Consent for Storing Data',
			subTitle: 'Please check the Consent to Store Data checkbox',
			buttons: ['Ok']
		  });
		  alert.present();
	  }
  }

  createCustomer(user){
	console.log(user);
	var properties = {birthdate:Date}
	properties.birthdate = user.birthdate;
  	
	  let loading = this.loadingCtrl.create({
		//content: 'Logging in please wait...'
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
				this.createLead(user);
				//this.navCtrl.setRoot(ConfirmationPage);
			 }
			  else{
				loading.dismiss();
				let alert = this.alertCtrl.create({
				  title: 'Error: Customer Not Created',
				  subTitle: result.message,
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
			user.email+"&mobile="+user.phone+"&lastname="+user.lastname+"&firstname="+user.firstname+"&phone="+user.phone+"&properties[Birthdate]="+user.birthdate+"&consent[store_date]=1";
		console.log(url);
		xhr.open("POST", url);
	   // xhr.open("POST", "https://admin.iphixx.com/api/v1/customers/sign-in");
	
		xhr.send();
		}
		
		createLead(user){
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
					if(result.lead.id!=undefined){
					loading.dismiss();
					localStorage.setItem('authenticated' , JSON.stringify(result));
					this.booking.userData.customer_id = result.user_id;
					//this.createTicket(user);
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
			var url = "https://cors-anywhere.herokuapp.com/https://iphixx.repairshopr.com/api/v1/leads?api_key=8e5044d0-6f23-49ef-9c9a-25c516f3debc&email="+
				user.email+"&phone="+this.booking.userData.user.phone+"&last_name="+this.booking.userData.user.lastname+"&first_name="+this.booking.userData.user.firstname;
				//+"&properties="+userData;
			console.log(url);
			xhr.open("POST", url);
			 // xhr.open("POST", "https://admin.iphixx.com/api/v1/customers/sign-in");
		
			xhr.send();
			}
	
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
