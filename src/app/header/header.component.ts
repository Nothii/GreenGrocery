import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isDarkTheme: boolean = false;

  // Initialize dark_mode and light_mode with translation keys
  dark_mode: string = 'assets/img/crescent-moon.png';
  light_mode: string = 'assets/img/sunny.png';

  constructor(public translate: TranslateService, private renderer: Renderer2) {
    // Set default language
    this.translate.setDefaultLang('en');
    // Set initial language if needed
    this.translate.use('en');
    translate.addLangs(['en', 'tr']);
  }

  ngOnInit(): void {
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;
    this.translate.get('assets/img/crescent-moon.png').subscribe((res: string) => {
      this.dark_mode = res;
    });
    this.translate.get('assets/img/sunny.png').subscribe((res: string) => {
      this.light_mode = res;
    });
    this.setBodyBackground();
    this.productText();
    this.cardTitle();
    this.testimonialBackground();
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  ChangeLang(event: any) {
    const lang = event.target.value;
    this.switchLanguage(lang);
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    this.languageBackground();
    this.testimonialBackground();
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
    this.setBodyBackground();
    this.testimonialBackground();
    this.productText();
    this.footerBackground();
    this.cardBackground();
    this.buyButtonBackground();
    this.cardTitle();
    this.buttonText();
  }

  private setBodyBackground() {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    this.renderer.setStyle(document.body, 'background-color', backgroundColor);
  }

  private productText() {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    this.renderer.setStyle(document.body, 'color', color);
  }

  private footerBackground() {
    const footerBackgroundColor = this.isDarkTheme ? '#4d4d4d' : '#ffffff';
    this.renderer.setStyle(document.querySelector('.footer'), 'background-color', footerBackgroundColor);
  }
 
  private languageBackground() {
    const color = this.isDarkTheme ? '#ffffff' : '#000000';
    this.renderer.setStyle(document.body, 'color', color);
  }
  
  private cardBackground() {
    const backgroundColor = this.isDarkTheme ? '#5eda5e' : '#3b5b2d';
    const cardContents = document.querySelectorAll('.card-content');
    const cardContents2 = document.querySelectorAll('.fruit-card');
    cardContents.forEach(cardContent => {
      this.renderer.setStyle(cardContent, 'background-color', backgroundColor);
    });
    cardContents2.forEach(cardContent2 => {
      this.renderer.setStyle(cardContent2, 'background-color', backgroundColor);
    });
  }

  private buyButtonBackground() {
    const backgroundColor = this.isDarkTheme ? '#3b5b2d' : '#5eda5e';
    const cardContents = document.querySelectorAll('.buy-now');
    cardContents.forEach((cardContent) => {
      this.renderer.setStyle(cardContent, 'background-color', backgroundColor);
    });
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

  private testimonialBackground() {
    const backgroundColor = this.isDarkTheme ? '#5eda5e' : '#3b5b2d';
    const testimonialContents = document.querySelectorAll('.testimonial-content');
    const textColor = this.isDarkTheme ? '#000000' : '#ffffff';
    testimonialContents.forEach(content => {
      this.renderer.setStyle(content, 'background-color', backgroundColor);
    });
    const usernames = document.querySelectorAll('.username');
    const descriptions = document.querySelectorAll('.description');

    // Apply text color to usernames
    usernames.forEach((elem) => {
      this.renderer.setStyle(elem, 'color', textColor);
    });

    // Apply text color to descriptions
    descriptions.forEach((elem) => {
      this.renderer.setStyle(elem, 'color', textColor);
    });
  }
}
