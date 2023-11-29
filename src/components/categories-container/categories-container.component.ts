import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
  selector: 'app-categories-container',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './categories-container.component.html',
  styleUrl: './categories-container.component.scss'
})
export class CategoriesContainerComponent {
  categories = [
    { name: 'Dogs', route: '/store/dog', imageSrc: '../../../assets/images/dog.png' },
    { name: 'Cats', route: '/store/cat', imageSrc: '../../../assets/images/cat.png' },
    { name: 'Fishes', route: '/store/fish', imageSrc: '../../../assets/images/fish.png' },
    { name: 'Birds', route: '/store/bird', imageSrc: '../../../assets/images/parrot.png' },
    { name: 'Rodents', route: '/store/rodent', imageSrc: '../../../assets/images/rodent.png' },
    { name: 'Others', route: '/store/other', imageSrc: '../../../assets/images/others.png' }
  ];

  constructor(private router: Router) {}

  redirectToCategory(route: string) {
    this.router.navigate([route]);
  }
}
