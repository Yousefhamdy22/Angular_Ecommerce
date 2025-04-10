import { Component  , OnInit , HostListener }  from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: false,
  animations: [
    trigger('fadeInDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  isHeaderFixed = false;
  isMenuOpen = false;
  isSearchOpen = false;
  searchQuery = '';
  cartCount = 3;
  wishlistCount = 5;
  isUserLoggedIn = false;
  
  // Mega menu categories
  categories = [
    {
      name: 'Skincare',
      icon: 'pi pi-heart',
      subcategories: [
        { name: 'Cleansers', link: '/products/skincare/cleansers' },
        { name: 'Moisturizers', link: '/products/skincare/moisturizers' },
        { name: 'Serums', link: '/products/skincare/serums' },
        { name: 'Face Masks', link: '/products/skincare/masks' },
        { name: 'Eye Care', link: '/products/skincare/eye-care' },
        { name: 'Sun Protection', link: '/products/skincare/sun-protection' }
      ]
    },
    {
      name: 'Makeup',
      icon: 'pi pi-palette',
      subcategories: [
        { name: 'Face', link: '/products/makeup/face' },
        { name: 'Eyes', link: '/products/makeup/eyes' },
        { name: 'Lips', link: '/products/makeup/lips' },
        { name: 'Cheeks', link: '/products/makeup/cheeks' },
        { name: 'Brushes & Tools', link: '/products/makeup/tools' }
      ]
    },
    {
      name: 'Haircare',
      icon: 'pi pi-star',
      subcategories: [
        { name: 'Shampoo & Conditioner', link: '/products/haircare/shampoo-conditioner' },
        { name: 'Hair Treatments', link: '/products/haircare/treatments' },
        { name: 'Styling Products', link: '/products/haircare/styling' },
        { name: 'Hair Tools', link: '/products/haircare/tools' }
      ]
    },
    {
      name: 'Fragrance',
      icon: 'pi pi-gift',
      subcategories: [
        { name: 'Women\'s Perfume', link: '/products/fragrance/womens' },
        { name: 'Men\'s Cologne', link: '/products/fragrance/mens' },
        { name: 'Gift Sets', link: '/products/fragrance/gift-sets' }
      ]
    },
    {
      name: 'Bath & Body',
      icon: 'pi pi-heart-fill',
      subcategories: [
        { name: 'Body Wash', link: '/products/bath-body/wash' },
        { name: 'Body Lotion', link: '/products/bath-body/lotion' },
        { name: 'Hand Care', link: '/products/bath-body/hand-care' },
        { name: 'Bath Accessories', link: '/products/bath-body/accessories' }
      ]
    }
  ];
  
  // Recent searches
  recentSearches = [
    'Vitamin C Serum',
    'Matte Lipstick',
    'Moisturizer for dry skin',
    'Hair mask'
  ];
  
  // Popular searches
  popularSearches = [
    'Foundation',
    'Mascara',
    'Sunscreen',
    'Face wash',
    'Perfume',
    'Eyeshadow palette'
  ];
  
  // Cart items
  cartItems = [
    {
      id: 1,
      name: 'Radiance Serum',
      price: 49.99,
      quantity: 1,
      image: 'assets/images/products/serum.jpg'
    },
    {
      id: 2,
      name: 'Hydra Boost Moisturizer',
      price: 38.50,
      quantity: 1,
      image: 'assets/images/products/moisturizer.jpg'
    },
    {
      id: 3,
      name: 'Velvet Matte Lipstick',
      price: 24.99,
      quantity: 1,
      image: 'assets/images/products/lipstick.jpg'
    }
  ];
  
  // User menu items
  userMenuItems: MenuItem[] = [];
  
  // Currency options
  currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' }
  ];
  selectedCurrency = this.currencies[0];
  
  // Language options
  languages = [
    { code: 'en', name: 'English', flag: 'assets/images/flags/us.svg' },
    { code: 'fr', name: 'Français', flag: 'assets/images/flags/fr.svg' },
    { code: 'es', name: 'Español', flag: 'assets/images/flags/es.svg' }
  ];
  selectedLanguage = this.languages[0];

  constructor() { }

  ngOnInit() {
    this.initUserMenu();
  }

  initUserMenu() {
    if (this.isUserLoggedIn) {
      this.userMenuItems = [
        {
          label: 'My Account',
          icon: 'pi pi-user',
          routerLink: '/account'
        },
        {
          label: 'My Orders',
          icon: 'pi pi-shopping-bag',
          routerLink: '/account/orders'
        },
        {
          label: 'Wishlist',
          icon: 'pi pi-heart',
          routerLink: '/wishlist'
        },
        {
          separator: true
        },
        {
          label: 'Sign Out',
          icon: 'pi pi-sign-out',
          command: () => this.signOut()
        }
      ];
    } else {
      this.userMenuItems = [
        {
          label: 'Sign In',
          icon: 'pi pi-sign-in',
          routerLink: '/auth/login'
        },
        {
          label: 'Register',
          icon: 'pi pi-user-plus',
          routerLink: '/auth/register'
        }
      ];
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check if we should fix the header
    this.isHeaderFixed = window.scrollY > 100;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.isSearchOpen = false;
    }
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      this.isMenuOpen = false;
      setTimeout(() => {
        document.getElementById('searchInput')?.focus();
      }, 100);
    }
  }

  submitSearch() {
    if (this.searchQuery.trim()) {
      // In a real app, you would navigate to search results
      console.log(`Searching for "${this.searchQuery}"`);
      
      // Add to recent searches if not already there
      if (!this.recentSearches.includes(this.searchQuery)) {
        this.recentSearches.unshift(this.searchQuery);
        this.recentSearches = this.recentSearches.slice(0, 4); // Keep only 4 recent searches
      }
      
      this.searchQuery = '';
      this.isSearchOpen = false;
    }
  }

  useSearchSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.submitSearch();
  }

  clearRecentSearches() {
    this.recentSearches = [];
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.cartCount = this.cartItems.length;
  }

  updateCartItemQuantity(item: any, newQuantity: number) {
    if (newQuantity > 0) {
      item.quantity = newQuantity;
    }
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  changeCurrency(currency: any) {
    this.selectedCurrency = currency;
  }

  changeLanguage(language: any) {
    this.selectedLanguage = language;
  }

  signOut() {
    this.isUserLoggedIn = false;
    this.initUserMenu();
    // In a real app, you would call an auth service to sign out
  }
}

