import { Component , OnInit  , HostListener ,ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ProductService } from '../products/services/product.service';
import { CategoryService } from '../../Dashboard/catrgory/category.service';

import { Product } from '../../Dashboard/products/product.model';
import { trigger, transition, style, animate, query, stagger, keyframes } from "@angular/animations"
import { Category } from '../../Dashboard/catrgory/category.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger("fadeIn", [transition(":enter", [style({ opacity: 0 }), animate("600ms ease-in", style({ opacity: 1 }))])]),
    trigger("slideUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate("600ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
    ]),
    trigger("staggerIn", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(20px)" }),
            stagger("100ms", [animate("500ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    trigger("pulse", [
      transition("* => *", [
        animate(
          "1s",
          keyframes([
            style({ transform: "scale(1)", offset: 0 }),
            style({ transform: "scale(1.05)", offset: 0.5 }),
            style({ transform: "scale(1)", offset: 1 }),
          ]),
        ),
      ]),
    ]),
    trigger("rotate", [
      transition("* => *", [
        animate(
          "0.5s",
          keyframes([
            style({ transform: "rotate(0deg)", offset: 0 }),
            style({ transform: "rotate(360deg)", offset: 1 }),
          ]),
        ),
      ]),
    ]),
    trigger("flipCard", [
      transition("* => *", [
        animate(
          "0.6s",
          keyframes([
            style({ transform: "rotateY(0deg)", offset: 0 }),
            style({ transform: "rotateY(180deg)", offset: 0.5 }),
            style({ transform: "rotateY(0deg)", offset: 1 }),
          ]),
        ),
      ]),
    ]),
    trigger("wobble", [
      transition("* => *", [
        animate(
          "1s",
          keyframes([
            style({ transform: "translateX(0%)", offset: 0 }),
            style({ transform: "translateX(-10px) rotate(-5deg)", offset: 0.15 }),
            style({ transform: "translateX(8px) rotate(3deg)", offset: 0.3 }),
            style({ transform: "translateX(-6px) rotate(-3deg)", offset: 0.45 }),
            style({ transform: "translateX(4px) rotate(2deg)", offset: 0.6 }),
            style({ transform: "translateX(-2px) rotate(-1deg)", offset: 0.75 }),
            style({ transform: "translateX(0%)", offset: 1 }),
          ]),
        ),
      ]),
    ]),
  ],
 

})
export class HomeComponent implements OnInit { 

  categories: Category[] = [];
  featuredCategories: Category[] = [];
  loading = false;
  error: string | null = null;
  
  // For carousel/pagination
  currentPage = 1;
  itemsPerPage = 12;
  totalCategories = 0;
  
  animationStates: { [key: string]: boolean } = {}
  hoverStates: { [key: string]: boolean } = {}


