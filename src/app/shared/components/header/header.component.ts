import { Component  , OnInit }  from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: false
})
export class HeaderComponent implements OnInit {
  searchQuery = ""
  cartItems: any[] = [
    { id: 1, name: "Hydrating Face Cream", price: 29.99, image: "/placeholder.svg?height=60&width=60" },
    { id: 2, name: "Vitamin C Serum", price: 34.99, image: "/placeholder.svg?height=60&width=60" },
  ]
  wishlistItems: any[] = [
    { id: 3, name: "Rose Water Toner", price: 19.99, image: "/placeholder.svg?height=60&width=60" },
  ]


  userMenuItems: MenuItem[] = []
  categoryMenuItems: MenuItem[] = []

  showMobileMenu = false
  showMobileCategories = false

  ngOnInit() {
    this.userMenuItems = [
      { label: "My Profile", icon: "pi pi-user" },
      { label: "My Orders", icon: "pi pi-shopping-bag" },
      { label: "My Wishlist", icon: "pi pi-heart" },
      { label: "Beauty Points", icon: "pi pi-star" },
      { separator: true },
      { label: "Sign Out", icon: "pi pi-sign-out" },
    ]

    this.categoryMenuItems = [
      {
        label: "Skincare",
        items: [{ label: "Cleansers" }, { label: "Moisturizers" }, { label: "Serums" }, { label: "Masks" }],
      },
      { label: "Makeup", items: [{ label: "Face" }, { label: "Eyes" }, { label: "Lips" }, { label: "Cheeks" }] },
      { label: "Haircare", items: [{ label: "Shampoo" }, { label: "Conditioner" }, { label: "Treatments" }] },
      { label: "Fragrance", items: [{ label: "Perfume" }, { label: "Body Mist" }] },
    ]
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu
    if (!this.showMobileMenu) {
      this.showMobileCategories = false
    }
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0)
  }

  search() {
    console.log("Searching for:", this.searchQuery)
    // Implement search functionality
  }
}

