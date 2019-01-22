import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { BookingProvider } from '../../providers/booking/booking';
import { NetworkPage } from '../network/network';
import { RepairPage } from '../repair/repair';
import { ConfirmationPage } from '../../pages/confirmation/confirmation';
import { LoadingController, AlertController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import * as $ from "jquery";

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  question:string;
  tip:string;
  source:string;
  input:string;


  constructor(public navCtrl: NavController, public viewCtrl : ViewController, public navParams: NavParams,public booking : BookingProvider,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public cart:CartProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage' + this.navParams.get('source'));
    this.source=this.navParams.get('source');
    if ( this.source =='color'){
      this.question = "Other Color";
      this.tip = "What color is your phone?"
    }
    if (this.source=='pin'){
      this.question = "What is your PIN?";
      this.tip = "Please input your PIN below?"
    }else{
      this.question = "Other Carrier Name";
      this.tip = "What carrier do you have?"
    }
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  Done(){
    if ( this.source =='color'){
      this.booking.userData.color = this.input;
      this.navCtrl.push(NetworkPage);
    }
    if (this.source=='pin'){
      this.booking.userData.user.pin = this.input;
      console.log(this.booking.userData.user.pin);
      this.doLogin();
    }else{
      this.booking.userData.network = this.input;
      this.navCtrl.push(RepairPage);
    }}

    doLogin(){

  	
      let loading = this.loadingCtrl.create({
        // content: 'Please Wait...'
      });
  
      loading.present();
      console.log("success1" + this.booking.userData.user.fullname +
       ''
      + JSON.stringify(this.booking.userData.user.birthdate)
      + this.booking.userData.user.email
      + this.booking.userData.user.phone
      +'New'
      + this.booking.userData.device
      +this.booking.userData.brand
      + this.booking.userData.model
      + this.booking.userData.color
      + this.booking.userData.network
      + JSON.stringify(this.cart.selectedRepairs)
      + this.cart.selectedRepairs.length
      + JSON.stringify(this.cart.costs)
      + this.cart.Total
      + this.booking.userData.device + ' Repair'
      + this.booking.userData.repair
      + this.booking.userData.device+' '+this.booking.userData.brand+' '+
      this.booking.userData.model+' '+this.booking.userData.color+' '+this.booking.userData.network+' '+
      this.booking.userData.phoneoffer+' '+ this.booking.userData.upgradeoffer1+' '+
      this.booking.userData.upgradeoffer2+', Pincode: ' + this.booking.userData.user.pin
);
    $.ajax({
      type: "POST",
      url: 'https://admin.iphixx.com/api/v1/bookings/',
      data: {
            fullname: this.booking.userData.user.fullname, 
            last_name: '',
            birthdate : this.booking.userData.user.birthdate,
              email : this.booking.userData.user.email,
            phone : this.booking.userData.user.phone,
            status :'New',
            device : this.booking.userData.device,
            brand :this.booking.userData.brand,
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
            this.booking.userData.phoneoffer+' '+ this.booking.userData.upgradeoffer1+' '+
            this.booking.userData.upgradeoffer2+', Pincode: '+this.booking.userData.user.pin
  
          }
          ,
      success: (res) => {
        loading.dismiss();
        console.log("success: " +res);
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
