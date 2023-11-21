import { Route } from '@angular/router';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { CategoriesAndProductsComponent } from '../components/categories-and-products/categories-and-products.component';
import { CustomerPageComponent } from '../components/customer-page/customer-page.component';
import { HomeComponent } from '../components/home/home.component';
import { ShopCartComponent } from '../components/shop-cart/shop-cart.component';
import { SupportPageComponent } from '../components/support-page/support-page.component';
import { TermsAndConditionsComponent } from '../components/terms-and-conditions/terms-and-conditions.component';
import { DescriptionComponent } from '../components/example-api/description.component';
import { ProductInfoComponent } from "../components/product-info/product-info.component";
export const appRoutes: Route[] = [
  { path: 'store', component: CategoriesAndProductsComponent },
  { path: 'shop-cart', component: ShopCartComponent },
  { path: 'customer', component: CustomerPageComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'support', component: SupportPageComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'example-api', component: DescriptionComponent },
  { path: 'product/:id', component: ProductInfoComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: DescriptionComponent },
  { path: 'example-api', component: DescriptionComponent },
  { path: 'product/:id', component: ProductInfoComponent },
];

