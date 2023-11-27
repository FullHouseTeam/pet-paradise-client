import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories-container',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './categories-container.component.html',
  styleUrl: './categories-container.component.scss'
})
export class CategoriesContainerComponent {
  categories = [
    { name: 'Dogs', route: '/categories-and-products/dog', imageSrc: '/assets/dog.png' },
    { name: 'Cats', route: '/categories-and-products/cat', imageSrc: '/assets/cat.png' },
    { name: 'Fishes', route: '/categories-and-products/fish', imageSrc: '/assets/fish.png' },
    { name: 'Parrots', route: '/categories-and-products/parrot', imageSrc: '/assets/parrot.png' },
    { name: 'Rodents', route: '/categories-and-products/rodent', imageSrc: '/assets/rodent.png' },
    { name: 'Others', route: '/categories-and-products/reptile', imageSrc: '/assets/others.png' }
  ];

  constructor(private router: Router) {}

  redirectToCategory(route: string) {
    this.router.navigate([route]);
  }
}
