import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import { Http, Headers } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/forkJoin';

/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-bookingp',
  templateUrl: 'bookingp.html',
})
export class BookingpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

  
}
