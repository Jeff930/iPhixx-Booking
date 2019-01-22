import { Component } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { NavController, NavParams } from 'ionic-angular';
import { ChoosemodelPage } from '../../pages/choosemodel/choosemodel';
import { ChoosebrandPage } from '../../pages/choosebrand/choosebrand';
import { OtherdevicePage } from '../../pages/otherdevice/otherdevice';
import { ColorPage } from '../../pages/color/color';
import { NetworkPage } from '../../pages/network/network';
import { RepairPage } from '../../pages/repair/repair';
import { ChooseactionPage } from '../../pages/chooseaction/chooseaction';
import { LoginPage } from '../../pages/login/login';
import { PasscodePage } from '../../pages/passcode/passcode';
import { PhoneofferPage } from '../../pages/phoneoffer/phoneoffer';
import { UpgradeofferPage } from '../../pages/upgradeoffer/upgradeoffer';
import { OtherdevtypePage } from '../../pages/otherdevtype/otherdevtype';
import { EnterdetailPage } from '../../pages/enterdetail/enterdetail';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { CustomerdetailsPage } from '../../pages/customerdetails/customerdetails';
import { OtherrepairPage } from '../../pages/otherrepair/otherrepair';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  index;
  other;
  otherDev;
  otherRepair;

  constructor(public navigation:NavigationProvider, public navCtrl: NavController) {
  }

  Back(){
    this.index=this.navigation.activePageIndex;
    this.other=this.navigation.other;
    this.otherDev=this.navigation.otherDev;
    this.otherRepair=this.navigation.otherRepair;
    switch (this.index){
      case 1://login
        console.log("no back button on loginpage");
        break;
      case 2://register
        this.navCtrl.setRoot(LoginPage);
        break;
      case 3://recover
        this.navCtrl.setRoot(LoginPage);
        break;
      case 4://passcode
        this.navCtrl.setRoot(LoginPage);
        break;
      case 5://chooseaction
        this.navCtrl.setRoot(PasscodePage);
        break;
      case 6://home
        this.navCtrl.setRoot(ChooseactionPage);
        break;
      case 7://select brand
        this.navCtrl.setRoot(HomePage);
        break;
      case 8://other brand
        this.navCtrl.setRoot(ChoosebrandPage);
        break;
      case 9://select model
        this.navCtrl.setRoot(ChoosebrandPage);
        break;
      case 10://select color
        if (this.other==0)
          this.navCtrl.setRoot(ChoosemodelPage);
        else
          this.navCtrl.setRoot(OtherdevicePage);
        break;
      case 11://select carrier
        this.navCtrl.setRoot(ColorPage);
        break;
      case 12://select repair
        this.navCtrl.setRoot(NetworkPage);
        break;
      case 13://upsell
        this.navCtrl.setRoot(RepairPage);
        break;
      case 14://phoneoffer
        this.navCtrl.setRoot(UpgradeofferPage);
        break;
      case 15://booking
         if (this.otherDev==0){
          if (this.otherRepair==0)
            this.navCtrl.setRoot(PhoneofferPage);
          else
            this.navCtrl.setRoot(OtherrepairPage)
        }
        else
          this.navCtrl.setRoot(EnterdetailPage);
        break;        
      case 16://Otherdevtype
        this.navCtrl.setRoot(HomePage);
        break;
      case 17://Enterdetails
        this.navCtrl.setRoot(OtherdevtypePage);
        break;
      case 18://Confirmation
        this.navCtrl.setRoot(CustomerdetailsPage);
        break;
      case 19://RepairNo
        this.navCtrl.setRoot(ChooseactionPage);
        break;
      case 20://Otherrepair
        this.navCtrl.setRoot(RepairPage);
        break;
      
    }

  }

}
