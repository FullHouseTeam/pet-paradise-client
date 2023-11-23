import { Route } from "@angular/router";
import { ShopCartComponent } from "./components/shop-cart/shop-cart.component";
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { CategoriesAndProductsComponent } from "./pages/categories-and-products/categories-and-products.component";
import { CustomerPageComponent } from "./pages/customer-page/customer-page.component";
import { DescriptionComponent } from "./pages/example-api/description.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { SupportPageComponent } from "./pages/support-page/support-page.component";
import { TermsAndConditionsComponent } from "./pages/terms-and-conditions/terms-and-conditions.component";
export const appRoutes: Route[] = [
  { path: "store", component: CategoriesAndProductsComponent },
  { path: "shop-cart", component: ShopCartComponent },
  { path: "customer", component: CustomerPageComponent },
  { path: "about", component: AboutUsComponent },
  { path: "support", component: SupportPageComponent },
  { path: "terms-and-conditions", component: TermsAndConditionsComponent },
  { path: "", component: HomeComponent },
  { path: "**", component: DescriptionComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
];
