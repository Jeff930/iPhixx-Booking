import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation';
import { CheckoutComponent } from './checkout/checkout';
import { HeaderComponent } from './header/header';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [NavigationComponent,
    CheckoutComponent,
    HeaderComponent,],
	imports: [IonicModule],
	exports: [NavigationComponent,
    CheckoutComponent,
    HeaderComponent,]
})
export class ComponentsModule {}