  bestSellers = [
    {
      id: 1,
      name: "Radiance Serum",
      brand: "Glow Essentials",
      image: "assets/images/products/serum.jpg",
      images: [
        "assets/images/products/serum.jpg",
        "assets/images/products/serum-2.jpg",
        "assets/images/products/serum-3.jpg",
      ],
      price: 49.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviewCount: 124,
      shortDescription: "Vitamin C enriched serum for brighter, more even skin tone.",
      description:
        "Our bestselling Radiance Serum is formulated with 15% Vitamin C, Hyaluronic Acid, and Niacinamide to brighten skin, reduce dark spots, and improve overall skin texture.",
      benefits: [
        "Brightens skin tone",
        "Reduces hyperpigmentation",
        "Boosts collagen production",
        "Hydrates and plumps",
      ],
      isBestSeller: true,
      isNew: false,
      inStock: true,
    },
    {
      id: 2,
      name: "Hydra Boost Moisturizer",
      brand: "Aqua Beauty",
      image: "assets/images/products/moisturizer.jpg",
      images: [
        "assets/images/products/moisturizer.jpg",
        "assets/images/products/moisturizer-2.jpg",
        "assets/images/products/moisturizer-3.jpg",
      ],
      price: 38.5,
      originalPrice: null,
      rating: 4.7,
      reviewCount: 98,
      shortDescription: "Lightweight gel-cream that provides 72-hour hydration.",
      description:
        "This oil-free moisturizer delivers intense hydration with a lightweight feel. Formulated with Hyaluronic Acid and Glycerin to lock in moisture for up to 72 hours.",
      benefits: ["Long-lasting hydration", "Oil-free formula", "Suitable for all skin types", "Non-comedogenic"],
      isBestSeller: true,
      isNew: false,
      inStock: true,
    },
    {
      id: 3,
      name: "Velvet Matte Lipstick",
      brand: "Color Couture",
      image: "assets/images/products/lipstick.jpg",
      images: [
        "assets/images/products/lipstick.jpg",
        "assets/images/products/lipstick-2.jpg",
        "assets/images/products/lipstick-3.jpg",
      ],
      price: 24.99,
      originalPrice: 29.99,
      rating: 4.5,
      reviewCount: 76,
      shortDescription: "Long-wearing matte lipstick with a comfortable feel.",
      description:
        "Our Velvet Matte Lipstick delivers intense color payoff with a comfortable, non-drying formula. Stays put for up to 8 hours without feathering or bleeding.",
      benefits: ["Long-wearing formula", "Comfortable matte finish", "Highly pigmented", "Cruelty-free"],
      isBestSeller: true,
      isNew: false,
      inStock: true,
    },
    {
      id: 4,
      name: "Silk Foundation",
      brand: "Flawless Face",
      image: "assets/images/products/foundation.jpg",
      images: [
        "assets/images/products/foundation.jpg",
        "assets/images/products/foundation-2.jpg",
        "assets/images/products/foundation-3.jpg",
      ],
      price: 42.0,
      originalPrice: null,
      rating: 4.6,
      reviewCount: 112,
      shortDescription: "Medium to full coverage foundation with a natural finish.",
      description:
        "This buildable foundation blends seamlessly for a flawless, natural-looking finish. Available in 40 shades to match every skin tone perfectly.",
      benefits: ["Buildable coverage", "Natural finish", "24-hour wear", "Transfer-resistant"],
      isBestSeller: true,
      isNew: false,
      inStock: true,
    },
    {
      id: 5,
      name: "Overnight Repair Mask",
      brand: "Glow Essentials",
      image: "assets/images/products/mask.jpg",
      images: [
        "assets/images/products/mask.jpg",
        "assets/images/products/mask-2.jpg",
        "assets/images/products/mask-3.jpg",
      ],
      price: 45.0,
      originalPrice: 55.0,
      rating: 4.9,
      reviewCount: 87,
      shortDescription: "Intensive overnight treatment for renewed skin by morning.",
      description:
        "Wake up to renewed skin with our Overnight Repair Mask. Formulated with Retinol, Peptides, and Niacinamide to repair and rejuvenate while you sleep.",
      benefits: ["Reduces fine lines", "Improves skin texture", "Enhances radiance", "Strengthens skin barrier"],
      isBestSeller: true,
      isNew: false,
      inStock: true,
    },
  ]

