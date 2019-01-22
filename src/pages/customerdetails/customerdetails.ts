import * as $ from "jquery";
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController  } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ConfirmationPage } from '../../pages/confirmation/confirmation'
import { NavigationProvider } from '../../providers/navigation/navigation';

import { BookingProvider } from '../../providers/booking/booking';
import { RepairProvider } from '../../providers/repair/repair';
import { CartProvider } from '../../providers/cart/cart';



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



  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public booking: BookingProvider,
		public alertCtrl: AlertController,
		public navigation: NavigationProvider,
		public repair: RepairProvider,
		public cart: CartProvider,


     ) {
				this.customerDetails = formBuilder.group({
					'fullname':['', Validators.compose([Validators.required])],
					'birthdate':['', Validators.compose([Validators.required])],
					'email':['', Validators.compose([Validators.required])],
					'phone':['', Validators.compose([Validators.required])],
					'phone2':['', Validators.compose([Validators.required])],
				});
  }

  ionViewDidLoad() {
		console.log('ionViewDidLoad CustomerdetailsPage');
		this.navigation.activePageIndex=15;
  }

  ionViewWillLoad() {
  }

  login(user){
  	console.log(user.username);
  	console.log(user.password);
  	this.booking.userData.user = user;
  	console.log(this.booking.userData);
  	let loading = this.loadingCtrl.create({
      // content: 'Please Wait...'
    });

    loading.present();

	$.ajax({
	  type: "POST",
	  url: 'https://admin.iphixx.com/api/v1/bookings/',
	  data: {
	  			fullname: user.fullname, 
					last_name: '',
					birthdate : user.birthdate,
	  				email : user.email,
					phone : user.phone,
					status :'New',
					device : this.booking.userData.device,
					brand : this.booking.userData.brand,
					model : this.booking.userData.model,
					color : this.booking.userData.color,
					network : this.booking.userData.network,
					repair : JSON.stringify(this.cart.selectedRepairs),
					repairlength: this.cart.selectedRepairs.length,
					prices : JSON.stringify(this.cart.costs),
					total : this.cart.Total,
	  			ticket_problem_type : this.booking.userData.device + ' Repair',
	  			ticket_subject : this.booking.userData.repair,
	  			ticket_description : this.booking.userData.device+' '+this.booking.userData.brand+' '+
	  			this.booking.userData.model+' '+this.booking.userData.color+' '+this.booking.userData.network+' '+
	  			this.booking.userData.phoneoffer+' '+this.booking.userData.upgradeoffer1+' '+
	  			this.booking.userData.upgradeoffer2+', Pincode: '+user.pin

	  		},
	  success: (res) => {
	  	loading.dismiss();
	  	console.log(res);
	  	if(res){
	  	  this.navCtrl.setRoot(ConfirmationPage);
	  	}
	  },
	  error:(err)=>{
	    loading.dismiss();
	    let alert = this.alertCtrl.create({
		    title: 'Error',
		    subTitle: 'Invalid Credentials'+JSON.stringify(err),
		    buttons: ['Ok']
		});
  		alert.present();
	  }
	  
	});

 
  	}
}
