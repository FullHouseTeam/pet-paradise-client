import {Component, OnInit, Renderer2, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent implements OnInit {
  productId: string = '';
  title: string = '';
  price: string = '';
  description: string = '';
  brand: string = '';
  animalCategory: string = '';
  provider: string = '';
  productType: string = '';
  image: string = '';
  isClicked = false;
  productIds: string[] = ['1', '2', '1', '3', '1'];
  constructor(private renderer: Renderer2, private el: ElementRef, private route: ActivatedRoute, private router: Router) {}


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.loadProductDetails();
    });
  }

  private loadProductDetails() {
    this.title = 'Black dog feeder ';
    this.price = '35.99$';
    this.description = 'This pink dog feeder is the perfect way to add a touch of style to your cat\'s feeding area. ' +
        'The feeder is made of durable plastic and is dishwasher safe for easy cleaning. It has a large capacity to ' +
        'hold enough food for your cat for several days.';
    this.brand = 'Dog Chow';
    this.animalCategory = 'Dogs';
    this.provider = 'Purina';
    this.productType = 'Feeder';
    switch (this.productId) {
      case '1':
        this.image = '/assets/feeder.jpg';
        break;
      case '2':
        this.image = '/assets/feeder2.jpg';
        break;
      case '3':
        this.image = '/assets/feeder3.jpg';
        break;
      default:
        this.image = '/assets/feeder.jpg';
        break;
    }
  }

  onClick() {
    this.isClicked = !this.isClicked;

    const buttonElement = this.el.nativeElement.querySelector('.add-Button');

    if (this.isClicked) {
      this.renderer.setStyle(buttonElement, 'background-color', 'red');
      this.renderer.setProperty(buttonElement, 'innerText', 'Remove from Cart');
    } else {
      this.renderer.setStyle(buttonElement, 'background-color', '#3F51B5');
      this.renderer.setProperty(buttonElement, 'innerText', 'Add to Cart');
    }
  }

  redirectToCategoriesAndProducts() {
    this.router.navigate(['/categories-and-products']);
  }
}
