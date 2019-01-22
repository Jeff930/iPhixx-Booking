import { Injectable } from '@angular/core';

/*
  Generated class for the NavigationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NavigationProvider {
  activePageIndex=1;
  other=0;
  otherDev=0;
  otherRepair=0;

  constructor() {
    console.log('Hello NavigationProvider Provider');
  }

}
