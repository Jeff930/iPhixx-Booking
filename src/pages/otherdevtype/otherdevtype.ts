import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NavigationProvider } from '../../providers/navigation/navigation';
import {EnterdetailPage} from '../enterdetail/enterdetail'

/**
 * Generated class for the OtherdevtypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otherdevtype',
  templateUrl: 'otherdevtype.html',
})
export class OtherdevtypePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public navigation: NavigationProvider) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad OtherdevtypePage');
    this.navigation.activePageIndex=16;
  }

  enterDetails(){
    this.navCtrl.push(EnterdetailPage);
  }

}
