import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController , ModalController, AlertController } from 'ionic-angular';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { SignaturePage } from '../signature/signature';

import {  RepairnumberinfoPage } from '../repairnumberinfo/repairnumberinfo';

import { BookingProvider } from '../../providers/booking/booking'


/**
 * Generated class for the RepairnumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-repairnumber',
  templateUrl: 'repairnumber.html',
})
export class RepairnumberPage { 

  login_form: FormGroup;
  error_message: string;
  ishidden=true;
  src;
  loginok = false;
  signatureImage : string;


  constructor(
  	public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder, public navParams: NavParams,
    public modalController : ModalController,
    public booking : BookingProvider,
    public alertCtrl : AlertController,
    public navigation: NavigationProvider
  	) {

  	// this.signatureImage = navParams.get('signatureImage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairnumberPage');
    this.navigation.activePageIndex=19;
  }


   ionViewWillLoad() {

    this.login_form = this.formBuilder.group({
    
      repairnum: new FormControl('', Validators.required),
     

    });
  }

   login(repairnum){
   	
  	console.log(repairnum);
  	let loading = this.loadingCtrl.create({
    });
    // this.booking.gettrackinginfo(repairnum.repairnum);
    loading.present();
  	this.booking.gettrackinginfo(repairnum.repairnum).subscribe(res => {
  		
      	console.log(res.tickets);
        let tickets = res.tickets;
        loading.dismiss();
        if(tickets.length !== 0){ 
          this.booking.getcustomer(res.tickets[0].customer_id).subscribe(res => {
           
           
             tickets.push(res.customer);
             console.log(tickets); 
             this.navCtrl.push(RepairnumberinfoPage ,{ repairinfo : tickets });

          })

       }
       else{
                 let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Repair Number not found!',
        buttons: ['Ok']
        });
      alert.present();
       }
  	
      },
      err =>{
      	loading.dismiss();
      	console.log(err);
      	let alert = this.alertCtrl.create({
		    title: 'Error',
		    subTitle: 'Repair Number not found!'+JSON.stringify(err),
		    buttons: ['Ok']
		});
  		alert.present();
      });

  	}

  // openSignatureModel(){
  //   setTimeout(() => {
  //   let modal = this.modalController.create(SignaturePage);
  //   modal.present();
  //   }, 300);
  
  // }

}
