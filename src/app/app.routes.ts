import { Route } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ShopCartComponent } from '../components/shop-cart/shop-cart.component';
import { CategoriesAndProductsComponent } from '../components/categories-and-products/categories-and-products.component';
import { CustomerPageComponent } from '../components/customer-page/customer-page.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { SupportPageComponent } from '../components/support-page/support-page.component';
import { TermsAndConditionsComponent } from '../components/terms-and-conditions/terms-and-conditions.component';
import { LogInComponent} from "../components/log-in/log-in.component";

export const appRoutes: Route[] = [
  {
    path: 'categories-and-products',
    component: CategoriesAndProductsComponent
  },
  { path: 'shop-cart', component: ShopCartComponent },
  { path: 'customer', component: CustomerPageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'support', component: SupportPageComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: '', component: HomeComponent },
  { path: 'log-in', component: LogInComponent}
];
