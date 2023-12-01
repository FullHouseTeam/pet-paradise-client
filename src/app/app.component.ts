import { Component } from "@angular/core";
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SharedService } from '../services/globalAttributes/shared.service';


@Component({
  standalone: true,
  imports: [HomeComponent, RouterModule, HeaderComponent, FooterComponent],
  providers: [SharedService], 
  selector: 'pet-paradise-client-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  title = "pet-paradise-client";


  showHeaderFooter() {
    const allowedRoutes = ["/", "/categories-and-products", "/shop-cart", "/home", "/terms-and-conditions", "/support", "/about", "/sign-up", "/login", "/invoice"];

    const isProductPage = this.router.url.includes("/product/");
    const isStorePage = this.router.url.includes("/store/");
    const isShopCartPage = this.router.url.includes("/shop-cart/")

    return allowedRoutes.includes(this.router.url) || isProductPage || isStorePage || isShopCartPage;
  }
}
