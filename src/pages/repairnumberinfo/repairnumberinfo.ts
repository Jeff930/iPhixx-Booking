import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController} from 'ionic-angular';

import { SignaturePage } from '../signature/signature'




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


  constructor(public navCtrl: NavController, public navParams: NavParams, 
  	public alertCtrl : AlertController, public modalController:ModalController ) {

  	this.userData = this.navParams.get('repairinfo');
  	  	console.log(this.userData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairnumberinfoPage');
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
			          this.navCtrl.push(SignaturePage);

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

  openSignatureModel(){
    setTimeout(() => {
    let modal = this.modalController.create(SignaturePage);
    modal.present();
    }, 200);
  
  }


}
