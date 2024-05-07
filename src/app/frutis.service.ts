import { Injectable } from '@angular/core';
import { Fruit } from './fruits.model';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FruitService {
  private fruitsSubject: BehaviorSubject<Fruit[]> = new BehaviorSubject<Fruit[]>([]);

  constructor(private translate: TranslateService) {
    // Subscribe to language change events
    this.translate.onLangChange.subscribe(() => {
      this.updatefruits();
    });

    // Initial data load
    this.updatefruits();
  }

  getFruits(): Fruit[] {
    return this.fruitsSubject.value;
  }

  private updatefruits() {
    const fruitKeys = [
      'fruits.fruit1.name',
      'fruits.fruit1.description',
      'fruits.fruit2.name',
      'fruits.fruit2.description',
      'fruits.fruit3.name',
      'fruits.fruit3.description',
      'fruits.fruit4.name',
      'fruits.fruit4.description',
    ];
    // Logic to fetch fruits from an API or other data source
    this.translate.get(fruitKeys).subscribe(translations => {
      const fruits: Fruit[] = [
        {
          id: 1, name: translations['fruits.fruit1.name'], description: translations['fruits.fruit1.description'], price: 10, imgSrc: 'assets/img/fruits/apple/starking-apple.png',
          variants: [
            { id: 1, name: 'Variant 1', images: "assets/img/fruits/apple/starking-apple.png" },
            { id: 2, name: 'Variant 2', images: "assets/img/fruits/apple/golden-apple.png" },
            { id: 3, name: 'Variant 3', images: "assets/img/fruits/apple/granny-smith-apple.png" }
          ]
        },
        {
          id: 2, name: translations['fruits.fruit2.name'], description: translations['fruits.fruit2.description'], price: 20, imgSrc: 'https://example.com/fruit2.jpg',
          variants: []
        },
        {
          id: 3, name: translations['fruits.fruit3.name'], description: translations['fruits.fruit3.description'], price: 15, imgSrc: 'https://example.com/fruit3.jpg',
          variants: []
        },
        {
          id: 4, name: translations['fruits.fruit4.name'], description: translations['fruits.fruit4.description'], price: 12.5, imgSrc: 'https://example.com/fruit4.jpg',
          variants: []
        },
      ];
      this.fruitsSubject.next(fruits);
    });
  }
}
