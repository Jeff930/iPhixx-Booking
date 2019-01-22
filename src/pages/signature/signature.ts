import * as $ from "jquery";

import { Component ,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import {SignaturePad} from 'angular2-signaturepad/signature-pad';

import { RepairnumberinfoPage } from '../repairnumberinfo/repairnumberinfo'
import { ThankyouPage } from '../thankyou/thankyou'

/**
 * Generated class for the SignaturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {
  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

  public signaturePadOptions : Object ;
  public signatureImage : string;

  constructor(public navCtrl: NavController) {
    console.log($( window ).width());
    this.signaturePadOptions = {
    
    'minWidth': 2,
    'canvasWidth': $( window ).width() - 50,
    'canvasHeight':  $( window ).height() - 154

    };

  }

  canvasResize() {
    let canvas = document.querySelector('canvas');
    this
      .signaturePad
      .set('minWidth', 1);
      console.log(canvas.offsetWidth);
    this
      .signaturePad
      .set('canvasWidth', canvas.offsetWidth);

    this
      .signaturePad
      .set('canvasHeight', canvas.offsetHeight);
  }


   ngAfterViewInit() {
     console.log("Reset Model Screen");
      this
      .signaturePad
      .clear();
      this.canvasResize();
   }




  drawCancel() {
    this
      .navCtrl
      .push(RepairnumberinfoPage);
   
  }

   drawComplete() {

    this.signatureImage = this
      .signaturePad
      .toDataURL();
    
    console.log(this.signatureImage);

    this.navCtrl.setRoot(ThankyouPage);
 
    // this
    //   .navCtrl
    //   .push(RepairnumberinfoPage, {signatureImage: this.signatureImage});
  }

  drawClear() {
    this
      .signaturePad
      .clear();
  }


}