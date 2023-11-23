import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";

@Component({
  standalone: true,
  imports: [HomeComponent, RouterModule, HeaderComponent, FooterComponent],
  selector: "pet-paradise-client-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private router: Router) {}

  title = "pet-paradise-client";

  showHeaderFooter() {
    console.log(
      ["/categories-and-products", "/shop-cart", "/home", "/terms-and-conditions", "/support", "/store", "/about", "/sign-up", "/login"].includes(this.router.url),
      this.router.url
    );
    return ["/categories-and-products", "/shop-cart", "/home", "/terms-and-conditions", "/support", "/store", "/about", "/sign-up", "/login"].includes(this.router.url);
  }
}
