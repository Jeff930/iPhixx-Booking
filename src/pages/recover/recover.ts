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
  selector: 'page-recover',
  templateUrl: 'recover.html',
})
export class RecoverPage {


  code = [];
 login_form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams ,  public formBuilder: FormBuilder,
    public booking : BookingProvider , public loading : LoadingController, public alert : AlertController,public navigation: NavigationProvider,) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  ionViewWillLoad() {



    this.login_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      code1: new FormControl('', Validators.required),
      code2: new FormControl('', Validators.required),
      code3: new FormControl('', Validators.required),
      code4: new FormControl('', Validators.required),
      code5: new FormControl('', Validators.required),
     

    });
    this.navigation.activePageIndex=3;
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

  verify(data){
    console.log(data);
  }

}