  newArrivals = [
    {
      id: 6,
      name: "Rose Quartz Facial Roller",
      brand: "Crystal Beauty",
      image: "assets/images/products/facial-roller.jpg",
      images: ["assets/images/products/facial-roller.jpg", "assets/images/products/facial-roller-2.jpg"],
      price: 28.0,
      originalPrice: null,
      rating: 4.3,
      reviewCount: 42,
      description: "Handcrafted rose quartz facial roller that helps reduce puffiness and improve product absorption.",
      benefits: ["Reduces puffiness", "Improves circulation", "Enhances product absorption"],
      isNew: true,
      inStock: true,
    },
    {
      id: 7,
      name: "Botanical Cleansing Oil",
      brand: "Pure Botanics",
      image: "assets/images/products/cleansing-oil.jpg",
      images: ["assets/images/products/cleansing-oil.jpg", "assets/images/products/cleansing-oil-2.jpg"],
      price: 34.99,
      originalPrice: null,
      rating: 4.7,
      reviewCount: 28,
      description: "Gentle cleansing oil that dissolves makeup and impurities without stripping the skin.",
      benefits: ["Removes makeup effortlessly", "Doesn't clog pores", "Suitable for sensitive skin"],
      isNew: true,
      inStock: true,
    },
    {
      id: 8,
      name: "Volumizing Mascara",
      brand: "Lash Luxe",
      image: "assets/images/products/mascara.jpg",
      images: ["assets/images/products/mascara.jpg", "assets/images/products/mascara-2.jpg"],
      price: 22.5,
      originalPrice: null,
      rating: 4.5,
      reviewCount: 36,
      description: "Buildable mascara that adds volume and length without clumping or flaking.",
      benefits: ["Volumizing formula", "Smudge-proof", "Easy to remove"],
      isNew: true,
      inStock: true,
    },
    {
      id: 9,
      name: "Exfoliating Toner",
      brand: "Glow Essentials",
      image: "assets/images/products/toner.jpg",
      images: ["assets/images/products/toner.jpg", "assets/images/products/toner-2.jpg"],
      price: 32.0,
      originalPrice: null,
      rating: 4.6,
      reviewCount: 19,
      description: "Gentle exfoliating toner with AHAs and BHAs to refine skin texture and minimize pores.",
      benefits: ["Exfoliates dead skin cells", "Unclogs pores", "Improves skin texture"],
      isNew: true,
      inStock: true,
    },
  ]

  testimonials = [
    {
      id: 1,
      name: "Sophia Martinez",
      role: "Skincare Enthusiast",
      image: "assets/images/testimonials/testimonial-1.jpg",
      rating: 5,
      comment:
        "The Radiance Serum completely transformed my skin! I've been using it for 3 months and my hyperpigmentation has significantly faded. Worth every penny!",
      tags: ["Skincare", "Serum", "Hyperpigmentation"],
    },
    {
      id: 2,
      name: "Emma Johnson",
      role: "Makeup Artist",
      image: "assets/images/testimonials/testimonial-2.jpg",
      rating: 5,
      comment:
        "As a professional makeup artist, I'm very particular about the products I use. The Silk Foundation is now a staple in my kit - it works beautifully on all skin types and photographs flawlessly.",
      tags: ["Makeup", "Foundation", "Professional"],
    },
    {
      id: 3,
      name: "Olivia Chen",
      role: "Beauty Blogger",
      image: "assets/images/testimonials/testimonial-3.jpg",
      rating: 4,
      comment:
        "I've tried countless cleansing oils, and the Botanical Cleansing Oil is by far the best. It removes even waterproof makeup effortlessly and leaves my skin feeling nourished.",
      tags: ["Skincare", "Cleansing", "Sensitive Skin"],
    },
  ]

  instagramPosts = [
    {
      id: 1,
      image: "assets/images/instagram/insta-1.jpg",
      caption: "Morning skincare routine with our bestselling products! #MorningGlow",
      likes: 1243,
    },
    {
      id: 2,
      image: "assets/images/instagram/insta-2.jpg",
      caption: "Our new summer collection has arrived! #SummerGlow",
      likes: 982,
    },
    {
      id: 3,
      image: "assets/images/instagram/insta-3.jpg",
      caption: "Behind the scenes at our latest photoshoot #BTS",
      likes: 1567,
    },
    {
      id: 4,
      image: "assets/images/instagram/insta-4.jpg",
      caption: "Self-care Sunday essentials #SelfCareSunday",
      likes: 2103,
    },
    {
      id: 5,
      image: "assets/images/instagram/insta-5.jpg",
      caption: "Perfect makeup look for summer nights #SummerNights",
      likes: 1876,
    },
    {
      id: 6,
      image: "assets/images/instagram/insta-6.jpg",
      caption: "Our founder sharing her skincare secrets #FounderFavorites",
      likes: 2341,
    },
  ]

  // Quick view
  quickViewVisible = false
  selectedProduct: any = null
  quantity = 1

  // Element references for animations
  @ViewChild("heroSection") heroSection!: ElementRef

