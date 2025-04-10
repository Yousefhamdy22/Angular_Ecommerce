import { Component  , OnInit , HostListener} from '@angular/core';



interface Order {
  id: string
  date: string
  productImg: string
  productName: string
  customer: string
  email: string
  phone: string
  status: "Completed" | "Processing" | "Cancelled"
  total: string
  section: "Today" | "Yesterday" | "Previous"
}

@Component({
  selector: 'app-dashboard-main',
  standalone: false,
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.css'
})
export class DashboardMainComponent implements OnInit {

  isProductsMenuOpen = false;
  isOrdersMenuOpen = false;
  isCategoriesMenuOpen = false;
  isSettingsMenuOpen = false;



  toggleProductsMenu() {
    this.isProductsMenuOpen = !this.isProductsMenuOpen;
  }
 

  toggleOrdersMenu() {
    this.isOrdersMenuOpen = !this.isOrdersMenuOpen;

  }

  toggleCategoriesMenu() {
    this.isCategoriesMenuOpen = !this.isCategoriesMenuOpen;
  }
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.relative')) {
      this.isProductsMenuOpen = false;
    }
  }
  orders: Order[] = [
    {
      id: "#ORD-5392",
      date: "Apr 02, 2023",
      productImg: "/assets/images/placeholder.svg",
      productName: "Wireless Earbuds",
      customer: "Emma Thompson",
      email: "emma.t@example.com",
      phone: "(555) 123-4567",
      status: "Completed",
      total: "$129.99",
      section: "Today"
    },
    {
      id: "#ORD-5391",
      date: "Apr 02, 2023",
      productImg: "/assets/images/placeholder.svg",
      productName: "Smart Watch",
      customer: "Michael Chen",
      email: "m.chen@example.com",
      phone: "(555) 987-6543",
      status: "Processing",
      total: "$249.99",
      section: "Today"
    },
    {
      id: "#ORD-5390",
      date: "Apr 01, 2023",
      productImg: "/assets/images/placeholder.svg",
      productName: "Bluetooth Speaker",
      customer: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 234-5678",
      status: "Completed",
      total: "$79.99",
      section: "Yesterday"
    },
    {
      id: "#ORD-5389",
      date: "Apr 01, 2023",
      productImg: "/assets/images/placeholder.svg",
      productName: "Laptop Stand",
      customer: "David Williams",
      email: "d.williams@example.com",
      phone: "(555) 876-5432",
      status: "Cancelled",
      total: "$34.99",
      section: "Yesterday"
    },
    {
      id: "#ORD-5388",
      date: "Mar 31, 2023",
      productImg: "/assets/images/placeholder.svg",
      productName: "Mechanical Keyboard",
      customer: "Jessica Brown",
      email: "j.brown@example.com",
      phone: "(555) 345-6789",
      status: "Processing",
      total: "$149.99",
      section: "Previous"
    },
    {
      id: "#ORD-5387",
      date: "Mar 30, 2023",
      productImg: "/assets/images/placeholder.svg",
      productName: "USB-C Hub",
      customer: "Robert Garcia",
      email: "r.garcia@example.com",
      phone: "(555) 765-4321",
      status: "Completed",
      total: "$59.99",
      section: "Previous"
    },
    {
      id: "#ORD-5386",
      date: "Mar 30, 2023",
      productImg: "/assets/images/placeholder.svg",
      productName: "Wireless Mouse",
      customer: "Amanda Lee",
      email: "a.lee@example.com",
      phone: "(555) 456-7890",
      status: "Completed",
      total: "$45.99",
      section: "Previous"
    }
  ];

  // Group orders by section
  groupedOrders: { [key: string]: Order[] } = {};
  sections: string[] = [];
  expandedSections: { [key: string]: boolean } = {};
  activeTab: string = 'all';
  searchQuery: string = '';
  statusFilter: string = 'all';
  sortOption: string = 'newest';

  constructor() { }

  ngOnInit(): void {
    this.groupOrdersBySection();
    
    // Initialize all sections as expanded
    this.sections.forEach(section => {
      this.expandedSections[section] = true;
    });
  }

  groupOrdersBySection(): void {
    this.groupedOrders = {};
    
    this.orders.forEach(order => {
      if (!this.groupedOrders[order.section]) {
        this.groupedOrders[order.section] = [];
        this.sections.push(order.section);
      }
      this.groupedOrders[order.section].push(order);
    });
  }

  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getFilteredOrders(): Order[] {
    if (this.activeTab === 'all') {
      return this.orders;
    } else {
      return this.orders.filter(order => 
        order.status.toLowerCase() === this.activeTab.toLowerCase()
      );
    }
  }

  getCompletedCount(): number {
    return this.orders.filter(order => order.status === 'Completed').length;
  }

  getProcessingCount(): number {
    return this.orders.filter(order => order.status === 'Processing').length;
  }

  getCancelledCount(): number {
    return this.orders.filter(order => order.status === 'Cancelled').length;
  }
}


