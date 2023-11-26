import { Component } from "@angular/core";
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from '../components/home/home.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  standalone: true,
  imports: [HomeComponent, RouterModule, HeaderComponent, FooterComponent],
  selector: 'pet-paradise-client-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  title = "pet-paradise-client";

  showHeaderFooter() {

    return ["/", "/categories-and-products", "/shop-cart", "/home", "/terms-and-conditions", "/support", "/store", "/about", "/sign-up", "/login"].includes(this.router.url);

  }
}
