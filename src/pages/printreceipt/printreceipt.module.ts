import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrintreceiptPage } from './printreceipt';

@NgModule({
  declarations: [
    PrintreceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(PrintreceiptPage),
  ],
})
export class PrintreceiptPageModule {}
