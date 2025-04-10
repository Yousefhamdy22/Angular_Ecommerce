import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from "@angular/animations"
import { MessageService } from "primeng/api"


interface Product {
  id: number
  name: string
  brand: string
  image: string
  images: string[]
  price: number
  originalPrice: number | null
  rating: number
  reviewCount: number
  description: string
  shortDescription?: string
  benefits: string[]
  isBestSeller?: boolean
  isNew?: boolean
  inStock: boolean
  category: string
  tags: string[]
  colors?: ProductColor[]
  sizes?: string[]
  featured?: boolean
}

interface ProductColor {
  name: string
  code: string
}

interface Collection {
  id: number
  name: string
  description: string
  image: string
  products: Product[]
}
@Component({
  selector: 'app-newarrivals',
 standalone: false,
  templateUrl: './newarrivals.component.html',
  styleUrl: './newarrivals.component.css',
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
export class NewarrivalsComponent {
 // UI States
 isLoading = true
 activeTab = 0

 // Quick view
 quickViewVisible = false
 selectedProduct: Product | null = null
 quantity = 1
 selectedColor: ProductColor | null = null
 selectedSize: string | null = null

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

 // Carousel responsive options
 carouselResponsiveOptions = [
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

 // Featured products
 featuredProducts: Product[] = []

 // New collections
 newCollections: Collection[] = [
   {
     id: 1,
     name: "Summer Glow Collection",
     description: "Radiant products for a sun-kissed summer look",
     image: "assets/images/collections/summer-glow.jpg",
     products: [],
   },
   {
     id: 2,
     name: "Natural Essentials",
     description: "Clean, vegan products with natural ingredients",
     image: "assets/images/collections/natural-essentials.jpg",
     products: [],
   },
   {
     id: 3,
     name: "Midnight Luxe",
     description: "Luxurious products for an elegant evening look",
     image: "assets/images/collections/midnight-luxe.jpg",
     products: [],
   },
 ]

 // All new arrival products
 newArrivalProducts: Product[] = [
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
     category: "Skincare",
     tags: ["Tools", "Natural", "Sustainable"],
     featured: true,
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
     category: "Skincare",
     tags: ["Organic", "Natural", "Sensitive Skin"],
     featured: true,
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
     category: "Makeup",
     tags: ["Vegan", "Cruelty-Free", "Ophthalmologist Tested"],
     colors: [
       { name: "Black", code: "#000000" },
       { name: "Brown", code: "#4E342E" },
     ],
     featured: true,
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
     category: "Skincare",
     tags: ["Exfoliating", "Alcohol-Free", "Paraben-Free"],
     featured: false,
   },
   {
     id: 13,
     name: "Silk Pillowcase",
     brand: "Crystal Beauty",
     image: "assets/images/products/pillowcase.jpg",
     images: ["assets/images/products/pillowcase.jpg", "assets/images/products/pillowcase-2.jpg"],
     price: 45.0,
     originalPrice: null,
     rating: 4.9,
     reviewCount: 29,
     description: "100% mulberry silk pillowcase that prevents hair breakage and helps maintain skin's moisture.",
     benefits: ["Reduces hair breakage", "Prevents sleep creases", "Maintains skin hydration", "Hypoallergenic"],
     isNew: true,
     inStock: true,
     category: "Haircare",
     tags: ["Sustainable", "Natural", "Hypoallergenic"],
     colors: [
       { name: "Ivory", code: "#FFFFF0" },
       { name: "Blush Pink", code: "#FED4D5" },
       { name: "Silver Gray", code: "#C0C0C0" },
       { name: "Navy Blue", code: "#000080" },
     ],
     featured: false,
   },
   {
     id: 16,
     name: "Brow Sculpting Gel",
     brand: "Lash Luxe",
     image: "assets/images/products/brow-gel.jpg",
     images: ["assets/images/products/brow-gel.jpg", "assets/images/products/brow-gel-2.jpg"],
     price: 19.0,
     originalPrice: null,
     rating: 4.4,
     reviewCount: 31,
     description: "Tinted brow gel that shapes, fills, and sets brows in place for a natural, polished look.",
     benefits: ["Defines brows", "Long-lasting hold", "Natural finish", "Buildable color"],
     isNew: true,
     inStock: true,
     category: "Makeup",
     tags: ["Vegan", "Cruelty-Free", "Waterproof"],
     colors: [
       { name: "Blonde", code: "#D4B878" },
       { name: "Light Brown", code: "#A67B5B" },
       { name: "Medium Brown", code: "#8B572A" },
       { name: "Dark Brown", code: "#4E3524" },
       { name: "Black", code: "#000000" },
     ],
     featured: false,
   },
   {
     id: 20,
     name: "Nourishing Hair Oil",
     brand: "Pure Botanics",
     image: "assets/images/products/hair-oil.jpg",
     images: ["assets/images/products/hair-oil.jpg", "assets/images/products/hair-oil-2.jpg"],
     price: 32.0,
     originalPrice: null,
     rating: 4.8,
     reviewCount: 52,
     description: "Lightweight hair oil that nourishes, adds shine, and tames frizz without weighing hair down.",
     benefits: ["Adds shine", "Reduces frizz", "Strengthens hair", "Protects from heat damage"],
     isNew: true,
     inStock: true,
     category: "Haircare",
     tags: ["Organic", "Natural", "Silicone-Free"],
     featured: false,
   },
   {
     id: 25,
     name: "Illuminating Serum",
     brand: "Glow Essentials",
     image: "assets/images/products/illuminating-serum.jpg",
     images: ["assets/images/products/illuminating-serum.jpg", "assets/images/products/illuminating-serum-2.jpg"],
     price: 48.0,
     originalPrice: 55.0,
     rating: 4.9,
     reviewCount: 34,
     description: "Brightening serum with vitamin C and niacinamide to even skin tone and boost radiance.",
     benefits: ["Brightens complexion", "Reduces dark spots", "Evens skin tone", "Boosts radiance"],
     isNew: true,
     inStock: true,
     category: "Skincare",
     tags: ["Brightening", "Vitamin C", "Niacinamide"],
     featured: true,
   },
   {
     id: 26,
     name: "Hydrating Face Mist",
     brand: "Aqua Beauty",
     image: "assets/images/products/face-mist.jpg",
     images: ["assets/images/products/face-mist.jpg", "assets/images/products/face-mist-2.jpg"],
     price: 22.0,
     originalPrice: null,
     rating: 4.7,
     reviewCount: 41,
     description:
       "Refreshing face mist with hyaluronic acid and rose water to hydrate and revitalize skin throughout the day.",
     benefits: ["Instant hydration", "Refreshes makeup", "Soothes skin", "Antioxidant protection"],
     isNew: true,
     inStock: true,
     category: "Skincare",
     tags: ["Hydrating", "Travel-Friendly", "Alcohol-Free"],
     featured: false,
   },
   {
     id: 27,
     name: "Cream Blush",
     brand: "Color Couture",
     image: "assets/images/products/cream-blush.jpg",
     images: ["assets/images/products/cream-blush.jpg", "assets/images/products/cream-blush-2.jpg"],
     price: 26.0,
     originalPrice: null,
     rating: 4.6,
     reviewCount: 38,
     description: "Creamy, blendable blush that melts into skin for a natural flush of color.",
     benefits: ["Natural finish", "Buildable color", "Hydrating formula", "Long-lasting"],
     isNew: true,
     inStock: true,
     category: "Makeup",
     tags: ["Cream Formula", "Vegan", "Cruelty-Free"],
     colors: [
       { name: "Peach", code: "#FFCBA4" },
       { name: "Rose", code: "#E8909B" },
       { name: "Berry", code: "#8E4585" },
       { name: "Coral", code: "#FF8C69" },
     ],
     featured: false,
   },
   {
     id: 28,
     name: "Scalp Treatment",
     brand: "Pure Botanics",
     image: "assets/images/products/scalp-treatment.jpg",
     images: ["assets/images/products/scalp-treatment.jpg", "assets/images/products/scalp-treatment-2.jpg"],
     price: 36.0,
     originalPrice: 42.0,
     rating: 4.8,
     reviewCount: 27,
     description: "Soothing scalp treatment with tea tree oil and peppermint to balance and refresh the scalp.",
     benefits: ["Soothes irritation", "Balances oil production", "Refreshes scalp", "Promotes healthy hair growth"],
     isNew: true,
     inStock: true,
     category: "Haircare",
     tags: ["Scalp Care", "Tea Tree", "Cooling"],
     featured: false,
   },
 ]

 constructor(private messageService: MessageService) {}

 ngOnInit() {
   // Simulate loading
   setTimeout(() => {
     this.isLoading = false
     this.initializeData()
   }, 1000)
 }

 initializeData() {
   // Set featured products
   this.featuredProducts = this.newArrivalProducts.filter((product) => product.featured)

   // Assign products to collections
   this.newCollections[0].products = this.newArrivalProducts
     .filter((p) => p.tags.includes("Brightening") || p.category === "Makeup" || p.tags.includes("Hydrating"))
     .slice(0, 4)

   this.newCollections[1].products = this.newArrivalProducts
     .filter((p) => p.tags.includes("Natural") || p.tags.includes("Organic") || p.tags.includes("Vegan"))
     .slice(0, 4)

   this.newCollections[2].products = this.newArrivalProducts
     .filter((p) => p.price > 30 || p.category === "Makeup" || p.tags.includes("Luxury"))
     .slice(0, 4)
 }

 // Show quick view
 showQuickView(product: Product, event?: MouseEvent) {
   if (event) {
     event.preventDefault()
     event.stopPropagation()
   }

   this.selectedProduct = product
   this.quantity = 1
   this.selectedColor = product.colors ? product.colors[0] : null
   this.selectedSize = product.sizes ? product.sizes[0] : null
   this.quickViewVisible = true
 }

 skincareProducts: any[] = [];
 makeupProducts: any[] = [];
 // Add to cart
 addToCart(product: Product, quantity = 1) {
   // In a real app, you would call a cart service
   this.messageService.add({
     severity: "success",
     summary: "Added to Cart",
     detail: `${product.name} (${quantity}) added to your cart`,
     life: 3000,
   })

   this.quickViewVisible = false
 }

 // Add to wishlist
 addToWishlist(product: Product, event?: MouseEvent) {
   if (event) {
     event.preventDefault()
     event.stopPropagation()
   }

   // In a real app, you would call a wishlist service
   this.messageService.add({
     severity: "success",
     summary: "Added to Wishlist",
     detail: `${product.name} added to your wishlist`,
     life: 3000,
   })
 }

 // Get discount percentage
 getDiscountPercentage(product: Product): number {
   if (!product.originalPrice) return 0
   return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
 }

 // Select color
 selectColor(color: ProductColor) {
   this.selectedColor = color
 }

 // Select size
 selectSize(size: string) {
   this.selectedSize = size
 }
}
