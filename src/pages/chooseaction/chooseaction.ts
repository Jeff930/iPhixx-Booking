import { Component } from '@angular/core';
import { NavController, NavParams, AlertController ,Platform, MenuController} from 'ionic-angular';

import { NavigationProvider } from '../../providers/navigation/navigation';
import { HomePage } from '../home/home';
import { RepairnumberPage } from '../repairnumber/repairnumber';
import { LoginPage } from '../login/login';


/**
 * Generated class for the ChooseactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-chooseaction',
  templateUrl: 'chooseaction.html',
})
export class ChooseactionPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public alertCtrl : AlertController,
      public platform : Platform,
      public menuCtrl : MenuController,
      public navigation: NavigationProvider,
      ) {
      console.log(this.navigation.activePageIndex);
    this.menuCtrl.enable(true, 'myMenu');

    this.menuCtrl.enable(false, 'loginMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseactionPage');
    this.navigation.activePageIndex=5;
  }

  selectAction(action){
  		if(action == 'book'){
  			this.navCtrl.setRoot(HomePage ,{}, {animate: true, direction: 'forward'});
  		}
  		else{
  			this.navCtrl.push(RepairnumberPage);
  		}
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

  
}
