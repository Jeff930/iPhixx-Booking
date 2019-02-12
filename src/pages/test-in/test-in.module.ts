import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestInPage } from './test-in';

@NgModule({
  declarations: [
    TestInPage,
  ],
  imports: [
    IonicPageModule.forChild(TestInPage),
  ],
})
export class TestInPageModule {}
