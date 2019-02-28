import { Component } from '@angular/core';

/**
 * Generated class for the CopyrightComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'copyright',
  templateUrl: 'copyright.html'
})
export class CopyrightComponent {

  text: string;

  constructor() {
    console.log('Hello CopyrightComponent Component');
    this.text = 'Hello World';
  }

}
