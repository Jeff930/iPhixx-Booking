// import * as $ from "jquery";
import { Component  } from '@angular/core';
import {  NavController, NavParams , LoadingController , AlertController, MenuController , Platform  } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

// import { ChooseactionPage } from '../chooseaction/chooseaction';
import { PasscodePage } from '../passcode/passcode';

import { BookingProvider } from '../../providers/booking/booking';

import { ChooseactionPage } from '../chooseaction/chooseaction';
import { RecoverPage } from '../recover/recover';
import { RegisterPage } from '../register/register';

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login_form: FormGroup;
  error_message: string;
  src;
  loginok = false;

  constructor(
  	public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public booking : BookingProvider,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
     ) {

     this.menuCtrl.enable(false, 'myMenu');     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    // history.pushState(null, null, location.href);
    // window.onpopstate = function () {
    //     history.go(1);
      
    
    // };
    
  //     $(window).load(function(){
  //   $('body').backDetect(()=>{
  //     // Callback function
  //     alert("Look forward to the future, not the past!");
  //   });
  // }, 1000)
  }

  ionViewWillLoad() {

   

    this.login_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.required),
     

    });
  }

  recover(){
    this.navCtrl.setRoot(RecoverPage);
  }

  login(user){
  	console.log(user);
 
  	let loading = this.loadingCtrl.create({
       //content: 'Logging in please wait...'
    });
    loading.present();

    let data = new FormData();
    data.append("email", user.username);
    data.append("password", user.password);

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange",  () =>{
      if (xhr.readyState === 4) {
        console.log(xhr.responseText);
        let result = JSON.parse(xhr.responseText);
        console.log(result);
          if(result.length){
            loading.dismiss();
            localStorage.setItem('authenticated' , JSON.stringify(user));
            this.booking.userData.customer_id = result[0].id;
            this.navCtrl.setRoot(PasscodePage);
          }
          else{
            loading.dismiss();
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'Invalid Credentials',
              buttons: ['Ok']
            });
            alert.present();

          }
  
      }
    });

    xhr.open("POST", "https://admin.iphixx.com/api/v1/customers/sign-in");

    xhr.send(data);


}

register(){
  this.navCtrl.push(RegisterPage);
}


}
