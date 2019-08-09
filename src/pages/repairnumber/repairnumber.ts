import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController , ModalController, AlertController } from 'ionic-angular';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { SignaturePage } from '../signature/signature';

import {  RepairnumberinfoPage } from '../repairnumberinfo/repairnumberinfo';

import { BookingProvider } from '../../providers/booking/booking'

import { ChoosemodelPage } from '../choosemodel/choosemodel';
import { ChoosebrandPage } from '../choosebrand/choosebrand';
import { OtherdevicePage } from '../otherdevice/otherdevice';
import { ColorPage } from '../color/color';
import { NetworkPage } from '../network/network';
import { RepairPage } from '../repair/repair';
import { ChooseactionPage } from '../chooseaction/chooseaction';
import { LoginPage } from '../login/login';
import { PasscodePage } from '../passcode/passcode';
import { PhoneofferPage } from '../phoneoffer/phoneoffer';
import { UpgradeofferPage } from '../upgradeoffer/upgradeoffer';
import { OtherdevtypePage } from '../otherdevtype/otherdevtype';
import { EnterdetailPage } from '../enterdetail/enterdetail';
import { CustomerdetailsPage } from '../customerdetails/customerdetails';
import { OtherrepairPage } from '../otherrepair/otherrepair';
import { TestInPage } from '../test-in/test-in';
import { HomePage } from '../home/home';

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
  index;
  other = 0;
  otherDev = 0;
  otherRepair = 0;
  username;


  constructor(
  	public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder, public navParams: NavParams,
    public modalController : ModalController,
    public booking : BookingProvider,
    public alertCtrl : AlertController,
    public navigation: NavigationProvider
  	) {
    this.username = localStorage.getItem('authenticated');
    console.log(this.username);
    this.booking.agentName = this.username;
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
    console.log(this.booking.gettrackinginfo(repairnum.repairnum));
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
        subTitle: 'Ticket Number not found!',
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
  Back() {
    this.index = this.navigation.activePageIndex;
    this.other = this.navigation.other;
    this.otherDev = this.navigation.otherDev;
    this.otherRepair = this.navigation.otherRepair;
    switch (this.index) {
      case 1://login
        console.log("no back button on loginpage");
        break;
      case 2://register
        this.navCtrl.setRoot(LoginPage);
        break;
      case 3://recover
        this.navCtrl.setRoot(LoginPage);
        break;
      case 4://passcode
        this.navCtrl.setRoot(LoginPage);
        break;
      case 5://chooseaction
        this.navCtrl.setRoot(PasscodePage);
        break;
      case 6://home
        this.navCtrl.setRoot(ChooseactionPage);
        break;
      case 7://select brand
        this.navCtrl.setRoot(HomePage);
        break;
      case 8://other brand
        this.navCtrl.setRoot(ChoosebrandPage);
        break;
      case 9://select model
        if (this.booking.userData.device == 'MacBook')
          this.navCtrl.setRoot(HomePage);
        else
          this.navCtrl.setRoot(ChoosebrandPage);
        break;
      case 10://select color
        if (this.other == 0)
          this.navCtrl.setRoot(ChoosemodelPage);
        else
          this.navCtrl.setRoot(OtherdevicePage);
        break;
      case 11://select carrier
        this.navCtrl.setRoot(ColorPage);
        break;
      case 12://select repair
        if (this.booking.userData.device == 'Laptop' || this.booking.userData.device == 'MacBook') {
          this.navCtrl.setRoot(ChoosemodelPage);
        } else {
          if (this.booking.userData.device == 'Gaming Console') {
            this.navCtrl.setRoot(ChoosebrandPage);
          } else {
            this.navCtrl.setRoot(NetworkPage);
          }
        }
        break;
      case 13://upsell
        this.navCtrl.setRoot(TestInPage);
        break;
      case 14://phoneoffer
        this.navCtrl.setRoot(UpgradeofferPage);
        break;
      case 15://customerdetails
        if (this.otherDev == 0) {
          //if (this.otherRepair==0){
          if (this.booking.userData.device == 'Gaming Console') {
            this.navCtrl.setRoot(RepairPage);
          } else {
            if (this.booking.userData.device == 'MacBook' ||
              this.booking.userData.device == 'Laptop') {
              this.navCtrl.setRoot(TestInPage);
            } else {
              this.navCtrl.setRoot(PhoneofferPage);
            }
          }
          // }else{
          //   this.navCtrl.setRoot(OtherrepairPage);}
        }
        else
          this.navCtrl.setRoot(EnterdetailPage);
        break;
      case 16://Otherdevtype
        this.navCtrl.setRoot(HomePage);
        break;
      case 17://Enterdetails
        this.navCtrl.setRoot(OtherdevtypePage);
        break;
      case 18://Confirmation
        this.navCtrl.setRoot(CustomerdetailsPage);
        break;
      case 19://RepairNo
        this.navCtrl.setRoot(ChooseactionPage);
        break;
      case 20://Otherrepair
        this.navCtrl.setRoot(RepairPage);
        break;
      case 21://TestIn
        this.navCtrl.setRoot(RepairPage);
        break;

    }

  }

}
