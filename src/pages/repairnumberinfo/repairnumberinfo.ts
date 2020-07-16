import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController} from 'ionic-angular';

import { BookingProvider } from '../../providers/booking/booking';



/**
 * Generated class for the RepairnumberinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-repairnumberinfo',
  templateUrl: 'repairnumberinfo.html',
})
export class RepairnumberinfoPage {

	userData : any;
	backGlassRepair;
	batteryReplacement;
	cellularSignalRepair;
	chargingPortRepair;
	dataRecovery;
	invoice: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, 
	  public alertCtrl : AlertController, public modalController:ModalController,
	  public booking: BookingProvider ) {
		this.userData = this.navParams.get('repairinfo');
		this.invoice = this.navParams.get('invoice');
		console.log(this.userData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairnumberinfoPage');
  }

  ionViewWillEnter(){
	
  }


  next(){
  	let alert = this.alertCtrl.create({
		    title: 'Temporary Phone Offer',
		    subTitle: 'Is the Customer had rented a Temporary Phone?',
		    buttons: [

		    	 {
			        text: 'No',
			        role: 'cancel',
			        handler: () => {
			          console.log('Cancel clicked');
			        }
			      },
			      {
			        text: 'Yes',
			        handler: () => {
			          console.log('Buy clicked');
			        }
			      }
		    ]
		});
  	alert.present();
  }

  getDate(date){
	if (date == null)
		return "N/A";
	else
		return date;
  }

  getTotal(tax,total){
	  let vat = parseInt(total) + ((tax/100)*total);
	  return vat;
  }

  // openSignatureModel(){
  //   setTimeout(() => {
  //   //let modal = this.modalController.create(SignaturePage);
  //   modal.present();
  //   }, 200);
  
  //}


}
