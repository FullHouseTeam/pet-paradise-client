import { Route } from '@angular/router';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { CategoriesAndProductsComponent } from '../components/categories-and-products/categories-and-products.component';
import { CustomerPageComponent } from '../components/customer-page/customer-page.component';
import { DescriptionComponent } from '../components/example-api/description.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from "../components/login/login.component";
import { ProductInfoComponent } from "../components/product-info/product-info.component";
import { ShopCartComponent } from '../components/shop-cart/shop-cart.component';
import { SupportPageComponent } from '../components/support-page/support-page.component';
import { TermsAndConditionsComponent } from '../components/terms-and-conditions/terms-and-conditions.component';
import {InvoiceComponent} from "../components/invoice/invoice.component";
import { SignUpComponent } from '../components/sign-up/signUp.component';
import { ProductsListComponent } from '../components/products-list/products-list.component';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'store', component: CategoriesAndProductsComponent },
  { path: 'invoice', component: InvoiceComponent},
  { path: 'product/:id', component: ProductInfoComponent},
  { path: 'shop-cart', component: ShopCartComponent },
  { path: 'customer', component: CustomerPageComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'support', component: SupportPageComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: '', component: HomeComponent },
  { path: 'example-api', component: DescriptionComponent },
  { path: 'store/:category', component: CategoriesAndProductsComponent },
  { path: 'about/products', component: ProductsListComponent },
  { path: '**', component: DescriptionComponent }
];
