import { Component } from '@angular/core';
import { NavController , AlertController, LoadingController } from 'ionic-angular';

import { BookingProvider } from '../../providers/booking/booking';
import { NavigationProvider } from '../../providers/navigation/navigation';

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
 
  devices;			
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController , public booking : BookingProvider , public alertCtrl : AlertController,public navigation: NavigationProvider,) { 
  }

  selectdevice(device,key){
    this.booking.userData.device = device;
    this.booking.userData.deviceKey = key;
    console.log(this.booking.userData.deviceKey);
    console.log('selected device is:' + this.booking.userData.device)
    if (this.booking.userData.deviceKey=='4'){
        this.booking.userData.brand = 'MacBook';
        this.booking.userData.brandKey = '15';
        this.navCtrl.setRoot(ChoosemodelPage);
    }else{
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
                console.log('Yes clicked');
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

    console.log(this.devices);
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
					console.log(result.length);
					loading.dismiss();
					if (result.length != 0){
            this.devices = result;
					}
				}
			});
			xhr.open("GET", "https://admin.iphixx.com/api/v1/bookings/list-devtypes");
			xhr.send();
  }
  
  ionViewDidLoad() {
    this.navigation.activePageIndex = 6;
  }

}
