// import * as $ from "jquery";
import { Component  } from '@angular/core';
import {  NavController, NavParams , LoadingController , AlertController, MenuController , Platform  } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse , HttpParams} from '@angular/common/http';

// import { ChooseactionPage } from '../chooseaction/chooseaction';
import { PasscodePage } from '../passcode/passcode';

import { BookingProvider } from '../../providers/booking/booking';

//import { ChooseactionPage } from '../chooseaction/chooseaction';
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
  data=[];

  constructor(
  	public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public booking : BookingProvider,
    public alertCtrl : AlertController,
    public menuCtrl : MenuController,
    public platform : Platform,
    public http : HttpClient
     ) {

    this.menuCtrl.enable(true, 'loginMenu');
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
      email: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.required),
     

    });
  }

  recover(){
    this.navCtrl.setRoot(RecoverPage);
  }

  // login(user){
  //   console.log(user);
 
  // 	let loading = this.loadingCtrl.create({
  //      //content: 'Logging in please wait...'
  //   });
  //   loading.present();

  //   this.doLogin(user).subscribe((data:any)=>{this.data=data
  //     console.log(this.data);
  //   },(error:any)=>{console.log(error)});
  // }

  login(user){
    console.log(user);
 
  	let loading = this.loadingCtrl.create({
       //content: 'Logging in please wait...'
    });
    loading.present();
  	
    // let body = new HttpParams()
    //  .set('email',user.email)
    //  .set('password',user.password)

    // console.log(body);
  
    // return this.http.post('https://heroku-app.com/https://iphixx.repairshopr.com/api/v1/sign_in?api_key=79bc78aa-81d3-4d8c-94db-5a07a0374670',
    //   body.toString(), { headers : { 'Content-Type' : 'application/json',
    //                         } ,params : {  } })

    let data = new FormData();
    data.append("email", user.email);
    data.append("password", user.password);
    let xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;

    xhr.addEventListener("readystatechange",  () =>{
      if (xhr.readyState === 4) {
        console.log(xhr.responseText);
        let result = JSON.parse(xhr.responseText);
        console.log(result.user_token);
          if(result.user_token!=null){
            loading.dismiss();
            localStorage.setItem('authenticated' , result.user_name);
            var locations = JSON.stringify(result.locations_allowed).substring(1);
            localStorage.setItem('locations',JSON.stringify(result.locations_allowed));
            
            console.log(result.user_name);
            this.booking.userData.customer_id = result.user_id;
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
    var url = "https://cors-anywhere.herokuapp.com/https://iphixx.repairshopr.com/api/v1/sign_in?api_key=8e5044d0-6f23-49ef-9c9a-25c516f3debc=&email="+user.email+"&password="+user.password;
    console.log(JSON.stringify(url));
    xhr.open("POST", url);
   // xhr.open("POST", "https://admin.iphixx.com/api/v1/customers/sign-in");

    xhr.send();


    // this.navCtrl.setRoot(PasscodePage);
}

register(){
  this.navCtrl.push(RegisterPage);
}


}
