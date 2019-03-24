import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { BookingProvider } from '../../providers/booking/booking';
import { NetworkPage } from '../network/network';
import { RepairPage } from '../repair/repair';
import { ConfirmationPage } from '../../pages/confirmation/confirmation';
import { LoadingController, AlertController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { Validators, FormBuilder} from '@angular/forms';
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
  modalForm;


  constructor(public navCtrl: NavController,public formBuilder: FormBuilder, public viewCtrl : ViewController, public navParams: NavParams,public booking : BookingProvider,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public cart:CartProvider,) {
    this.modalForm = formBuilder.group({
      'value':['', Validators.compose([Validators.required])],});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage' + this.navParams.get('source'));
    this.source=this.navParams.get('source');
    console.log(this.source);
    switch (this.source){

      case 'color':
        this.question = "Other Color";
        this.tip = "What color is your phone?";
      break;

      case 'pin':
        this.question = "What is your PIN?";
        this.tip = "Please input your PIN below?";
      break;

      case 'network':
        this.question = "Other Carrier Name";
        this.tip = "What carrier do you have?";
      break;
    }
   
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  Done(value){
    if ( this.source =='color'){
      this.booking.userData.color = value.value;
      console.log(this.booking.userData.color);
      this.navCtrl.push(NetworkPage);
    }else{
    if (this.source=='pin'){
      this.booking.userData.user.pin = value.value;
      console.log(this.booking.userData.user.pin);
      this.doLogin();
    }else{
      this.booking.userData.network = value.value;
      console.log(this.booking.userData.network);
      this.navCtrl.push(RepairPage);
    }}}

    doLogin(){

  	
      let loading = this.loadingCtrl.create({
        // content: 'Please Wait...'
      });
  
      loading.present();
      var data= {
        firstname: this.booking.userData.user.firstname, 
        lastname: this.booking.userData.user.lastname,
        birthdate : this.booking.userData.user.birthdate,
        email : this.booking.userData.user.email,
        phone : this.booking.userData.user.phone,
        phone2 : this.booking.userData.user.phone2,
        device : this.booking.userData.deviceKey,
        brand :this.booking.userData.brandKey,
        model : this.booking.userData.modelKey,
        color : this.booking.userData.colorKey,
        network : this.booking.userData.networkKey,
        screenrep:this.booking.repairKey.screenrep_selected,
        headrep:this.booking.repairKey.headrep_selected,
        earrep:this.booking.repairKey.earrep_selected,
        powerrep:this.booking.repairKey.powerrep_selected,
        rearcamrep:this.booking.repairKey.rearcamrep_selected,
        frontcamrep:this.booking.repairKey.frontcamrep_selected,
        homerep:this.booking.repairKey.homerep_selected,
        microphone:this.booking.repairKey.microphone_selected,
        chargeport:this.booking.repairKey.chargeport_selected,
        volumerep:this.booking.repairKey.volumerep_selected,
        battrep:this.booking.repairKey.battrep_selected,
        signalrep:this.booking.repairKey.screenrep_selected,
        backglassrep:this.booking.repairKey.backglassrep_selected,
        repairlength: this.cart.selectedRepairs.length,
        prices : JSON.stringify(this.cart.costs),
        total : this.cart.Total,
        // ticket_problem_type : this.booking.userData.device + ' Repair',
        // ticket_subject : this.booking.userData.repair,
        // ticket_description : this.booking.userData.device+' '+this.booking.userData.brand+' '+
        // this.booking.userData.model+' '+this.booking.userData.color+' '+this.booking.userData.network+' '+
        // this.booking.userData.phoneoffer+' '+ this.booking.userData.upgradeoffer1+' '+
        // this.booking.userData.upgradeoffer2+', Pincode: '+this.booking.userData.user.pin

      }
      console.log(data);
    $.ajax({
      type: "POST",
      url: 'https://admin.iphixx.com/api/v1/bookings/',
      data: {
            firstname: this.booking.userData.user.firstname, 
            lastname: this.booking.userData.user.lastname,
            birthdate : this.booking.userData.user.birthdate,
            email : this.booking.userData.user.email,
            phone : this.booking.userData.user.phone,
            phone2 : this.booking.userData.user.phone2,
            device : this.booking.userData.deviceKey,
            brand :this.booking.userData.brandKey,
            model : this.booking.userData.modelKey,
            color : this.booking.userData.colorKey,
            network : this.booking.userData.networkKey,
            repair : this.booking.userData.selectedRepair,
            screenrep:this.booking.repairKey.screenrep_selected,
            headrep:this.booking.repairKey.headrep_selected,
            earrep:this.booking.repairKey.earrep_selected,
            powerrep:this.booking.repairKey.powerrep_selected,
            rearcamrep:this.booking.repairKey.rearcamrep_selected,
            frontcamrep:this.booking.repairKey.frontcamrep_selected,
            homerep:this.booking.repairKey.homerep_selected,
            microphone:this.booking.repairKey.microphone_selected,
            chargeport:this.booking.repairKey.chargeport_selected,
            volumerep:this.booking.repairKey.volumerep_selected,
            battrep:this.booking.repairKey.battrep_selected,
            signalrep:this.booking.repairKey.screenrep_selected,
            backglassrep:this.booking.repairKey.backglassrep_selected,
            repairlength: this.cart.selectedRepairs.length,
            prices : JSON.stringify(this.cart.costs),
            total : this.cart.Total,
            // ticket_problem_type : this.booking.userData.device + ' Repair',
            // ticket_subject : this.booking.userData.repair,
            // ticket_description : this.booking.userData.device+' '+this.booking.userData.brand+' '+
            // this.booking.userData.model+' '+this.booking.userData.color+' '+this.booking.userData.network+' '+
            // this.booking.userData.phoneoffer+' '+ this.booking.userData.upgradeoffer1+' '+
            // this.booking.userData.upgradeoffer2+', Pincode: '+this.booking.userData.user.pin
  
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
