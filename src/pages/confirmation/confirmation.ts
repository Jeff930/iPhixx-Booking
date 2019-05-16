import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { commands } from './../../providers/print-service/printer-commands';

import { AlertController, LoadingController, ToastController } from 'ionic-angular';

import { BookingProvider } from '../../providers/booking/booking';
import { CartProvider } from '../../providers/cart/cart';
import { NavigationProvider } from '../../providers/navigation/navigation';
import { RepairProvider } from '../../providers/repair/repair';
import { PrintServiceProvider } from '../../providers/print-service/print-service';

import { ChooseactionPage } from '../chooseaction/chooseaction';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  
  pdfObj = null;
  userData;
  count=0;
  countsmall=0;
  smallpdfObj = null;
  header="Invoice";
  subheader="iPhixx";
  store="Name of Store: ";
  agent="Name of Agent: Ryan Margolin";
  repairno="Invoice Number: 1234567890";
  custheader="CUSTOMER DETAILS";
  customer="Name of Customer:";
  birthdate="Birthdate:";
  email="Email Address:";
  phone="Phone Number:";
  pin="Pin: 9876543210";
  devheader="DEVICE DETAILS";
  brand="Brand:";
  model="Model:";
  color="Color:";
  carrier="Carrier:";
  repheader="REPAIR DETAILS";
  rep="Cost Breakdown";
  selrep=[];
  selcost=[''];
  total="TOTAL: ";
  totalCost="€";
  footer="Thank you for your business with iPhixx!";
  lineLength=0;
  spaceLength=0;
  space='';
  delivery="Delivery Service by: Nightline Group Courier";
  service="Services";
  dev;
  note = this.booking.note;
  mobileTest=['SD slot','Front Camera','Rear Camera','Home Button','Volume Buttons','Vibrate','Lock Button','Light Sensor','Earpiece','Speaker','Microphone','Headphone Jack','Moisture Tabs','Wifi','Barred'];
  nonMobileTest=['Power Button','Display','System Boot','Audio','Keyboard','Touchpad','Wifi','Ports','Web Camera','Battery','HDD'];
  varMobileTest=['SD','frontCam','rearCam','home','volume','vibrate','lock','lightSensor','earpiece','speaker','microphone','headphone','moisture','wifi','barred'];
  varNonMobileTest=['power','display','systemBoot','audio','keyboard','touchpad','wifi','port','webCam','battery','HDD'];
  constructor(private plt: Platform, private file: File, private fileOpener: FileOpener,public navCtrl: NavController, public navParams: NavParams, public booking: BookingProvider,public cart: CartProvider,public navi: NavigationProvider,public repair: RepairProvider, public print:PrintServiceProvider,public alertCtrl:AlertController, private loadCtrl: LoadingController, private toastCtrl: ToastController) {
    this.dev=this.booking.userData.device;
    this.userData = this.booking.userData;
    console.log(this.userData);
  }

  createMobilePdf() {

    var titleRows = [];
    var rows = [];
    var totalRow = [];
    var testRows = [];
    titleRows.push(['Services', 'Cost']);
    totalRow.push(['Total Cost', this.cart.Total + ".00 €"]);

    console.log("hey");
    console.log(this.booking.userData.selectedRepair);
    for(var i of this.booking.userData.selectedRepair) {
        rows.push([i, this.cart.costs[this.count] +' €']);
        this.count++;
    } 
    var limit = this.mobileTest.length/2;
    console.log(limit);
    for(var j=0;j<this.mobileTest.length-1;j+=2) {
      console.log(j);
      testRows.push([this.mobileTest[j],this.booking.mobileTest[this.varMobileTest[j]],this.mobileTest[j+1],this.booking.mobileTest[this.varMobileTest[j+1]]]);
  } 
    if(limit!=0){
      testRows.push([this.mobileTest[this.mobileTest.length-1],this.booking.mobileTest[this.varMobileTest[this.mobileTest.length-1]],'','']);
    }
    console.log("hey");
    var docDefinition = {

      footer:[
        { text: 'Thank you for your business with iPhixx!', style: 'subheader',alignment: 'center'},
      ],

      content: [
        { text: 'Invoice', style: 'maxheader', alignment: 'right' },

        { text: 'Iphixx', style: 'header' },
        { text: 'Name of Store: ' + this.booking.locationName, style: 'plain'},
        { text: 'Name of Agent: ' + this.booking.agentName, style: 'plain'},
        { text: 'Repair Number Confirmation: ' + this.booking.ticketNumber, style: 'plain'},

        { text: 'Customer Details', style: 'subheader' },
        { text: 'Full Name: ' + this.userData.user.firstname + " " + this.userData.user.lastname, style: 'plain'},
        { text: 'Email: ' + this.userData.user.email, style: 'plain'},

        { text: 'Device Details', style: 'subheader' },
        { text: 'Device Model: ' + this.userData.brand + ' ' + this.userData.model, style: 'plain'},
        { text: 'Color: ' + this.userData.color, style: 'plain'},
        { text: 'Carrier: ' + this.userData.network, style: 'plain'},

        { text: 'Additional Details', style: 'subheader' },
        { text: this.booking.note, style: 'plain'},
        { text: 'Test Options', style: 'subheader' },
        {
          table: {
          widths: ['30%','20%','30%','20%'],
          body: testRows,},style:'plain',layout:'noBorders'},
        {
          table: {
          widths: ['80%','20%'],
          body: titleRows,},style:'subheader'},
        {
          table: {
          widths: ['80%','20%'],
          body: rows,},style:'plain'},
        {
          table: {
          widths: ['80%','20%'],
          body: totalRow,},style:'total',layout: 'noBorders'},
        
      ],
      styles: {
        maxheader: {
          fontSize: 30,
          bold: true,
        },
        header: {
          fontSize: 20,
          bold: true,
        },
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        total: {
          fontSize: 16,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        plain: {
          fontSize: 10,
          margin: [0, 0, 0, 0]
        },
      },
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  createPdf() {

    var titleRows = [];
    var rows = [];
    var totalRow = [];
    var testRows = [];
    titleRows.push(['Services', 'Cost']);
    totalRow.push(['Total Cost', this.cart.Total + ".00 €"]);

    console.log("hey");
    console.log(this.booking.userData.selectedRepair);
    for(var i of this.booking.userData.selectedRepair) {
        rows.push([i, this.cart.costs[this.count] +' €']);
        this.count++;
    } 

    var limit = this.nonMobileTest.length/2;
    console.log(limit);
    for(var j=0;j<this.nonMobileTest.length-1;j+=2) {
      console.log(j);
      testRows.push([this.nonMobileTest[j],this.booking.nonMobileTest[this.varNonMobileTest[j]],this.nonMobileTest[j+1],this.booking.nonMobileTest[this.varNonMobileTest[j+1]]]);
  } 
    if(limit!=0){
      testRows.push([this.nonMobileTest[this.nonMobileTest.length-1],this.booking.nonMobileTest[this.varNonMobileTest[this.nonMobileTest.length-1]],'','']);
    }

    console.log("hey");
    var docDefinition = {

      footer:[
        { text: 'Thank you for your business with iPhixx!', style: 'subheader',alignment: 'center'},
      ],

      content: [
        { text: 'Booking Confirmation', style: 'maxheader', alignment: 'right' },

        { text: 'Store Details', style: 'subheader' },
        { text: 'Name of Store: ' + ' Walmart', style: 'plain'},
        { text: 'Name of Agent: ' + this.booking.agentName, style: 'plain'},
        { text: 'Repair Number Confirmation: ' + ' 0123456789', style: 'plain'},

        { text: 'Customer Details', style: 'subheader' },
        { text: 'Full Name: ' + this.userData.user.firstname + " " + this.userData.user.lastname, style: 'plain'},
        { text: 'Email: ' + this.userData.user.email, style: 'plain'},

        { text: 'Device Details', style: 'subheader' },
        { text: 'Device Model: ' + this.userData.brand + ' ' + this.userData.model, style: 'plain'},

        { text: 'Additional Details', style: 'subheader' },
        { text: this.booking.note, style: 'plain'},

        { text: 'Test Options', style: 'subheader' },
        {
          table: {
          widths: ['30%','20%','30%','20%'],
          body: testRows,},style:'plain',layout:'noBorders'},      
        {
          table: {
          widths: ['80%','20%'],
          body: titleRows,},style:'subheader'},
        {
          table: {
          widths: ['80%','20%'],
          body: rows,},style:'plain'},
        {
          table: {
          widths: ['80%','20%'],
          body: totalRow,},style:'total',layout: 'noBorders'},
        
      ],
      styles: {
        maxheader: {
          fontSize: 30,
          bold: true,
        },
        header: {
          fontSize: 20,
          bold: true,
        },
        subheader: {
          fontSize: 12,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        total: {
          fontSize: 16,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        plain: {
          fontSize: 10,
          margin: [0, 0, 0, 0]
        },
      },
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
 
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

  // createsmallPdf() {

  //   var titleRows = [];
  //   var rows = [];
  //   var totalRow = [];
  //   titleRows.push(['Services', 'Cost']);
  //   totalRow.push(['Total Cost', "€"+this.cart.Total + ".00"]);

  //   console.log("hey");
  //   for(var i of this.userData.selectedRepair) {
  //       rows.push([i, "€"+ this.cart.costs[this.countsmall]]);
  //       this.countsmall++;
  //   } 
  //   console.log("hey");
  //   var docDefinition = {
  //     pageSize: {
  //       width: 195,
  //       height: 188
  //     },
  //     pageMargins: [5,5,5,5],

  //     content: [
  //       { text: 'Invoice', style: 'header', alignment: 'right' },

  //       { text: 'Iphixx', style: 'header' },
  //       { text: 'Name of Store: ' + ' Walmart', style: 'plain'},
  //       { text: 'Name of Agent: ' + ' Ryan Margolin', style: 'plain'},
  //       { text: 'Repair Number Confirmation: ' + ' 0123456789', style: 'plain'},

  //       { text: 'Customer Details', style: 'subheader' },
  //       { text: 'Full Name: ' + this.userData.user.fullname, style: 'plain'},
  //       { text: 'Email: ' + this.userData.user.email, style: 'plain'},

  //       { text: 'Device Details', style: 'subheader' },
  //       { text: 'Device Model: ' + this.userData.brand + ' ' + this.userData.model, style: 'plain'},
  //       { text: 'Color: ' + this.userData.color, style: 'plain'},
  //       { text: 'Carrier: ' + this.userData.network, style: 'plain'},
  //       {
  //         table: {
  //         widths: ['80%','20%'],
  //         body: titleRows,},style:'subheader'},
  //       {
  //         table: {
  //         widths: ['80%','20%'],
  //         body: rows,},style:'plain'},
  //       {
  //         table: {
  //         widths: ['80%','20%'],
  //         body: totalRow,},style:'header',layout: 'noBorders'},
        
  //     ],
  //     styles: {
  //       header: {
  //         fontSize: 5,
  //         bold: true,
  //       },
  //       subheader: {
  //         fontSize: 6,
  //         bold: true,
  //         margin: [0, 3, 0, 0]
  //       },
  //       plain: {
  //         fontSize: 4,
  //         margin: [0, 0, 0, 0]
  //       },
  //     },
  //   }
  //   this.smallpdfObj = pdfMake.createPdf(docDefinition);
  // }

  // downloadsmallPdf() {
  //   if (this.plt.is('cordova')) {
  //     this.smallpdfObj.getBuffer((buffer) => {
  //       var blob = new Blob([buffer], { type: 'application/pdf' });
 
  //       // Save the PDF to the data Directory of our App
  //       this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
  //         // Open the PDf with the correct OS tools
  //         this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
  //       })
  //     });
  //   } else {
  //     // On a browser simply use download!
  //     this.smallpdfObj.download();
  //   }
  // }

  // showToast(data) { 
  //   let toast = this.toastCtrl.create({
  //     duration: 3000,
  //     message: data,
  //     position: 'bottom'
  //   });
  //   toast.present();
  // }

  // noSpecialChars(string) {
  //   var translate = {
  //       "à": "a",
  //       "á": "a",
  //       "â": "a",
  //       "ã": "a",
  //       "ä": "a",
  //       "å": "a",
  //       "æ": "a",
  //       "ç": "c",
  //       "è": "e",
  //       "é": "e",
  //       "ê": "e",
  //       "ë": "e",
  //       "ì": "i",
  //       "í": "i",
  //       "î": "i",
  //       "ï": "i",
  //       "ð": "d",
  //       "ñ": "n",
  //       "ò": "o",
  //       "ó": "o",
  //       "ô": "o",
  //       "õ": "o",
  //       "ö": "o",
  //       "ø": "o",
  //       "ù": "u",
  //       "ú": "u",
  //       "û": "u",
  //       "ü": "u",
  //       "ý": "y",
  //       "þ": "b",
  //       "ÿ": "y",
  //       "ŕ": "r",
  //       "À": "A",
  //       "Á": "A",
  //       "Â": "A",
  //       "Ã": "A",
  //       "Ä": "A",
  //       "Å": "A",
  //       "Æ": "A",
  //       "Ç": "C",
  //       "È": "E",
  //       "É": "E",
  //       "Ê": "E",
  //       "Ë": "E",
  //       "Ì": "I",
  //       "Í": "I",
  //       "Î": "I",
  //       "Ï": "I",
  //       "Ð": "D",
  //       "Ñ": "N",
  //       "Ò": "O",
  //       "Ó": "O",
  //       "Ô": "O",
  //       "Õ": "O",
  //       "Ö": "O",
  //       "Ø": "O",
  //       "Ù": "U",
  //       "Ú": "U",
  //       "Û": "U",
  //       "Ü": "U",
  //       "Ý": "Y",
  //       "Þ": "B",
  //       "Ÿ": "Y",
  //       "Ŕ": "R"
  //     },
  //     translate_re = /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŕŕÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÝÝÞŸŔŔ]/gim;
  //   return (string.replace(translate_re, function (match) {
  //     return translate[match];
  //   }));
  // }

  // printReceipt(device, data) {
  //   console.log('Device mac: ', device);
  //   console.log('Data: ', data);
  //   let load = this.loadCtrl.create({
  //     content: 'Printing...'
  //   }); 
  //   load.present();
  //   this.print.connectBluetooth(device).subscribe(status => {
  //       console.log(status);
  //       this.print.printData(this.noSpecialChars(data))
  //         .then(printStatus => {
  //           console.log(printStatus);
  //           let alert = this.alertCtrl.create({
  //             title: 'Successful print!',
  //             buttons: ['Ok']
  //           });
  //           load.dismiss();
  //           alert.present();
  //           this.print.disconnectBluetooth();
  //         })
  //         .catch(error => {
  //           console.log(error);
  //           let alert = this.alertCtrl.create({
  //             title: 'There was an error printing, please try again!',
  //             buttons: ['Ok']
  //           });
  //           load.dismiss();
  //           alert.present();
  //           this.print.disconnectBluetooth();
  //         });
  //     },
  //     error => {
  //       console.log(error);
  //       let alert = this.alertCtrl.create({
  //         title: 'There was an error connecting to the printer, please try again!',
  //         buttons: ['Ok']
  //       });
  //       load.dismiss();
  //       alert.present();
  //     });
  // }

  // prepareToPrint() {
  //   // u can remove this when generate the receipt using another method
  //   let receipt = '';
  //   receipt += commands.HARDWARE.HW_INIT;
  //   receipt += commands.TEXT_FORMAT.TXT_4SQUARE;
  //   receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
  //   receipt += this.header.toUpperCase();
  //   receipt += commands.EOL;
  //   receipt += commands.TEXT_FORMAT.TXT_NORMAL;
  //   receipt += commands.HORIZONTAL_LINE.HR_58MM;
  //   receipt += commands.EOL;
  //   receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
  //   receipt += this.subheader;
  //   receipt += commands.EOL;
  //   receipt += commands.EOL;
  //   receipt += commands.TEXT_FORMAT.TXT_ALIGN_LT;
  //   receipt += this.store;
  //   receipt += commands.EOL;
  //   receipt += this.agent;
  //   receipt += commands.EOL;
  //   receipt += this.repairno;
  //   receipt += commands.EOL;
  //   receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
  //   receipt += commands.HORIZONTAL_LINE.HR_58MM1;
  //   receipt += commands.EOL;
  //   receipt += commands.TEXT_FORMAT.TXT_ALIGN_LT;
  //   receipt += commands.TEXT_FORMAT.TXT_BOLD_ON;
  //   receipt += this.custheader;
  //   receipt += commands.TEXT_FORMAT.TXT_BOLD_OFF;
  //   receipt += commands.EOL;
  //   receipt += this.customer;
  //   receipt += commands.EOL;
  //   receipt += this.birthdate;
  //   receipt += commands.EOL;
  //   receipt += this.email;
  //   receipt += commands.EOL;
  //   receipt += this.phone;
  //   receipt += commands.EOL;
  //   receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
  //   receipt += commands.HORIZONTAL_LINE.HR_58MM1;
  //   receipt += commands.EOL;
  //   receipt += commands.TEXT_FORMAT.TXT_ALIGN_LT;
  //   receipt += commands.TEXT_FORMAT.TXT_BOLD_ON;
  //   receipt += this.devheader;
  //   receipt += commands.TEXT_FORMAT.TXT_BOLD_OFF;
  //   receipt += commands.EOL;
  //   receipt += this.model;
  //   if (this.dev=='Tablet'||this.dev=='Phone'){
  //     receipt += commands.EOL;
  //     receipt += this.color;
  //     receipt += commands.EOL;
  //     receipt += this.carrier;
  //   }
  //   receipt += commands.EOL;
  //   receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
  //   receipt += commands.HORIZONTAL_LINE.HR_58MM1;
  //   receipt += commands.EOL;
  //   receipt += commands.TEXT_FORMAT.TXT_ALIGN_LT;
  //   receipt += commands.TEXT_FORMAT.TXT_BOLD_ON;
  //   receipt += this.repheader;
  //   receipt += commands.TEXT_FORMAT.TXT_BOLD_OFF;
  //   receipt += commands.EOL;
  //   receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
  //   receipt += this.rep;
  //   receipt += commands.EOL;
  //   for (var i=0;i<this.selrep.length;i++){
  //     receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
  //     receipt += this.selrep[i];
  //     this.lineLength = this.selrep[i].length+this.selcost[i].length;
  //     console.log("price"+this.selcost[i].length);
  //     this.spaceLength = 46-this.lineLength;
  //     this.space= ".";
  //     for (var j=0;j<this.spaceLength;j++){
  //       receipt += this.space;
  //     }
  //     receipt += this.selcost[i];
  //     receipt += commands.EOL;
  //   }
  //   receipt += commands.EOL;
  //   receipt += commands.TEXT_FORMAT.TXT_ALIGN_RT;
  //   receipt += this.total;
  //   receipt += this.totalCost;
  //   receipt += commands.EOL;
  //   receipt += commands.EOL;
  //   receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
  //   receipt += this.delivery;
  //   receipt += commands.EOL;
  //   receipt += this.service;
  
  // // repheader="Repair Details";
  // // rep="Selected Repairs";
  // // selrep=[];
  // // cost="Cost";
  // // selcost=[];
  // // total="Total Cost:";
  // // totalCost="€";
  //   //secure space on footer
  //   receipt += commands.EOL;
  //   receipt += commands.TEXT_FORMAT.TXT_NORMAL;
  //   receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
  //   receipt += this.footer;
  //   receipt += commands.EOL;
  //   receipt += commands.EOL;

  //   console.log(receipt);

  //   let alert = this.alertCtrl.create({
  //     title: 'Select your printer',
  //     buttons: [{
  //         text: 'Cancel',
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Select printer',
  //         handler: (device) => {
  //           if(!device){
  //             this.showToast('Select a printer!');
  //             return false;
  //           }
  //           console.log(device);
  //           this.printReceipt(device, receipt);
  //         }
  //       }
  //     ]
  //   });

  //   this.print.enableBluetooth().then(() => {
  //     this.print.searchBluetooth().then(devices => {
  //       devices.forEach((device) => {
  //         console.log('Devices: ', JSON.stringify(device));
  //         alert.addInput({
  //           name: 'printer',
  //           value: device.address,
  //           label: device.name,
  //           type: 'radio'
  //         });
  //       });
  //       alert.present();
  //     }).catch((error) => {
  //       console.log(error);
  //       this.showToast('There was an error connecting the printer, please try again!');
  //     });
  //   }).catch((error) => {
  //     console.log(error);
  //     this.showToast('Error activating bluetooth, please try again!');
  //   });
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmationPage');
    this.navi.activePageIndex=18;
    this.customer="Name of Customer: " + this.userData.user.fullname;
    this.email="Email Address: " + this.userData.user.email;
    this.phone="Phone Number: " + this.userData.user.phone;
    this.model="Model:" + this.userData.brand+" "+this.userData.model;
    this.color="Color:" + this.userData.color;
    this.birthdate="Birthdate: " + this.userData.user.birthdate;
    this.carrier="Carrier:" + this.userData.network;
    this.selrep=this.cart.selectedRepairs;
    console.log("selrep"+this.selrep)
    console.log("selectrep"+this.userData.selectedRepair);
    this.selcost=this.cart.costs;
    console.log("costs: " + JSON.stringify(this.selcost));
    this.totalCost= this.cart.Total+".00 EUR";
    console.log(this.totalCost);
    if (this.dev=='Tablet'||this.dev=='Phone'){
      this.createMobilePdf();
    }else{
      this.createPdf();
    }
    
    this.downloadPdf();
    //this.createsmallPdf();
    //this.downloadsmallPdf();
    //this.sendEmail();
    //this.prepareToPrint();
  }

  gotoHome(){
    this.navCtrl.setRoot(ChooseactionPage);
    this.booking.brand='';
    this.booking.carrier='';
    this.booking.color='';
    this.booking.repair='';
    this.booking.model='';
    this.booking.note='';
    this.cart.selectedRepairs=[];
    this.cart.selectedIndex=[];
    this.cart.cartMessage="There are currently no items in your cart.";
    this.cart.Total=0;
    this.cart.costs=[];
    this.repair.modelrepairs=[];
    this.repair.prices=[];
    this.cart.completeCheckout=[];
    this.cart.goCheckout=[];
  }

}
