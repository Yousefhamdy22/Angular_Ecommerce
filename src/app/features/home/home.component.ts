import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
  banners = [
    { image: 'https://images.pexels.com/photos/3373727/pexels-photo-3373727.jpeg', title: 'Exclusive Offers!', description: 'Up to 50% off on all beauty products' },
    { image: 'https://images.pexels.com/photos/210469/pexels-photo-210469.jpeg', title: 'Luxury Beauty', description: 'Premium brands at unbeatable prices' },
    { image: 'https://images.pexels.com/photos/6621245/pexels-photo-6621245.jpeg', title: 'Skincare Sale', description: 'Get glowing with top-rated skincare' },
];


  categories = [
    { name: 'Makeup', image: 'https://images.pexels.com/photos/3052392/pexels-photo-3052392.jpeg' },
    { name: 'Skincare', image: 'https://images.pexels.com/photos/3735648/pexels-photo-3735648.jpeg' },
    { name: 'Perfumes', image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg' },
    { name: 'Haircare', image: 'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg' },
    { name: 'Nail Care', image: 'https://images.pexels.com/photos/3997380/pexels-photo-3997380.jpeg' },
    { name: 'Men’s Grooming', image: 'https://images.pexels.com/photos/1876284/pexels-photo-1876284.jpeg' },
  ];

  deals = [
    { name: 'Matte Lipstick Set', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg', description: 'Long-lasting vibrant shades', price: 29 },
    { name: 'Hydrating Face Serum', image: 'https://images.pexels.com/photos/3735639/pexels-photo-3735639.jpeg', description: 'For a youthful glow', price: 49 },
  ];

  topSellers = [
    { name: 'Luxury Perfume', image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg', description: 'Timeless & elegant fragrance', price: 99 },
    { name: 'Anti-Aging Moisturizer', image: 'https://images.pexels.com/photos/3735628/pexels-photo-3735628.jpeg', description: 'Reduce wrinkles & hydrate skin', price: 59 },
  ];

 
}
