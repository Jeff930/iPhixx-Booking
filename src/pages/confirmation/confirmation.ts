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
import * as moment from 'moment';
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
  timestamp:any;
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
        { text: 'Booking Confirmation', style: 'header', alignment: 'right' },

        {
          image: 'data:image/jpeg;base64,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bmcAAAAAAAAAC2Nyb3BSZWN0VG9wbG9uZwAAAAAAOEJJTQPtAAAAAAAQAEgAAAABAAIASAAAAAEAAjhCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAHjhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAAAAAAAAAIADzhCSU0EAgAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOEJJTQQwAAAAAAAcAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAThCSU0ELQAAAAAABgABAAAMdThCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAANXAAAABgAAAAAAAAAAAAAAyAAAAfQAAAARADAAMgAgAFMAcABsAGEAcwBoACAAcwBjAHIAZQBlAG4AMQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAB9AAAAMgAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAMgAAAAAUmdodGxvbmcAAAH0AAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmln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bW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDktMjRUMTg6MDA6NDQtMDc6MDAiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA2LTEwVDEyOjE1OjM0KzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA5LTI0VDE4OjAwOjQ0LTA3OjAwIiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YjQwOTU3ODYtNzMyOC03MzRjLWE3MmMtOTI5ZDVlN2Y1ZTE0IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjA1MzM3NWUtMDVhYS05YzQzLTg2MTEtOGE0NTA0NmUwNzJmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZTliOWQzZTctMTIyMy00YTM3LTk4MTktODZiNTg2NWVkMTQ5Ij4gPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cmRmOkJhZz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSI1NCUiIHBob3Rvc2hvcDpMYXllclRleHQ9IjU0JSIvPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9ImlQaGl4eCIgcGhvdG9zaG9wOkxheWVyVGV4dD0iaVBoaXh4Ii8+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iOTo0MSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iOTo0MSIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6MjBFRTAxRkEwQ0QwMTFFOEE5N0FDQ0M3MUEzOTU2NzU8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplOWI5ZDNlNy0xMjIzLTRhMzctOTgxOS04NmI1ODY1ZWQxNDkiIHN0RXZ0OndoZW49IjIwMTgtMDYtMTBUMTI6MTU6MzQrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3ZjU5YWUwNi0zZGVkLTRhNjItOTcwNC0xYWQxNTZlNjMyZGUiIHN0RXZ0OndoZW49IjIwMTgtMDYtMTBUMjE6MDA6MTUrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjMzI3MjAzNi04YzZhLTZjNDYtYmE2YS1mYWYxNmFhMTBhYzUiIHN0RXZ0OndoZW49IjIwMTgtMDktMjRUMTg6MDA6NDQtMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvanBlZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YjQwOTU3ODYtNzMyOC03MzRjLWE3MmMtOTI5ZDVlN2Y1ZTE0IiBzdEV2dDp3aGVuPSIyMDE4LTA5LTI0VDE4OjAwOjQ0LTA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpjMzI3MjAzNi04YzZhLTZjNDYtYmE2YS1mYWYxNmFhMTBhYzUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2MDUzMzc1ZS0wNWFhLTljNDMtODYxMS04YTQ1MDQ2ZTA3MmYiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplOWI5ZDNlNy0xMjIzLTRhMzctOTgxOS04NmI1ODY1ZWQxNDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/uAA5BZG9iZQBkAAAAAAH/2wCEAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBBwcHDQwNGBAQ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q7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq//9T1TirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdir//1fVOKuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2Kv//W9U4q7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq//9f1TirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdir//2Q==',
          width: 120
        },
        { text: "Saint Martins Road", style: 'plain'},
        { text: "Rosslare Harbour", style: 'plain'},
        { text: "Wexford", style: 'plain'},
        { text: "Y35 C434", style: 'plain'},
        { text: "Phone: 1.800.938.825", style: 'plain'},
        { text: "Email: info@iphixx.com", style: 'plain'},  

        { text: 'Store Details', style: 'subheader' },
        { text: 'Name of Store: ' + this.booking.locationName, style: 'plain'},
        { text: 'Name of Agent: ' + this.booking.agentName, style: 'plain'},
        { text: 'Booking Number Confirmation: ' + this.booking.bookingNumber, style: 'plain'},
        { text: 'Date of Booking: ' + this.timestamp, style: 'plain'},

        { text: 'Customer Details', style: 'subheader' },
        { text: 'Full Name: ' + this.userData.user.firstname + " " + this.userData.user.lastname, style: 'plain'},
        { text: 'Email: ' + this.userData.user.email, style: 'plain'},
        { text: 'Phone Number: ' + this.booking.phone, style: 'plain'},
        { text: 'Alternative Phone: ' + this.booking.mobile, style: 'plain'},

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
          fontSize: 16,
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
        { text: 'Booking Confirmation', style: 'header', alignment: 'right' },

        {
          image: 'data:image/jpeg;base64,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bmcAAAAAAAAAC2Nyb3BSZWN0VG9wbG9uZwAAAAAAOEJJTQPtAAAAAAAQAEgAAAABAAIASAAAAAEAAjhCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAHjhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9QAAAAAASAAvZmYAAQBsZmYABgAAAAAAAQAvZmYAAQChmZoABgAAAAAAAQAyAAAAAQBaAAAABgAAAAAAAQA1AAAAAQAtAAAABgAAAAAAAThCSU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAAAAAAAAAIADzhCSU0EAgAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOEJJTQQwAAAAAAAcAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAThCSU0ELQAAAAAABgABAAAMdThCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAANXAAAABgAAAAAAAAAAAAAAyAAAAfQAAAARADAAMgAgAFMAcABsAGEAcwBoACAAcwBjAHIAZQBlAG4AMQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAB9AAAAMgAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAMgAAAAAUmdodGxvbmcAAAH0AAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmln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bW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDktMjRUMTg6MDA6NDQtMDc6MDAiIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA2LTEwVDEyOjE1OjM0KzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA5LTI0VDE4OjAwOjQ0LTA3OjAwIiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YjQwOTU3ODYtNzMyOC03MzRjLWE3MmMtOTI5ZDVlN2Y1ZTE0IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NjA1MzM3NWUtMDVhYS05YzQzLTg2MTEtOGE0NTA0NmUwNzJmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZTliOWQzZTctMTIyMy00YTM3LTk4MTktODZiNTg2NWVkMTQ5Ij4gPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cmRmOkJhZz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSI1NCUiIHBob3Rvc2hvcDpMYXllclRleHQ9IjU0JSIvPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9ImlQaGl4eCIgcGhvdG9zaG9wOkxheWVyVGV4dD0iaVBoaXh4Ii8+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iOTo0MSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iOTo0MSIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6MjBFRTAxRkEwQ0QwMTFFOEE5N0FDQ0M3MUEzOTU2NzU8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplOWI5ZDNlNy0xMjIzLTRhMzctOTgxOS04NmI1ODY1ZWQxNDkiIHN0RXZ0OndoZW49IjIwMTgtMDYtMTBUMTI6MTU6MzQrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3ZjU5YWUwNi0zZGVkLTRhNjItOTcwNC0xYWQxNTZlNjMyZGUiIHN0RXZ0OndoZW49IjIwMTgtMDYtMTBUMjE6MDA6MTUrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjMzI3MjAzNi04YzZhLTZjNDYtYmE2YS1mYWYxNmFhMTBhYzUiIHN0RXZ0OndoZW49IjIwMTgtMDktMjRUMTg6MDA6NDQtMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL2pwZWciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvanBlZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YjQwOTU3ODYtNzMyOC03MzRjLWE3MmMtOTI5ZDVlN2Y1ZTE0IiBzdEV2dDp3aGVuPSIyMDE4LTA5LTI0VDE4OjAwOjQ0LTA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpjMzI3MjAzNi04YzZhLTZjNDYtYmE2YS1mYWYxNmFhMTBhYzUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2MDUzMzc1ZS0wNWFhLTljNDMtODYxMS04YTQ1MDQ2ZTA3MmYiIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplOWI5ZDNlNy0xMjIzLTRhMzctOTgxOS04NmI1ODY1ZWQxNDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/uAA5BZG9iZQBkAAAAAAH/2wCEAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBBwcHDQwNGBAQ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q7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq//9T1TirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdir//1fVOKuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2KuxV2Kv//W9U4q7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq7FXYq//9f1TirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdirsVdir//2Q==',
          width: 120
        },
        { text: "Saint Martins Road", style: 'plain'},
        { text: "Rosslare Harbour", style: 'plain'},
        { text: "Wexford", style: 'plain'},
        { text: "Y35 C434", style: 'plain'},
        { text: "Phone: 1.800.938.825", style: 'plain'},
        { text: "Email: info@iphixx.com", style: 'plain'},  

        { text: 'Store Details', style: 'subheader' },
        { text: 'Name of Store: ' + this.booking.locationName, style: 'plain'},
        { text: 'Name of Agent: ' + this.booking.agentName, style: 'plain'},
        { text: 'Booking Number: ' + this.booking.bookingNumber, style: 'plain'},
        { text: 'Date of Booking: ' + this.timestamp, style: 'plain'},


        { text: 'Customer Details', style: 'subheader' },
        { text: 'Full Name: ' + this.userData.user.firstname + " " + this.userData.user.lastname, style: 'plain'},
        { text: 'Email: ' + this.userData.user.email, style: 'plain'},
        { text: 'Phone Number: ' + this.booking.phone, style: 'plain'},
        { text: 'Alternative Phone: ' + this.booking.mobile, style: 'plain'},

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
          fontSize: 16,
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
    this.phone=this.userData.user.phone;
    this.phone=this.userData.user.phone2;
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
    this.timestamp=moment(this.booking.created).format("ddd, MMM DD YYYY, hh:mm:ss A"); 
    console.log(this.timestamp);
    console.log(this.timestamp);
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
    this.booking.userData =[];	
    this.booking.repairKey=[];
    this.booking.result='';

  this.booking.device='';
  this.booking.brand='';
  this.booking.model='';
  this.booking.color='';
  this.booking.carrier='';
  this.booking.repair='';
  this.booking.selected='';
  this.booking.currentPage="Select Device";
  this.booking.agentName='';
  this.booking.note='';
  this.booking.mobileTest='';
  this.booking.nonMobileTest='';
  this.booking.locationName='';
  this.booking.ticketNumber='';
  this.booking.phone='';
  this.booking.mobile='';
  this.booking.created='';

  this.cart.selectedRepairs=[''];
  this.cart.selectedIndex=[];
  this.cart.cartMessage='';
  this.cart.Total;
  this.cart.goCheckout;
  this.cart.completeCheckout;
  this.cart.costs=[];
  this.cart.selected='';
  this.cart.unselected='';
  this.cart.otherRepairSelected=false;
  this.cart.customRepair="";
  this.cart.customRepairPrice='';

  this.navi.activePageIndex=1;
  this.navi.other=0;
  this.navi.otherDev=0;
  this.navi.otherRepair=0;

  this.repair.brand='';
  this.repair.model='';
  this.repair.device='';
  this.repair.other=0;

  this.repair.repairs;
  this.repair.modelrepairs =[];

  this.repair.prices=[];
  this.repair.models = [];

  }

  sendEmail() {
    
  }
}
