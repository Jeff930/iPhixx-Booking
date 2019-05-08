import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { BookingProvider } from '../../providers/booking/booking';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { UpgradeofferPage } from '../../pages/upgradeoffer/upgradeoffer';
import { CustomerdetailsPage } from '../../pages/customerdetails/customerdetails';
import { Validators, FormBuilder} from '@angular/forms';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the TestInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test-in',
  templateUrl: 'test-in.html',
})
export class TestInPage {

  device;
  testMobileForm;
  testNonMobileForm;
  note='';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private cart: CartProvider,
              private booking: BookingProvider,
              public formBuilder: FormBuilder,
              private navigation: NavigationProvider,
              public alertCtrl: AlertController
              ) {
        this.device=this.booking.userData.device;
        if (this.device=='Tablet'||this.device=='Phone'){
          console.log("ere");
          this.testMobileForm = formBuilder.group({
            'SD':['', Validators.compose([Validators.required])],
            'frontCam':['', Validators.compose([Validators.required])],
            'rearCam':['', Validators.compose([Validators.required])],
            'home':['', Validators.compose([Validators.required])],
            'volume':['', Validators.compose([Validators.required])],
            'vibrate':['', Validators.compose([Validators.required])],
            'lock':['', Validators.compose([Validators.required])],
            'lightSensor':['', Validators.compose([Validators.required])],
            'earpiece':['', Validators.compose([Validators.required])],
            'speaker':['', Validators.compose([Validators.required])],
            'microphone':['', Validators.compose([Validators.required])],
            'headphone':['', Validators.compose([Validators.required])],
            'moisture':['', Validators.compose([Validators.required])],
            'wifi':['', Validators.compose([Validators.required])],
            'barred':['', Validators.compose([Validators.required])],
          });
        }else{
          console.log("here");
          this.testNonMobileForm = formBuilder.group({
            'power':['', Validators.compose([Validators.required])],
            'display':['', Validators.compose([Validators.required])],
            'systemBoot':['', Validators.compose([Validators.required])],
            'audio':['', Validators.compose([Validators.required])],
            'keyboard':['', Validators.compose([Validators.required])],
            'touchpad':['', Validators.compose([Validators.required])],
            'wifi':['', Validators.compose([Validators.required])],
            'port':['', Validators.compose([Validators.required])],
            'webCam':['', Validators.compose([Validators.required])],
            'battery':['', Validators.compose([Validators.required])],
            'HDD':['', Validators.compose([Validators.required])],
          });
        }
      
      
      }

  ionViewDidLoad() {
    console.log("ere");
    this.cart.goCheckout=0;
  this.cart.completeCheckout=0;
  console.log("ere");
  console.log(this.device);
  this.navigation.activePageIndex=21;
  console.log(this.navigation.activePageIndex);
  }

  Confirm() {
    const confirm = this.alertCtrl.create({
      title: 'No Information Added!',
      message: 'Atleast 1 field is empty',
    });
    confirm.present();
  }

  Proceed(){
    if (this.device=='Phone'|| this.device=='Tablet'){
      if (this.testMobileForm.valid){
        console.log(this.testMobileForm.value); 
        this.booking.mobileTest = this.testMobileForm.value;
        console.log(this.booking.mobileTest);
        this.navCtrl.setRoot(UpgradeofferPage);
      }else{
        this.Confirm();
      }
        
      
    }else{
      if (this.testNonMobileForm.valid){
      console.log(this.testNonMobileForm.value); 
      this.booking.nonMobileTest = this.testNonMobileForm.value;
      console.log(this.booking.nonMobileTest);
      this.navCtrl.setRoot(CustomerdetailsPage);
      }else{
        this.Confirm();
      }
    }
    console.log(this.note);
    if (this.note === '')
      this.note ="No Information Added";
    this.booking.note = this.note;
  }

}
