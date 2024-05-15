import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Renderer2 } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit, AfterViewInit, OnDestroy {
  
  products: Product[] = [];
  isDarkTheme: boolean = false;
  langChangeSubscription: Subscription;

  constructor(private productService: ProductService, public translate: TranslateService, private renderer: Renderer2, private cartService: CartService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      // Update fruits after language change
      this.updateFruits();
      // Check theme after language change
      this.checkDarkTheme();
      this.isDarkTheme = localStorage.getItem('theme') === "Dark";
    });
  }

  ngAfterViewInit(): void {
    // Check theme after view initialization
    this.checkDarkTheme();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  ngOnInit(): void {
    // Check theme on component initialization
    this.checkDarkTheme();
    // Update products on component initialization
    this.updateFruits();
    this.cardTitle();
  }

  ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  ChangeLang(event: any) {
    const lang = event.target.value;
    this.switchLanguage(lang);
  }

  private updateFruits() {
    this.products = this.productService.getProducts();
  }

  private checkDarkTheme() {
    // Check if dark theme is enabled in localStorage
    this.isDarkTheme = localStorage.getItem('theme') === 'Dark';
    // Apply appropriate theme-based styles
    this.applyThemeStyles();
  }

  // Method to toggle dark mode
  toggleDarkMode() {
    this.isDarkTheme = !this.isDarkTheme;
    // Update localStorage with the new theme preference
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    // Apply appropriate theme-based styles
    this.applyThemeStyles();
    this.buyButtonBackground();
    this.cardTitle();
  }

  private applyThemeStyles() {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    document.documentElement.style.setProperty('--background-color', backgroundColor);
  }

  private buyButtonBackground() {
    this.isDarkTheme = !this.isDarkTheme;
    // Update localStorage with the new theme preference
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    // Apply appropriate theme-based styles
    this.applyThemeStyles();
    this.buyButtonBackground();
    this.buttonText();
  }
  
  private cardTitle() {
  const color = this.isDarkTheme ? '#000000' : '#ffffff';
  const fruitTitles = document.querySelectorAll('.fruit-title');
  fruitTitles.forEach((title) => {
    this.renderer.setStyle(title, 'color', color);
  });
  const fruitDescriptions = document.querySelectorAll('.fruit-description');
  fruitDescriptions.forEach((description) => {
    this.renderer.setStyle(description, 'color', color);
  });
  const fruitPrices = document.querySelectorAll('.fruit-price');
  fruitPrices.forEach((price) => {
    this.renderer.setStyle(price, 'color', color);
  });
  }

  private buttonText() {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    const buyButtonText = document.querySelectorAll('.buy-now');
    buyButtonText.forEach((price) => {
    this.renderer.setStyle(price, 'color', color);
  });
  }
}
