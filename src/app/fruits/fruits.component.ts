import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FruitService } from '../frutis.service';
import { Fruit } from '../fruits.model';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Renderer2 } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent implements OnInit, AfterViewInit, OnDestroy {
  
  fruit: Fruit[] = [];
  isDarkTheme: boolean = false;
  langChangeSubscription: Subscription;

  constructor(private fruitService: FruitService, public translate: TranslateService, private renderer: Renderer2, private cartService: CartService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);

    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      // Update products after language change
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
    this.testimonialBackground();
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
    this.fruit = this.fruitService.getFruits();
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
    this.testimonialBackground();
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
  const productTitles = document.querySelectorAll('.product-title');
  productTitles.forEach((title) => {
    this.renderer.setStyle(title, 'color', color);
  });
  const productDescriptions = document.querySelectorAll('.product-description');
  productDescriptions.forEach((description) => {
    this.renderer.setStyle(description, 'color', color);
  });
  const productPrices = document.querySelectorAll('.product-price');
  productPrices.forEach((price) => {
    this.renderer.setStyle(price, 'color', color);
  });
  }

  private testimonialBackground() {
    const backgroundColor = this.isDarkTheme ? '#5eda5e' : '#3b5b2d';
    const testimonialContents = document.querySelectorAll('.testimonial-content');
    testimonialContents.forEach(content => {
      this.renderer.setStyle(content, 'background-color', backgroundColor);
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
