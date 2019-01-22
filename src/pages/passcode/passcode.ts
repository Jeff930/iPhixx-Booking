import * as $ from "jquery";
import { Component } from '@angular/core';
import { NavigationProvider } from '../../providers/navigation/navigation';
import {NavController, NavParams , LoadingController} from 'ionic-angular';

// import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

// import { HomePage } from '../home/home';
import { ChooseactionPage } from '../chooseaction/chooseaction';


/**
 * Generated class for the PasscodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-passcode',
  templateUrl: 'passcode.html',
})
export class PasscodePage {

  // login_form: FormGroup;
  error_message: string;
  ishidden=true;
  src;
  loginok = false;
  form = true;
  code = [];

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,public navigation: NavigationProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasscodePage');
    this.navigation.activePageIndex=4;
  }

   

  login(){

  	console.log(this.code);
  	let loading = this.loadingCtrl.create({
       //content: 'Logging in please wait...'
    });
    loading.present();
  	 this.navCtrl.setRoot(ChooseactionPage ,{}, {animate: true, direction: 'forward'});
  	loading.dismiss();
  	}

  onEnterCode(event ){
 
    event.target.value.length && event.target.nextElementSibling ?  event.target.nextElementSibling.focus() : '';

    if(event.key == 'Backspace') event.target.previousElementSibling.focus();
    console.log(this.code.length);

    if(this.code.length == 4) this.form = false;
    else this.form = true;
      

  }
    



}
