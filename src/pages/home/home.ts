import { Component, ɵConsole } from '@angular/core';
import { NavController , AlertController } from 'ionic-angular';

import { BookingProvider } from '../../providers/booking/booking';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { devices } from '../../models/devicetypes';

import { ChoosebrandPage } from '../choosebrand/choosebrand';
import { ChoosemodelPage } from '../choosemodel/choosemodel';
import { LoginPage } from '../login/login';
import { ChooseactionPage } from '../chooseaction/chooseaction';
import { OtherdevtypePage } from '../otherdevtype/otherdevtype';


 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  devices = devices;			
  constructor(public navCtrl: NavController , public booking : BookingProvider , public alertCtrl : AlertController,public navigation: NavigationProvider,) {
  	console.log(this.devices);
  }

  selectdevice(device){
    this.booking.userData.device = device;
    console.log('selected device is:' + this.booking.userData.device)
    if (this.booking.userData.device=='MacBook'){
        console.log(true);
        this.booking.userData.brand = device;
        this.navCtrl.setRoot(ChoosemodelPage);
    }else{
      console.log(false);
      this.navCtrl.push(ChoosebrandPage ,{}, {animate: true, direction: 'forward'});
    } 	
  }

  otherDeviceType(){
    this.navCtrl.setRoot(OtherdevtypePage);
  }

  logOut(){
  
    let alert = this.alertCtrl.create({
        title: 'Tip',
        subTitle: 'Are you sure you want to Log Out?',
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
                localStorage.clear();
                this.navCtrl.setRoot(LoginPage);
              }
            }
        ]
    });

    alert.present();
  }

  back(){
    this.navCtrl.setRoot(ChooseactionPage ,{}, {animate: true, direction: 'back'});
  }

  ionViewWillEnter(){
    this.booking.selected=1;
    if (this.booking.selected==1){
      this.booking.device="last-selected";
      this.booking.brand="not-selected";
      this.booking.model="not-selected";
      this.booking.color="not-selected";
      this.booking.carrier="not-selected";
      this.booking.repair="last-not-selected";
    }
    this.booking.updateCurrentPage();
    this.navigation.activePageIndex=6;
}

}
