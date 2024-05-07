export interface Variant {
  id: number;
  name: string;
  images: string;
}

export interface Fruit {
  id: number;
  name: string;
  description: string;
  price: number;
  imgSrc: string;
  variants: Variant[];
}