import { Component ,OnInit } from '@angular/core';

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  imageUrl: string
}

interface Customer {
  id: number
  name: string
  email: string
  phone: string
}

interface Order {
  id: string
  trackingNumber: string
  date: Date
  customer: Customer
  items: OrderItem[]
  total: number
  status: "Completed" | "Processing" | "Shipped" | "Cancelled" | "Refunded"
  paymentMethod: "credit_card" | "paypal" | "bank_transfer"
  shippingAddress: string
  notes?: string
}

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent  implements OnInit {
  searchQuery = ""
  statusFilter = ""
  timeFilter = ""
  activeTab = "all"

  // Sample order data
  orders: Order[] = [
    {
      id: "#ORD-5392",
      trackingNumber: "TRK-7239085",
      date: new Date("2023-04-02T14:30:00"),
      customer: {
        id: 1,
        name: "Emma Thompson",
        email: "emma.t@example.com",
        phone: "(555) 123-4567",
      },
      items: [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 129.99,
          quantity: 1,
          imageUrl: "assets/images/headphones.jpg",
        },
      ],
      total: 129.99,
      status: "Completed",
      paymentMethod: "credit_card",
      shippingAddress: "123 Main St, Anytown, CA 94103",
    },
    {
      id: "#ORD-5391",
      trackingNumber: "TRK-7239084",
      date: new Date("2023-04-02T10:15:00"),
      customer: {
        id: 2,
        name: "Michael Chen",
        email: "m.chen@example.com",
        phone: "(555) 987-6543",
      },
      items: [
        {
          id: 3,
          name: "Smart Watch Series 7",
          price: 399.99,
          quantity: 1,
          imageUrl: "assets/images/smartwatch.jpg",
        },
      ],
      total: 399.99,
      status: "Processing",
      paymentMethod: "paypal",
      shippingAddress: "456 Oak Ave, Springfield, NY 10001",
    },
    {
      id: "#ORD-5390",
      trackingNumber: "TRK-7239083",
      date: new Date("2023-04-01T16:45:00"),
      customer: {
        id: 3,
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "(555) 234-5678",
      },
      items: [
        {
          id: 2,
          name: "Bluetooth Speaker",
          price: 79.99,
          quantity: 1,
          imageUrl: "assets/images/speaker.jpg",
        },
      ],
      total: 79.99,
      status: "Shipped",
      paymentMethod: "credit_card",
      shippingAddress: "789 Pine Ln, Lakeside, TX 75001",
    },
    {
      id: "#ORD-5389",
      trackingNumber: "TRK-7239082",
      date: new Date("2023-04-01T09:30:00"),
      customer: {
        id: 4,
        name: "David Williams",
        email: "d.williams@example.com",
        phone: "(555) 876-5432",
      },
      items: [
        {
          id: 4,
          name: "Laptop Stand",
          price: 34.99,
          quantity: 1,
          imageUrl: "assets/images/laptopstand.jpg",
        },
      ],
      total: 34.99,
      status: "Cancelled",
      paymentMethod: "credit_card",
      shippingAddress: "101 Maple Dr, Rivertown, FL 33101",
    },
    {
      id: "#ORD-5388",
      trackingNumber: "TRK-7239081",
      date: new Date("2023-03-31T14:20:00"),
      customer: {
        id: 5,
        name: "Jessica Brown",
        email: "j.brown@example.com",
        phone: "(555) 345-6789",
      },
      items: [
        {
          id: 5,
          name: "Mechanical Keyboard",
          price: 149.99,
          quantity: 1,
          imageUrl: "assets/images/keyboard.jpg",
        },
        {
          id: 7,
          name: "Wireless Mouse",
          price: 45.99,
          quantity: 1,
          imageUrl: "assets/images/mouse.jpg",
        },
      ],
      total: 195.98,
      status: "Processing",
      paymentMethod: "bank_transfer",
      shippingAddress: "202 Elm St, Hillcrest, WA 98001",
    },
    {
      id: "#ORD-5387",
      trackingNumber: "TRK-7239080",
      date: new Date("2023-03-30T11:10:00"),
      customer: {
        id: 6,
        name: "Robert Garcia",
        email: "r.garcia@example.com",
        phone: "(555) 765-4321",
      },
      items: [
        {
          id: 6,
          name: "USB-C Hub",
          price: 59.99,
          quantity: 1,
          imageUrl: "assets/images/usbhub.jpg",
        },
      ],
      total: 59.99,
      status: "Completed",
      paymentMethod: "credit_card",
      shippingAddress: "303 Cedar Rd, Mountainview, CO 80001",
    },
    {
      id: "#ORD-5386",
      trackingNumber: "TRK-7239079",
      date: new Date("2023-03-30T08:45:00"),
      customer: {
        id: 7,
        name: "Amanda Lee",
        email: "a.lee@example.com",
        phone: "(555) 456-7890",
      },
      items: [
        {
          id: 7,
          name: "Wireless Mouse",
          price: 45.99,
          quantity: 1,
          imageUrl: "assets/images/mouse.jpg",
        },
        {
          id: 5,
          name: "Mechanical Keyboard",
          price: 149.99,
          quantity: 1,
          imageUrl: "assets/images/keyboard.jpg",
        },
        {
          id: 4,
          name: "Laptop Stand",
          price: 34.99,
          quantity: 1,
          imageUrl: "assets/images/laptopstand.jpg",
        },
      ],
      total: 230.97,
      status: "Refunded",
      paymentMethod: "paypal",
      shippingAddress: "404 Birch Ave, Seaside, OR 97001",
    },
  ]

  constructor() {}

  ngOnInit(): void {}

  setActiveTab(tab: string): void {
    this.activeTab = tab
  }

  getOrderCountByStatus(status: string): number {
    return this.orders.filter((order) => order.status === status).length
  }

  getTotalRevenue(): number {
    return this.orders
      .filter((order) => order.status !== "Cancelled" && order.status !== "Refunded")
      .reduce((sum, order) => sum + order.total, 0)
  }

  getFilteredOrders(): Order[] {
    let filtered = this.orders

    // Filter by active tab
    if (this.activeTab !== "all") {
      filtered = filtered.filter((order) => order.status.toLowerCase() === this.activeTab.toLowerCase())
    }

    // Filter by status if selected
    if (this.statusFilter) {
      filtered = filtered.filter((order) => order.status === this.statusFilter)
    }

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.customer.name.toLowerCase().includes(query) ||
          order.customer.email.toLowerCase().includes(query) ||
          order.trackingNumber.toLowerCase().includes(query),
      )
    }

    return filtered
  }

  getInitials(name: string): string {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
  }

  getPaymentMethodName(method: string): string {
    switch (method) {
      case "credit_card":
        return "Credit Card"
      case "paypal":
        return "PayPal"
      case "bank_transfer":
        return "Bank Transfer"
      default:
        return method
    }
  }

  trackByOrderId(index: number, order: Order): string {
    return order.id
  }
}
