import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation';
import { CheckoutComponent } from './checkout/checkout';
import { HeaderComponent } from './header/header';
import { IonicModule } from 'ionic-angular';
import { CopyrightComponent } from './copyright/copyright';

@NgModule({
	declarations: [NavigationComponent,
    CheckoutComponent,
    HeaderComponent,
    CopyrightComponent,],
	imports: [IonicModule],
	exports: [NavigationComponent,
    CheckoutComponent,
    HeaderComponent,
    CopyrightComponent,]
})
export class ComponentsModule {}
