import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BookingProvider } from '../../providers/booking/booking'
import { NavigationProvider } from '../../providers/navigation/navigation';
import { LoginPage } from '../login/login';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

 login_form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams ,  public formBuilder: FormBuilder,
    public booking : BookingProvider , public loading : LoadingController, public alert : AlertController,public navigation: NavigationProvider,) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  ionViewWillLoad() {



    this.login_form = this.formBuilder.group({
      fullname: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
     

    });
    this.navigation.activePageIndex=2;
  }

  register(data){
    let alert = this.alert.create({
        title: 'Succes',
        subTitle: 'Account has been created',
        buttons: ['Ok']
    })
    let loading = this.loading.create({
      //content : 'Signing up please wait...'
    })
    loading.present();
    console.log(data)
   
        let form = new FormData();
        form.append("fullname", data.fullname);
        form.append("email", data.email);
        form.append("phone", data.contact);
        form.append("address", data.street);
        form.append("password", data.password);
        form.append("city", data.city);
        form.append("state", data.state);
        form.append("zip", data.zip);

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange",  ()=> {
          if (xhr.readyState === 4) {
            console.log(JSON.parse(xhr.responseText));
            loading.dismiss();
            alert.present();
            this.navCtrl.push(LoginPage);


          }
        });



        xhr.open("POST", "https://admin.iphixx.com/api/v1/customers/add");
        xhr.send(form);

  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

}
