import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  standalone: true,
  imports: [HomeComponent, RouterModule, HeaderComponent, FooterComponent],
  selector: 'pet-paradise-client-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pet-paradise-client';
}
