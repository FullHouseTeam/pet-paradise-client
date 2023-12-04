import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomCarouselComponent } from './custom-carousel.component';

describe('CustomCarouselComponent', () => {
  let component: CustomCarouselComponent;
  let fixture: ComponentFixture<CustomCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CustomCarouselComponent]
    });
    fixture = TestBed.createComponent(CustomCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should show more items', () => {
    component.currentIndex = 0;
    component.productsShuffled = [
      {
        "productID": 1,
        "name": "Cat Collar Funny",
        "price": 30,
        "quantity": 200,
        "discount": 0,
        "animalCategory": "cat",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701218817/Pet/CatCollar.jpg",
        "description": "When you cant free your hands to play with your cat you can install the toy on your feet when you are playing with your mobile phone or watching TV You only need to move your feet simply your cat Will come to play with you can increase the intimacy between the owner and the pet",
        "productType": "toy",
        "brandID": "2",
        "providerID": 2,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 2,
        "name": "Cat Feeder Blue",
        "price": 30,
        "quantity": 200,
        "discount": 10,
        "animalCategory": "cat",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701218817/Pet/catFeederBlue.jpg",
        "description": "This specially designed removable visible storage container is easy to clean and the stainless steel bowl is made to ensure that your pets have easy and comfortable access to healthy and hygienic food",
        "productType": "feeder",
        "brandID": "2",
        "providerID": 1,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 3,
        "name": "Dog Ball Toy",
        "price": 95,
        "quantity": 200,
        "discount": 50,
        "animalCategory": "dog",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701218817/Pet/dogCatBalls.jpg",
        "description": "Pack of four Dog balls seven centimeters in diameter each Bright colors and suitable size perfect for small and medium dogs",
        "productType": "toy",
        "brandID": "1",
        "providerID": 3,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 4,
        "name": "Patricks Day Costume for Lizard",
        "price": 35,
        "quantity": 100,
        "discount": 15,
        "animalCategory": "other",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701218817/Pet/reptileClothes.jpg",
        "description": "The green mini hats are decorated with a golden shamrock in the center and the lizard bandanas are full of Patricks Day atmosphere",
        "productType": "clothes",
        "brandID": "6",
        "providerID": 3,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 6,
        "name": "Dog Nail Clippers",
        "price": 15,
        "quantity": 10,
        "discount": 5,
        "animalCategory": "dog",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701440903/Pet/CortaU%C3%B1as.jpg",
        "description": "Ergonomically designed non slip handles are strong lightweight and comfortable Sharp blades are made of high quality stainless",
        "productType": "care",
        "brandID": "1",
        "providerID": 1,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 7,
        "name": "Natural Pellets Bird Food",
        "price": 10,
        "quantity": 40,
        "discount": 0,
        "animalCategory": "bird",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701441116/Pet/semillas.jpg",
        "description": "Healty and delicious fresh wholesome natural bird food made with vegetables precisely formulated with the essential vitamins minerals and amino acids your bird needs every day for a balanced diet",
        "productType": "food",
        "brandID": "3",
        "providerID": 5,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 8,
        "name": "Iron Bird Cage",
        "price": 100,
        "quantity": 140,
        "discount": 6,
        "animalCategory": "bird",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701441065/Pet/jaulaAve.jpg",
        "description": "Made of solid steel powder coated with oxidant resistant paint this metal bird cage boasts high strength improved safety and ensured durability",
        "productType": "house",
        "brandID": "3",
        "providerID": 6,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 9,
        "name": "Fish Tank with LED Lights",
        "price": 25,
        "quantity": 110,
        "discount": 0,
        "animalCategory": "fish",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701440872/Pet/pescera.jpg",
        "description": "The fish tank is equipped with led lights and two decorative plastic aquatic plants and you can also buy other decorations by yourself Whats more the small fish tank would be make you more happy and relaxed even in day or at night",
        "productType": "house",
        "brandID": "4",
        "providerID": 1,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 11,
        "name": "Professional Glass Terrarium",
        "price": 299,
        "quantity": 110,
        "discount": 15,
        "animalCategory": "other",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701440843/Pet/terrario.jpg",
        "description": "The compact design mini terrarium is made with high quality thick and extremely high hardness tempered PC glass materials for more safety An ideal habitat for desert animals The touch screen top opening provides ventilation and allows UVB and infrared penetration",
        "productType": "house",
        "brandID": "6",
        "providerID": 3,
        "isAvailable": "true",
        "hasTax": "true"
      }];
    component.showMore();
    expect(component.productsToShow.length).toBeGreaterThan(1);
  });

  it('should show less items', () => {
    component.currentIndex = 4;
    component.productsShuffled = [{
      "productID": 1,
      "name": "Cat Collar Funny",
      "price": 30,
      "quantity": 200,
      "discount": 0,
      "animalCategory": "cat",
      "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701218817/Pet/CatCollar.jpg",
      "description": "When you cant free your hands to play with your cat you can install the toy on your feet when you are playing with your mobile phone or watching TV You only need to move your feet simply your cat Will come to play with you can increase the intimacy between the owner and the pet",
      "productType": "toy",
      "brandID": "2",
      "providerID": 2,
      "isAvailable": "true",
      "hasTax": "true"
    },
      {
        "productID": 2,
        "name": "Cat Feeder Blue",
        "price": 30,
        "quantity": 200,
        "discount": 10,
        "animalCategory": "cat",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701218817/Pet/catFeederBlue.jpg",
        "description": "This specially designed removable visible storage container is easy to clean and the stainless steel bowl is made to ensure that your pets have easy and comfortable access to healthy and hygienic food",
        "productType": "feeder",
        "brandID": "2",
        "providerID": 1,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 3,
        "name": "Dog Ball Toy",
        "price": 95,
        "quantity": 200,
        "discount": 50,
        "animalCategory": "dog",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701218817/Pet/dogCatBalls.jpg",
        "description": "Pack of four Dog balls seven centimeters in diameter each Bright colors and suitable size perfect for small and medium dogs",
        "productType": "toy",
        "brandID": "1",
        "providerID": 3,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 4,
        "name": "Patricks Day Costume for Lizard",
        "price": 35,
        "quantity": 100,
        "discount": 15,
        "animalCategory": "other",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701218817/Pet/reptileClothes.jpg",
        "description": "The green mini hats are decorated with a golden shamrock in the center and the lizard bandanas are full of Patricks Day atmosphere",
        "productType": "clothes",
        "brandID": "6",
        "providerID": 3,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 6,
        "name": "Dog Nail Clippers",
        "price": 15,
        "quantity": 10,
        "discount": 5,
        "animalCategory": "dog",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701440903/Pet/CortaU%C3%B1as.jpg",
        "description": "Ergonomically designed non slip handles are strong lightweight and comfortable Sharp blades are made of high quality stainless",
        "productType": "care",
        "brandID": "1",
        "providerID": 1,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 7,
        "name": "Natural Pellets Bird Food",
        "price": 10,
        "quantity": 40,
        "discount": 0,
        "animalCategory": "bird",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701441116/Pet/semillas.jpg",
        "description": "Healty and delicious fresh wholesome natural bird food made with vegetables precisely formulated with the essential vitamins minerals and amino acids your bird needs every day for a balanced diet",
        "productType": "food",
        "brandID": "3",
        "providerID": 5,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 8,
        "name": "Iron Bird Cage",
        "price": 100,
        "quantity": 140,
        "discount": 6,
        "animalCategory": "bird",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701441065/Pet/jaulaAve.jpg",
        "description": "Made of solid steel powder coated with oxidant resistant paint this metal bird cage boasts high strength improved safety and ensured durability",
        "productType": "house",
        "brandID": "3",
        "providerID": 6,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 9,
        "name": "Fish Tank with LED Lights",
        "price": 25,
        "quantity": 110,
        "discount": 0,
        "animalCategory": "fish",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701440872/Pet/pescera.jpg",
        "description": "The fish tank is equipped with led lights and two decorative plastic aquatic plants and you can also buy other decorations by yourself Whats more the small fish tank would be make you more happy and relaxed even in day or at night",
        "productType": "house",
        "brandID": "4",
        "providerID": 1,
        "isAvailable": "true",
        "hasTax": "true"
      },
      {
        "productID": 11,
        "name": "Professional Glass Terrarium",
        "price": 299,
        "quantity": 110,
        "discount": 15,
        "animalCategory": "other",
        "image": "https://res.cloudinary.com/dkappxhfr/image/upload/v1701440843/Pet/terrario.jpg",
        "description": "The compact design mini terrarium is made with high quality thick and extremely high hardness tempered PC glass materials for more safety An ideal habitat for desert animals The touch screen top opening provides ventilation and allows UVB and infrared penetration",
        "productType": "house",
        "brandID": "6",
        "providerID": 3,
        "isAvailable": "true",
        "hasTax": "true"
      }];
    component.showLess();
    expect(component.productsToShow.length).toBeGreaterThan(1);
  });

  it('should reset show data', () => {
    spyOn(component, 'resetShowData').and.callThrough();
    component.resetShowData();
    expect(component.productsToShow.length).toBeGreaterThan(0);
  });
});
