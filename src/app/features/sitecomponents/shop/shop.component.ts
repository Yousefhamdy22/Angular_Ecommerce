import { Component , HostListener , OnInit ,ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from "@angular/animations"
import { MessageService } from "primeng/api"
import { ProductService } from '../../../Dashboard/products/product.service'; 
import { Product, PaginatedProductResponse ,  } from '../../../Dashboard/products/product.model';
import { Category } from '../../../Dashboard/catrgory/category.model';
// interface Product {
//   id: number
//   name: string
//   brand: string
//   image: string
//   images: string[]
//   price: number
//   originalPrice: number | null
//   rating: number
//   reviewCount: number
//   description: string
//   shortDescription?: string
//   benefits: string[]
//   isBestSeller?: boolean
//   isNew?: boolean
//   inStock: boolean
//   category: string
//   tags: string[]
//   colors?: ProductColor[]
//   sizes?: string[]
//   freeShipping?: boolean
// }

interface ProductColor {
  name: string
  code: string
}

// interface Category {
//   id: number
//   name: string
//   count: number
// }

interface Brand {
  id: number
  name: string
  count: number
}

interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: number[]
  rating: number | null
  inStock: boolean
  onSale: boolean
  freeShipping: boolean
  tags: string[]
}

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  animations: [
    trigger("fadeIn", [transition(":enter", [style({ opacity: 0 }), animate("400ms ease-in", style({ opacity: 1 }))])]),
    trigger("slideIn", [
      transition(":enter", [
        style({ transform: "translateY(20px)", opacity: 0 }),
        animate("400ms ease-out", style({ transform: "translateY(0)", opacity: 1 })),
      ]),
    ]),
    trigger("staggerIn", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(20px)" }),
            stagger("100ms", [animate("400ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})


export class ShopComponent  implements OnInit {
  // UI States
  isLoading = true
  isMobileFilterVisible = false
  viewMode: "grid" | "list" = "grid"
  gridColumns: 2 | 3 | 4 = 3

  sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Price: Low to High", value: "priceAsc" },
    { label: "Price: High to Low", value: "priceDesc" },
    { label: "Best Rated", value: "rating" },
    { label: "Most Popular", value: "popularity" },
  ]
  selectedSortOption = this.sortOptions[0]
  searchQuery = ""
  loading = false
  error: string | null = null
  searchSuggestions: string[] = []
  showSearchSuggestions = false
  recentSearches = ["Moisturizer", "Organic", "Anti-aging", "Vitamin C"]
  popularSearches = ["Serum", "Face Mask", "Lipstick", "Sunscreen"]

  // Pagination
  first = 0
  rows = 12
  totalRecords = 0

  // Quick view
  quickViewVisible = false
  selectedProduct: Product | null = null
  quantity = 1
  selectedColor: ProductColor | null = null
  selectedSize: string | null = null

  // Error message
  errorMessage: string = '';

  // Filters
  filters: FilterState = {
    categories: [],
    brands: [],
    priceRange: [0, 200],
    rating: null,
    inStock: false,
    onSale: false,
    freeShipping: false,
    tags: [],
  }

  // Active filter count for mobile
  activeFilterCount = 0

  // Responsive options for product gallery
  responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 4,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 2,
    },
  ]

  // Categories
  categories: Category[] = [
  
  ]

  // Brands
  brands: Brand[] = [
    { id: 1, name: "Glow Essentials", count: 15 },
    { id: 2, name: "Aqua Beauty", count: 12 },
    { id: 3, name: "Color Couture", count: 18 },
    { id: 4, name: "Flawless Face", count: 9 },
    { id: 5, name: "Crystal Beauty", count: 7 },
    { id: 6, name: "Pure Botanics", count: 11 },
    { id: 7, name: "Lash Luxe", count: 5 },
  ]

  // Popular tags
  popularTags = [
    "Vegan",
    "Cruelty-Free",
    "Organic",
    "Paraben-Free",
    "Hypoallergenic",
    "Natural",
    "Sustainable",
    "Dermatologist Tested",
  ]


  // Products data


  // allProducts: Product[] = [
  //   {
  //     id: 1,
  //     name: "Radiance Serum",
  //     brand: "Glow Essentials",
  //     image: "assets/images/products/serum.jpg",
  //     images: [
  //       "assets/images/products/serum.jpg",
  //       "assets/images/products/serum-2.jpg",
  //       "assets/images/products/serum-3.jpg",
  //     ],
  //     price: 49.99,
  //     originalPrice: 59.99,
  //     rating: 4.8,
  //     reviewCount: 124,
  //     shortDescription: "Vitamin C enriched serum for brighter, more even skin tone.",
  //     description:
  //       "Our bestselling Radiance Serum is formulated with 15% Vitamin C, Hyaluronic Acid, and Niacinamide to brighten skin, reduce dark spots, and improve overall skin texture.",
  //     benefits: [
  //       "Brightens skin tone",
  //       "Reduces hyperpigmentation",
  //       "Boosts collagen production",
  //       "Hydrates and plumps",
  //     ],
  //     isBestSeller: true,
  //     isNew: false,
  //     inStock: true,
  //     category: "Skincare",
  //     tags: ["Vegan", "Cruelty-Free", "Paraben-Free"],
  //     colors: [
  //       { name: "Original", code: "#F9E8D2" },
  //       { name: "Sensitive Skin", code: "#E6F4F1" },
  //     ],
  //     freeShipping: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Hydra Boost Moisturizer",
  //     brand: "Aqua Beauty",
  //     image: "assets/images/products/moisturizer.jpg",
  //     images: [
  //       "assets/images/products/moisturizer.jpg",
  //       "assets/images/products/moisturizer-2.jpg",
  //       "assets/images/products/moisturizer-3.jpg",
  //     ],
  //     price: 38.5,
  //     originalPrice: null,
  //     rating: 4.7,
  //     reviewCount: 98,
  //     shortDescription: "Lightweight gel-cream that provides 72-hour hydration.",
  //     description:
  //       "This oil-free moisturizer delivers intense hydration with a lightweight feel. Formulated with Hyaluronic Acid and Glycerin to lock in moisture for up to 72 hours.",
  //     benefits: ["Long-lasting hydration", "Oil-free formula", "Suitable for all skin types", "Non-comedogenic"],
  //     isBestSeller: true,
  //     isNew: false,
  //     inStock: true,
  //     category: "Skincare",
  //     tags: ["Hypoallergenic", "Dermatologist Tested", "Oil-Free"],
  //     freeShipping: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Velvet Matte Lipstick",
  //     brand: "Color Couture",
  //     image: "assets/images/products/lipstick.jpg",
  //     images: [
  //       "assets/images/products/lipstick.jpg",
  //       "assets/images/products/lipstick-2.jpg",
  //       "assets/images/products/lipstick-3.jpg",
  //     ],
  //     price: 24.99,
  //     originalPrice: 29.99,
  //     rating: 4.5,
  //     reviewCount: 76,
  //     shortDescription: "Long-wearing matte lipstick with a comfortable feel.",
  //     description:
  //       "Our Velvet Matte Lipstick delivers intense color payoff with a comfortable, non-drying formula. Stays put for up to 8 hours without feathering or bleeding.",
  //     benefits: ["Long-wearing formula", "Comfortable matte finish", "Highly pigmented", "Cruelty-free"],
  //     isBestSeller: true,
  //     isNew: false,
  //     inStock: true,
  //     category: "Makeup",
  //     tags: ["Vegan", "Cruelty-Free", "Long-Lasting"],
  //     colors: [
  //       { name: "Ruby Red", code: "#C62828" },
  //       { name: "Coral Pink", code: "#F06292" },
  //       { name: "Mauve Nude", code: "#C5A3A3" },
  //       { name: "Berry Wine", code: "#880E4F" },
  //     ],
  //     freeShipping: false,
  //   },
  //   {
  //     id: 4,
  //     name: "Silk Foundation",
  //     brand: "Flawless Face",
  //     image: "assets/images/products/foundation.jpg",
  //     images: [
  //       "assets/images/products/foundation.jpg",
  //       "assets/images/products/foundation-2.jpg",
  //       "assets/images/products/foundation-3.jpg",
  //     ],
  //     price: 42.0,
  //     originalPrice: null,
  //     rating: 4.6,
  //     reviewCount: 112,
  //     shortDescription: "Medium to full coverage foundation with a natural finish.",
  //     description:
  //       "This buildable foundation blends seamlessly for a flawless, natural-looking finish. Available in 40 shades to match every skin tone perfectly.",
  //     benefits: ["Buildable coverage", "Natural finish", "24-hour wear", "Transfer-resistant"],
  //     isBestSeller: true,
  //     isNew: false,
  //     inStock: true,
  //     category: "Makeup",
  //     tags: ["Dermatologist Tested", "Non-Comedogenic", "Oil-Free"],
  //     colors: [
  //       { name: "Fair 01", code: "#F6E3CE" },
  //       { name: "Light 02", code: "#F0D6B9" },
  //       { name: "Medium 03", code: "#E0B996" },
  //       { name: "Tan 04", code: "#C99F74" },
  //       { name: "Deep 05", code: "#8D5A3C" },
  //     ],
  //     freeShipping: true,
  //   },
  //   {
  //     id: 5,
  //     name: "Overnight Repair Mask",
  //     brand: "Glow Essentials",
  //     image: "assets/images/products/mask.jpg",
  //     images: [
  //       "assets/images/products/mask.jpg",
  //       "assets/images/products/mask-2.jpg",
  //       "assets/images/products/mask-3.jpg",
  //     ],
  //     price: 45.0,
  //     originalPrice: 55.0,
  //     rating: 4.9,
  //     reviewCount: 87,
  //     shortDescription: "Intensive overnight treatment for renewed skin by morning.",
  //     description:
  //       "Wake up to renewed skin with our Overnight Repair Mask. Formulated with Retinol, Peptides, and Niacinamide to repair and rejuvenate while you sleep.",
  //     benefits: ["Reduces fine lines", "Improves skin texture", "Enhances radiance", "Strengthens skin barrier"],
  //     isBestSeller: true,
  //     isNew: false,
  //     inStock: true,
  //     category: "Skincare",
  //     tags: ["Anti-Aging", "Paraben-Free", "Cruelty-Free"],
  //     freeShipping: true,
  //   },
  //   {
  //     id: 6,
  //     name: "Rose Quartz Facial Roller",
  //     brand: "Crystal Beauty",
  //     image: "assets/images/products/facial-roller.jpg",
  //     images: ["assets/images/products/facial-roller.jpg", "assets/images/products/facial-roller-2.jpg"],
  //     price: 28.0,
  //     originalPrice: null,
  //     rating: 4.3,
  //     reviewCount: 42,
  //     description: "Handcrafted rose quartz facial roller that helps reduce puffiness and improve product absorption.",
  //     benefits: ["Reduces puffiness", "Improves circulation", "Enhances product absorption"],
  //     isNew: true,
  //     inStock: true,
  //     category: "Skincare",
  //     tags: ["Tools", "Natural", "Sustainable"],
  //     freeShipping: false,
  //   },
  //   {
  //     id: 7,
  //     name: "Botanical Cleansing Oil",
  //     brand: "Pure Botanics",
  //     image: "assets/images/products/cleansing-oil.jpg",
  //     images: ["assets/images/products/cleansing-oil.jpg", "assets/images/products/cleansing-oil-2.jpg"],
  //     price: 34.99,
  //     originalPrice: null,
  //     rating: 4.7,
  //     reviewCount: 28,
  //     description: "Gentle cleansing oil that dissolves makeup and impurities without stripping the skin.",
  //     benefits: ["Removes makeup effortlessly", "Doesn't clog pores", "Suitable for sensitive skin"],
  //     isNew: true,
  //     inStock: true,
  //     category: "Skincare",
  //     tags: ["Organic", "Natural", "Sensitive Skin"],
  //     freeShipping: true,
  //   },
  //   {
  //     id: 8,
  //     name: "Volumizing Mascara",
  //     brand: "Lash Luxe",
  //     image: "assets/images/products/mascara.jpg",
  //     images: ["assets/images/products/mascara.jpg", "assets/images/products/mascara-2.jpg"],
  //     price: 22.5,
  //     originalPrice: null,
  //     rating: 4.5,
  //     reviewCount: 36,
  //     description: "Buildable mascara that adds volume and length without clumping or flaking.",
  //     benefits: ["Volumizing formula", "Smudge-proof", "Easy to remove"],
  //     isNew: true,
  //     inStock: true,
  //     category: "Makeup",
  //     tags: ["Vegan", "Cruelty-Free", "Ophthalmologist Tested"],
  //     colors: [
  //       { name: "Black", code: "#000000" },
  //       { name: "Brown", code: "#4E342E" },
  //     ],
  //     freeShipping: false,
  //   },
  //   {
  //     id: 9,
  //     name: "Exfoliating Toner",
  //     brand: "Glow Essentials",
  //     image: "assets/images/products/toner.jpg",
  //     images: ["assets/images/products/toner.jpg", "assets/images/products/toner-2.jpg"],
  //     price: 32.0,
  //     originalPrice: null,
  //     rating: 4.6,
  //     reviewCount: 19,
  //     description: "Gentle exfoliating toner with AHAs and BHAs to refine skin texture and minimize pores.",
  //     benefits: ["Exfoliates dead skin cells", "Unclogs pores", "Improves skin texture"],
  //     isNew: true,
  //     inStock: true,
  //     category: "Skincare",
  //     tags: ["Exfoliating", "Alcohol-Free", "Paraben-Free"],
  //     freeShipping: true,
  //   },
  //   {
  //     id: 10,
  //     name: "Hydrating Hair Mask",
  //     brand: "Pure Botanics",
  //     image: "assets/images/products/hair-mask.jpg",
  //     images: ["assets/images/products/hair-mask.jpg", "assets/images/products/hair-mask-2.jpg"],
  //     price: 36.0,
  //     originalPrice: 42.0,
  //     rating: 4.8,
  //     reviewCount: 54,
  //     description: "Deep conditioning treatment that repairs damaged hair and restores moisture.",
  //     benefits: ["Repairs split ends", "Adds shine", "Reduces frizz", "Detangles"],
  //     isNew: false,
  //     inStock: true,
  //     category: "Haircare",
  //     tags: ["Sulfate-Free", "Paraben-Free", "Cruelty-Free"],
  //     freeShipping: false,
  //   },
  //   {
  //     id: 11,
  //     name: "Dewy Highlighter",
  //     brand: "Color Couture",
  //     image: "assets/images/products/highlighter.jpg",
  //     images: ["assets/images/products/highlighter.jpg", "assets/images/products/highlighter-2.jpg"],
  //     price: 26.0,
  //     originalPrice: null,
  //     rating: 4.7,
  //     reviewCount: 38,
  //     description: "Creamy highlighter that gives skin a natural, dewy glow without glitter or sparkle.",
  //     benefits: ["Natural glow", "Blendable formula", "Long-lasting", "Buildable intensity"],
  //     isNew: false,
  //     inStock: true,
  //     category: "Makeup",
  //     tags: ["Vegan", "Cruelty-Free", "Paraben-Free"],
  //     colors: [
  //       { name: "Pearl", code: "#F5F5F5" },
  //       { name: "Champagne", code: "#F7E7CE" },
  //       { name: "Golden", code: "#F0C675" },
  //       { name: "Bronze", code: "#CD7F32" },
  //     ],
  //     freeShipping: true,
  //   },
  //   {
  //     id: 12,
  //     name: "Refreshing Body Wash",
  //     brand: "Aqua Beauty",
  //     image: "assets/images/products/body-wash.jpg",
  //     images: ["assets/images/products/body-wash.jpg", "assets/images/products/body-wash-2.jpg"],
  //     price: 18.0,
  //     originalPrice: 22.0,
  //     rating: 4.5,
  //     reviewCount: 67,
  //     description: "Gentle, sulfate-free body wash that cleanses without stripping skin's natural moisture.",
  //     benefits: ["Gentle cleansing", "Hydrating formula", "Refreshing scent", "Suitable for daily use"],
  //     isNew: false,
  //     inStock: true,
  //     category: "Bath & Body",
  //     tags: ["Sulfate-Free", "Vegan", "Cruelty-Free"],
  //     freeShipping: false,
  //   },
  //   {
  //     id: 13,
  //     name: "Silk Pillowcase",
  //     brand: "Crystal Beauty",
  //     image: "assets/images/products/pillowcase.jpg",
  //     images: ["assets/images/products/pillowcase.jpg", "assets/images/products/pillowcase-2.jpg"],
  //     price: 45.0,
  //     originalPrice: null,
  //     rating: 4.9,
  //     reviewCount: 29,
  //     description: "100% mulberry silk pillowcase that prevents hair breakage and helps maintain skin's moisture.",
  //     benefits: ["Reduces hair breakage", "Prevents sleep creases", "Maintains skin hydration", "Hypoallergenic"],
  //     isNew: true,
  //     inStock: true,
  //     category: "Haircare",
  //     tags: ["Sustainable", "Natural", "Hypoallergenic"],
  //     colors: [
  //       { name: "Ivory", code: "#FFFFF0" },
  //       { name: "Blush Pink", code: "#FED4D5" },
  //       { name: "Silver Gray", code: "#C0C0C0" },
  //       { name: "Navy Blue", code: "#000080" },
  //     ],
  //     freeShipping: true,
  //   },
  //   {
  //     id: 14,
  //     name: "Signature Eau de Parfum",
  //     brand: "Flawless Face",
  //     image: "assets/images/products/perfume.jpg",
  //     images: ["assets/images/products/perfume.jpg", "assets/images/products/perfume-2.jpg"],
  //     price: 85.0,
  //     originalPrice: 95.0,
  //     rating: 4.8,
  //     reviewCount: 42,
  //     description: "Elegant fragrance with notes of jasmine, bergamot, and sandalwood for a sophisticated scent.",
  //     benefits: ["Long-lasting", "Sophisticated scent", "Elegant bottle", "Perfect for daily wear"],
  //     isNew: false,
  //     inStock: true,
  //     category: "Fragrance",
  //     tags: ["Cruelty-Free", "Vegan", "Alcohol-Free"],
  //     sizes: ["30ml", "50ml", "100ml"],
  //     freeShipping: true,
  //   },
  //   {
  //     id: 15,
  //     name: "Nourishing Hand Cream",
  //     brand: "Pure Botanics",
  //     image: "assets/images/products/hand-cream.jpg",
  //     images: ["assets/images/products/hand-cream.jpg", "assets/images/products/hand-cream-2.jpg"],
  //     price: 16.0,
  //     originalPrice: null,
  //     rating: 4.6,
  //     reviewCount: 58,
  //     description: "Rich hand cream that deeply moisturizes dry hands without leaving a greasy residue.",
  //     benefits: ["Intense hydration", "Fast-absorbing", "Non-greasy", "Protects skin barrier"],
  //     isNew: false,
  //     inStock: true,
  //     category: "Bath & Body",
  //     tags: ["Organic", "Natural", "Paraben-Free"],
  //     freeShipping: false,
  //   },
  //   {
  //     id: 16,
  //     name: "Brow Sculpting Gel",
  //     brand: "Lash Luxe",
  //     image: "assets/images/products/brow-gel.jpg",
  //     images: ["assets/images/products/brow-gel.jpg", "assets/images/products/brow-gel-2.jpg"],
  //     price: 19.0,
  //     originalPrice: null,
  //     rating: 4.4,
  //     reviewCount: 31,
  //     description: "Tinted brow gel that shapes, fills, and sets brows in place for a natural, polished look.",
  //     benefits: ["Defines brows", "Long-lasting hold", "Natural finish", "Buildable color"],
  //     isNew: true,
  //     inStock: true,
  //     category: "Makeup",
  //     tags: ["Vegan", "Cruelty-Free", "Waterproof"],
  //     colors: [
  //       { name: "Blonde", code: "#D4B878" },
  //       { name: "Light Brown", code: "#A67B5B" },
  //       { name: "Medium Brown", code: "#8B572A" },
  //       { name: "Dark Brown", code: "#4E3524" },
  //       { name: "Black", code: "#000000" },
  //     ],
  //     freeShipping: false,
  //   },
  //   {
  //     id: 17,
  //     name: "Purifying Clay Mask",
  //     brand: "Glow Essentials",
  //     image: "assets/images/products/clay-mask.jpg",
  //     images: ["assets/images/products/clay-mask.jpg", "assets/images/products/clay-mask-2.jpg"],
  //     price: 29.0,
  //     originalPrice: 35.0,
  //     rating: 4.7,
  //     reviewCount: 47,
  //     description: "Detoxifying clay mask that draws out impurities and excess oil without over-drying the skin.",
  //     benefits: ["Detoxifies skin", "Reduces pore size", "Balances oil production", "Improves skin clarity"],
  //     isNew: false,
  //     inStock: true,
  //     category: "Skincare",
  //     tags: ["Clay", "Detoxifying", "Paraben-Free"],
  //     freeShipping: true,
  //   },
  //   {
  //     id: 18,
  //     name: "Satin Eyeshadow Palette",
  //     brand: "Color Couture",
  //     image: "assets/images/products/eyeshadow.jpg",
  //     images: ["assets/images/products/eyeshadow.jpg", "assets/images/products/eyeshadow-2.jpg"],
  //     price: 38.0,
  //     originalPrice: null,
  //     rating: 4.9,
  //     reviewCount: 76,
  //     description:
  //       "Versatile eyeshadow palette with 12 highly-pigmented, blendable shades in matte and shimmer finishes.",
  //     benefits: ["Highly pigmented", "Blendable formula", "Long-lasting", "Minimal fallout"],
  //     isNew: false,
  //     inStock: true,
  //     category: "Makeup",
  //     tags: ["Vegan", "Cruelty-Free", "Talc-Free"],
  //     freeShipping: true,
  //   },
  //   {
  //     id: 19,
  //     name: "Rejuvenating Eye Cream",
  //     brand: "Aqua Beauty",
  //     image: "assets/images/products/eye-cream.jpg",
  //     images: ["assets/images/products/eye-cream.jpg", "assets/images/products/eye-cream-2.jpg"],
  //     price: 42.0,
  //     originalPrice: 48.0,
  //     rating: 4.6,
  //     reviewCount: 39,
  //     description:
  //       "Lightweight eye cream that reduces puffiness, dark circles, and fine lines around the delicate eye area.",
  //     benefits: ["Reduces puffiness", "Minimizes dark circles", "Smooths fine lines", "Hydrates delicate eye area"],
  //     isNew: false,
  //     inStock: true,
  //     category: "Skincare",
  //     tags: ["Anti-Aging", "Caffeine", "Hyaluronic Acid"],
  //     freeShipping: false,
  //   },
  //   {
  //     id: 20,
  //     name: "Nourishing Hair Oil",
  //     brand: "Pure Botanics",
  //     image: "assets/images/products/hair-oil.jpg",
  //     images: ["assets/images/products/hair-oil.jpg", "assets/images/products/hair-oil-2.jpg"],
  //     price: 32.0,
  //     originalPrice: null,
  //     rating: 4.8,
  //     reviewCount: 52,
  //     description: "Lightweight hair oil that nourishes, adds shine, and tames frizz without weighing hair down.",
  //     benefits: ["Adds shine", "Reduces frizz", "Strengthens hair", "Protects from heat damage"],
  //     isNew: true,
  //     inStock: true,
  //     category: "Haircare",
  //     tags: ["Organic", "Natural", "Silicone-Free"],
  //     freeShipping: true,
  //   },
  //   {
  //     id: 21,
  //     name: "Brightening Face Scrub",
  //     brand: "Glow Essentials",
  //     image: "assets/images/products/face-scrub.jpg",
  //     images: ["assets/images/products/face-scrub.jpg", "assets/images/products/face-scrub-2.jpg"],
  //     price: 26.0,
  //     originalPrice: null,
  //     rating: 4.5,
  //     reviewCount: 43,
  //     description: "Gentle exfoliating scrub with jojoba beads and papaya enzymes to reveal brighter, smoother skin.",
  //     benefits: ["Gentle exfoliation", "Brightens complexion", "Smooths texture", "Non-irritating"],
  //     isNew: false,
  //     inStock: true,
  //     category: "Skincare",
  //     tags: ["Exfoliating", "Brightening", "Microplastic-Free"],
  //     freeShipping: false,
  //   },
  //   {
  //     id: 22,
  //     name: "Hydrating Lip Balm",
  //     brand: "Aqua Beauty",
  //     image: "assets/images/products/lip-balm.jpg",
  //     images: ["assets/images/products/lip-balm.jpg", "assets/images/products/lip-balm-2.jpg"],
  //     price: 12.0,
  //     originalPrice: 15.0,
  //     rating: 4.7,
  //     reviewCount: 89,
  //     description: "Nourishing lip balm with shea butter and vitamin E to hydrate and protect dry, chapped lips.",
  //     benefits: ["Intense hydration", "Repairs chapped lips", "Long-lasting moisture", "Subtle shine"],
  //     isNew: false,
  //     inStock: true,
  //     category: "Skincare",
  //     tags: ["Hydrating", "Vegan", "Cruelty-Free"],
  //     colors: [
  //       { name: "Clear", code: "#FFFFFF" },
  //       { name: "Rose", code: "#F7CAC9" },
  //       { name: "Peach", code: "#FFE5B4" },
  //       { name: "Berry", code: "#8E4585" },
  //     ],
  //     freeShipping: true,
  //   },
  //   {
  //     id: 23,
  //     name: "Illuminating Primer",
  //     brand: "Flawless Face",
  //     image: "assets/images/products/primer.jpg",
  //     images: ["assets/images/products/primer.jpg", "assets/images/products/primer-2.jpg"],
  //     price: 28.0,
  //     originalPrice: null,
  //     rating: 4.6,
  //     reviewCount: 64,
  //     description:
  //       "Illuminating primer that creates a smooth canvas for makeup while adding a subtle glow to the skin.",
  //     benefits: ["Creates smooth canvas", "Extends makeup wear", "Adds subtle luminosity", "Hydrates skin"],
  //     isNew: false,
  //     inStock: true,
  //     category: "Makeup",
  //     tags: ["Illuminating", "Silicone-Free", "Hydrating"],
  //     freeShipping: false,
  //   },
  //   {
  //     id: 24,
  //     name: "Relaxing Bath Salts",
  //     brand: "Pure Botanics",
  //     image: "assets/images/products/bath-salts.jpg",
  //     images: ["assets/images/products/bath-salts.jpg", "assets/images/products/bath-salts-2.jpg"],
  //     price: 22.0,
  //     originalPrice: null,
  //     rating: 4.8,
  //     reviewCount: 37,
  //     description: "Mineral-rich bath salts with lavender and chamomile to soothe tired muscles and calm the mind.",
  //     benefits: ["Relieves muscle tension", "Promotes relaxation", "Softens skin", "Aromatherapy benefits"],
  //     isNew: false,
  //     inStock: true,
  //     category: "Bath & Body",
  //     tags: ["Relaxing", "Natural", "Aromatherapy"],
  //     freeShipping: true,
  //   },
  // ]

  // Filtered products
  allProducts: Product[] = []
  filteredProducts: Product[] = []

  // Products
  products: Product[] = []


  // Search input reference
  @ViewChild("searchInput") searchInput!: ElementRef

  constructor(
    private messageService: MessageService,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.loadAllProducts();
  
  }
  clearRecentSearches(): void {
    this.recentSearches = [];
  }
  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    // Adjust grid columns based on window width
    const width = event.target.innerWidth
    if (width < 768) {
      this.gridColumns = 2
    } else if (width < 1024) {
      this.gridColumns = 3
    } else {
      this.gridColumns = 4
    }
  }
  loadAllProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';
  
    this.productService.getAllProductsNoPagination().subscribe({
      next: (products: Product[]) => {
        console.log('Products loaded:', products);
        this.products = products;
        this.allProducts = products; // Add this line
        this.filteredProducts = products; // Add this line
        this.isLoading = false;
        this.applyFilters(); // Apply filters after data loads
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load products';
        this.isLoading = false;
      }
    });
  }
 

  resetFilters(): void {
    this.searchQuery = '';
    this.filters = {
      categories: [],
      brands: [],
      priceRange: [0, 200],
      rating: null,
      inStock: false,
      onSale: false,
      freeShipping: false,
      tags: []
    };
    this.applyFilters();
  }

  onSearchInput(): void {
    this.applyFilters();
  }


  // Toggle mobile filter visibility
  toggleMobileFilter() {
    this.isMobileFilterVisible = !this.isMobileFilterVisible
  }

  // Change view mode
  setViewMode(mode: "grid" | "list") {
    this.viewMode = mode
  }

  // Change grid columns
  setGridColumns(columns: 2 | 3 | 4) {
    this.gridColumns = columns
  }

  // Handle sort change
  onSortChange() {
    this.applyFilters()
  }

  // Handle pagination
  onPageChange(event: any) {
    this.first = event.first
    this.rows = event.rows
    // In a real app, you would fetch the next page of products
    // For this demo, we'll just scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }



  // Apply all filters
  applyFilters() {
    let result = [...this.allProducts]

    // Apply category filter
    if (this.filters.categories.length > 0) {
      result = result.filter((product) => this.filters.categories.includes(product.item_Name))
    }

    // Apply brand filter
    if (this.filters.brands.length > 0) {
      result = result.filter((product) => this.filters.brands.includes(product.item_Name))
    }

    // Apply price range filter
    result = result.filter(
      (product) => product.price >= this.filters.priceRange[0] && product.price <= this.filters.priceRange[1],
    )

    // Apply rating filter
    if (this.filters.rating) {
      result = result.filter((product) => product.id >= this.filters.rating!)
    }

    // Apply in stock filter
    if (this.filters.inStock) {
      result = result.filter((product) => product.categoryId)
    }

    // Apply on sale filter
    if (this.filters.onSale) {
      result = result.filter((product) => product.price !== null)
    }

    // Apply free shipping filter
    if (this.filters.freeShipping) {
      result = result.filter((product) => product.createdAt)
    }

    // Apply tag filters
    if (this.filters.tags.length > 0) {
    
    }

    // Apply search query
    if (this.searchQuery.trim()) {
      
    }

    // Apply sorting
    switch (this.selectedSortOption.value) {
    
    }

    // Update filtered products
    this.filteredProducts = result
    this.totalRecords = result.length

    // Count active filters for mobile badge
    this.countActiveFilters()

    // Hide search suggestions
    this.showSearchSuggestions = false
  }

  // Count active filters
  countActiveFilters() {
    let count = 0

    if (this.filters.categories.length > 0) count++
    if (this.filters.brands.length > 0) count++
    if (this.filters.priceRange[0] > 0 || this.filters.priceRange[1] < 200) count++
    if (this.filters.rating) count++
    if (this.filters.inStock) count++
    if (this.filters.onSale) count++
    if (this.filters.freeShipping) count++
    if (this.filters.tags.length > 0) count++

    this.activeFilterCount = count
  }


  // Reset all filters
 

  // Toggle category filter
  toggleCategoryFilter(category: string) {
    const index = this.filters.categories.indexOf(category)
    if (index === -1) {
      this.filters.categories.push(category)
    } else {
      this.filters.categories.splice(index, 1)
    }
    this.applyFilters()
  }

  // Toggle brand filter
  toggleBrandFilter(brand: string) {
    const index = this.filters.brands.indexOf(brand)
    if (index === -1) {
      this.filters.brands.push(brand)
    } else {
      this.filters.brands.splice(index, 1)
    }
    this.applyFilters()
  }

  // Toggle tag filter
  toggleTagFilter(tag: string) {
    const index = this.filters.tags.indexOf(tag)
    if (index === -1) {
      this.filters.tags.push(tag)
    } else {
      this.filters.tags.splice(index, 1)
    }
    this.applyFilters()
  }

  // Set rating filter
  setRatingFilter(rating: number | null) {
    this.filters.rating = rating
    this.applyFilters()
  }

  // Show quick view
  showQuickView(product: Product, event?: MouseEvent) {
   
  }

  // Add to cart
  addToCart(product: Product, quantity = 1) {
   
  }

  // Add to wishlist
  addToWishlist(product: Product, event?: MouseEvent) {
    
  }

  // Get discount percentage
  getDiscountPercentage() {

  }

  // Select color
  selectColor(color: ProductColor) {
    this.selectedColor = color
  }

  // Select size
  selectSize(size: string) {
    this.selectedSize = size
  }

  // Handle search input
  
  // Generate search suggestions
  generateSearchSuggestions(query: string){
   
  }

  // Use search suggestion
  useSearchSuggestion(suggestion: string) {
    this.searchQuery = suggestion
    this.showSearchSuggestions = false
    this.applyFilters()

    // Add to recent searches if not already there
    if (!this.recentSearches.includes(suggestion)) {
      this.recentSearches.unshift(suggestion)
      if (this.recentSearches.length > 4) {
        this.recentSearches.pop()
      }
    }
  }

  // Clear search
  clearSearch() {
    this.searchQuery = ""
    this.showSearchSuggestions = false
    this.applyFilters()
  }

  // Focus search input
  focusSearch() {
    if (this.searchInput) {
      this.searchInput.nativeElement.focus()
    }
  }
}
