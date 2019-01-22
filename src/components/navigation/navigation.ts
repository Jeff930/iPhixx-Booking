import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BookingProvider } from '../../providers/booking/booking';
import { HomePage } from '../../pages/home/home';
import { ChoosemodelPage } from '../../pages/choosemodel/choosemodel';
import { ChoosebrandPage } from '../../pages/choosebrand/choosebrand';
import { ColorPage } from '../../pages/color/color';
import { NetworkPage } from '../../pages/network/network';
import { RepairPage } from '../../pages/repair/repair';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the NavigationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'navigation',
  templateUrl: 'navigation.html'
})
export class NavigationComponent {
  devWidth: any;
  text: string;

  constructor(public booking : BookingProvider,public navCtrl: NavController,public platform: Platform) {
    console.log('Hello NavigationComponent Component');
    this.text = 'Hello World';
    this.devWidth = this.platform.width();
    console.log(this.devWidth)
  }

  viewDevice(){
    if (this.booking.selected>=1)
      this.navCtrl.setRoot(HomePage);
    else
      console.log("");
  }

  viewBrand(){
  if (this.booking.selected>=2)
    this.navCtrl.setRoot(ChoosebrandPage);
  else
    console.log("");
   
  }

  viewModel(){
    if (this.booking.selected>=3)
    this.navCtrl.setRoot(ChoosemodelPage);
  else
    console.log("");
   
   
  }

  viewColor(){
    if (this.booking.selected>=4)
    this.navCtrl.setRoot(ColorPage);
  else
    console.log("");
    
  }
 
  viewNetwork(){
    if (this.booking.selected>=5)
    this.navCtrl.setRoot(NetworkPage);
  else
    console.log("");
   
  }

  viewRepair(){
    if (this.booking.selected>=6)
    this.navCtrl.setRoot(RepairPage);
  else
    console.log("");
  }

}