  // Responsive options for carousels
  responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ]

  // Email for newsletter
  email = ""

  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService,
    private router: Router,
  ) {}
  

  ngOnInit() {
    this.loadCategories();
    this.loadAllCategories();
    //this.loadFeaturedCategories();


    // Initialize animation states
    this.categories.forEach((category) => {
      this.animationStates[`category_${category.id}`] = false
      this.hoverStates[`category_${category.id}`] = false
    })

    this.bestSellers.forEach((product) => {
      this.animationStates[`product_${product.id}`] = false
      this.hoverStates[`product_${product.id}`] = false
    })

    this.newArrivals.forEach((product) => {
      this.animationStates[`newArrival_${product.id}`] = false
      this.hoverStates[`newArrival_${product.id}`] = false
    })
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    // Parallax effect for hero section
    if (this.heroSection) {
      const scrollPosition = window.scrollY
      if (scrollPosition < 600) {
        const element = this.heroSection.nativeElement
        element.style.backgroundPositionY = `${scrollPosition * 0.5}px`
      }
    }
  }

  // Animation triggers
  triggerAnimation(key: string) {
    this.animationStates[key] = true
    setTimeout(() => {
      this.animationStates[key] = false
    }, 1000)
  }

  setHoverState(key: string, state: boolean) {
    this.hoverStates[key] = state
  }

  showQuickView(product: any, event?: MouseEvent) {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    this.selectedProduct = product
    this.quantity = 1
    this.quickViewVisible = true
  }

  // loadCategories
  // Load all categories without pagination
  loadCategories(): void {
    this.loading = true;
    this.error = null;

    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories.map(category => ({
          ...category,
          createdAt: new Date(category.createdAt),
          updatedAt: category.updatedAt ? new Date(category.updatedAt) : new Date(),
          // Initialize productResponse if it might be undefined
          productResponse: category.productResponse || []
        }));
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.handleError('Failed to load categories', error);
        this.loading = false;
      }
    });
  }

  navigateToCategory(categoryId: number): void {
    this.router.navigate(['/category', categoryId]);
  }
  // loadCategories End


   // Load all categories with pagination
 
  loadAllCategories(): void {
    this.loading = true;
    this.error = null;

    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        this.totalCategories = response.length;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.handleError('Failed to load categories', error);
        this.loading = false;
      }
    });
  }
// Load all categories with pagination END------- 
  
  // loadFeaturedCategories(): void {
  //   this.categoryService.getFeaturedCategories().subscribe({
  //     next: (categories) => {
  //       this.featuredCategories = categories.slice(0, 6); // Show top 6 featured
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.error('Error loading featured categories:', error);
  //       // Don't show error to user for featured categories
  //     }
  //   });
  // }

  /**
   * Handle pagination changes
   */
  onPageChange(event: any): void {
    this.currentPage = event.page + 1; // PrimeNG pagination starts from 0
    this.itemsPerPage = event.rows;
    this.loadAllCategories();
  }

  /**
   * Error handling helper
   */
  private handleError(defaultMessage: string, error: HttpErrorResponse): void {
    this.loading = false;
    console.error(defaultMessage, error);
    
    let userMessage = defaultMessage;
    
    if (error.status === 0) {
      userMessage = 'Network error - please check your connection';
    } else if (error.status >= 500) {
      userMessage = 'Server error - please try again later';
    }

    this.error = userMessage;
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: userMessage,
      life: 5000
    });
  }
// end of  Error handling helper


 
  // trackByProductId
  trackByCategoryId(index: number, category: Category): number {
    return category.id;
  }
  //------------


// addToCart
  addToCart(product: any, quantity = 1) {
    // In a real app, you would call a cart service
    this.messageService.add({
      severity: "success",
      summary: "Added to Cart",
      detail: `${product.name} (${quantity}) added to your cart`,
      life: 3000,
    })

    this.quickViewVisible = false
  }

// addToCart End --



  // subscribeNewsletter
  subscribeNewsletter() {
    if (this.email && this.validateEmail(this.email)) {
      // In a real app, you would call a service to subscribe the email
      this.messageService.add({
        severity: "success",
        summary: "Subscribed!",
        detail: "Thank you for subscribing to our newsletter.",
        life: 3000,
      })
      this.email = ""
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Invalid Email",
        detail: "Please enter a valid email address.",
        life: 3000,
      })
    }
  }
// subscribeNewsletter End --


  // validateEmail
  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
  }
  // validateEmail End --
}
