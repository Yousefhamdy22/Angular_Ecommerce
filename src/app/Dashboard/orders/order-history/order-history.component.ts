import { Component , OnInit } from '@angular/core';

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  imageUrl: string
}

interface TimelineEvent {
  type: "ordered" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
  title: string
  date: Date
  description?: string
}

interface Order {
  id: string
  trackingNumber: string
  date: Date
  items: OrderItem[]
  total: number
  subtotal?: number
  tax?: number
  shipping?: number
  status: "Completed" | "Processing" | "Shipped" | "Cancelled" | "Refunded" | "Delivered"
  paymentMethod: "credit_card" | "paypal" | "bank_transfer"
  shippingAddress: string
  billingAddress?: string
  shippingMethod?: string
  estimatedDelivery?: Date
  lastFourDigits?: string
  notes?: string
  timeline: TimelineEvent[]
}

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  memberSince: Date
  loyaltyLevel: string
}
@Component({
  selector: 'app-order-history',
  standalone: false,
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  searchQuery = ""
  statusFilter = ""
  timeFilter = ""
  expandedOrders: Set<string> = new Set()

  customer: Customer = {
    id: 1,
    name: "Emma Thompson",
    email: "emma.t@example.com",
    phone: "(555) 123-4567",
    memberSince: new Date("2021-03-15"),
    loyaltyLevel: "Gold",
  }

  // Sample order data
  orders: Order[] = [
    {
      id: "#ORD-5392",
      trackingNumber: "TRK-7239085",
      date: new Date("2023-04-02T14:30:00"),
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
      tax: 10.4,
      shipping: 5.99,
      status: "Completed",
      paymentMethod: "credit_card",
      shippingAddress: "123 Main St, Anytown, CA 94103",
      lastFourDigits: "4567",
      timeline: [
        {
          type: "ordered",
          title: "Order Placed",
          date: new Date("2023-04-02T14:30:00"),
        },
        {
          type: "processing",
          title: "Processing",
          date: new Date("2023-04-02T15:45:00"),
          description: "Your order has been processed and is being prepared for shipment.",
        },
        {
          type: "shipped",
          title: "Shipped",
          date: new Date("2023-04-03T10:15:00"),
          description: "Your order has been shipped via USPS Priority Mail.",
        },
        {
          type: "delivered",
          title: "Delivered",
          date: new Date("2023-04-05T13:20:00"),
          description: "Your order has been delivered.",
        },
      ],
    },
    {
      id: "#ORD-5391",
      trackingNumber: "TRK-7239084",
      date: new Date("2023-03-25T10:15:00"),
      items: [
        {
          id: 3,
          name: "Smart Watch Series 7",
          price: 399.99,
          quantity: 1,
          imageUrl: "assets/images/smartwatch.jpg",
        },
        {
          id: 7,
          name: "Wireless Mouse",
          price: 45.99,
          quantity: 1,
          imageUrl: "assets/images/mouse.jpg",
        },
      ],
      total: 445.98,
      tax: 35.68,
      shipping: 0,
      status: "Completed",
      paymentMethod: "paypal",
      shippingAddress: "123 Main St, Anytown, CA 94103",
      timeline: [
        {
          type: "ordered",
          title: "Order Placed",
          date: new Date("2023-03-25T10:15:00"),
        },
        {
          type: "processing",
          title: "Processing",
          date: new Date("2023-03-25T11:30:00"),
        },
        {
          type: "shipped",
          title: "Shipped",
          date: new Date("2023-03-26T09:45:00"),
        },
        {
          type: "delivered",
          title: "Delivered",
          date: new Date("2023-03-28T14:20:00"),
        },
      ],
    },
    {
      id: "#ORD-5390",
      trackingNumber: "TRK-7239083",
      date: new Date("2023-03-15T16:45:00"),
      items: [
        {
          id: 2,
          name: "Bluetooth Speaker",
          price: 79.99,
          quantity: 1,
          imageUrl: "assets/images/speaker.jpg",
        },
        {
          id: 5,
          name: "Mechanical Keyboard",
          price: 149.99,
          quantity: 1,
          imageUrl: "assets/images/keyboard.jpg",
        },
        {
          id: 6,
          name: "USB-C Hub",
          price: 59.99,
          quantity: 2,
          imageUrl: "assets/images/usbhub.jpg",
        },
      ],
      total: 349.96,
      tax: 28.0,
      shipping: 8.99,
      status: "Shipped",
      paymentMethod: "credit_card",
      shippingAddress: "123 Main St, Anytown, CA 94103",
      lastFourDigits: "8901",
      estimatedDelivery: new Date("2023-03-20"),
      timeline: [
        {
          type: "ordered",
          title: "Order Placed",
          date: new Date("2023-03-15T16:45:00"),
        },
        {
          type: "processing",
          title: "Processing",
          date: new Date("2023-03-16T09:30:00"),
        },
        {
          type: "shipped",
          title: "Shipped",
          date: new Date("2023-03-17T11:15:00"),
          description: "Your order has been shipped via FedEx Ground.",
        },
      ],
    },
    {
      id: "#ORD-5389",
      trackingNumber: "TRK-7239082",
      date: new Date("2023-02-28T09:30:00"),
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
      shippingAddress: "123 Main St, Anytown, CA 94103",
      lastFourDigits: "4567",
      timeline: [
        {
          type: "ordered",
          title: "Order Placed",
          date: new Date("2023-02-28T09:30:00"),
        },
        {
          type: "processing",
          title: "Processing",
          date: new Date("2023-02-28T10:45:00"),
        },
        {
          type: "cancelled",
          title: "Cancelled",
          date: new Date("2023-03-01T14:20:00"),
          description: "Order cancelled at customer's request.",
        },
      ],
    },
    {
      id: "#ORD-5388",
      trackingNumber: "TRK-7239081",
      date: new Date("2023-02-15T14:20:00"),
      items: [
        {
          id: 5,
          name: "Mechanical Keyboard",
          price: 149.99,
          quantity: 1,
          imageUrl: "assets/images/keyboard.jpg",
        },
      ],
      total: 149.99,
      tax: 12.0,
      shipping: 5.99,
      status: "Refunded",
      paymentMethod: "credit_card",
      shippingAddress: "123 Main St, Anytown, CA 94103",
      lastFourDigits: "4567",
      timeline: [
        {
          type: "ordered",
          title: "Order Placed",
          date: new Date("2023-02-15T14:20:00"),
        },
        {
          type: "processing",
          title: "Processing",
          date: new Date("2023-02-15T15:30:00"),
        },
        {
          type: "shipped",
          title: "Shipped",
          date: new Date("2023-02-16T11:45:00"),
        },
        {
          type: "delivered",
          title: "Delivered",
          date: new Date("2023-02-18T13:20:00"),
        },
        {
          type: "refunded",
          title: "Refunded",
          date: new Date("2023-02-22T10:15:00"),
          description: "Refund processed for returned item.",
        },
      ],
    },
  ]

  constructor() {}

  ngOnInit(): void {}

  getFilteredOrders(): Order[] {
    let filtered = this.orders

    // Filter by status if selected
    if (this.statusFilter) {
      filtered = filtered.filter((order) => order.status === this.statusFilter)
    }

    // Filter by time period if selected
    if (this.timeFilter) {
      const days = Number.parseInt(this.timeFilter)
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - days)
      filtered = filtered.filter((order) => order.date >= cutoffDate)
    }

    // Filter by search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.trackingNumber.toLowerCase().includes(query) ||
          order.items.some((item) => item.name.toLowerCase().includes(query)),
      )
    }

    return filtered
  }

  getTotalSpent(): number {
    return this.orders
      .filter((order) => order.status !== "Cancelled" && order.status !== "Refunded")
      .reduce((sum, order) => sum + order.total, 0)
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

  getShippingAddressShort(address: string): string {
    // Extract just the city and state from the address
    const parts = address.split(",")
    if (parts.length >= 2) {
      return parts[parts.length - 2].trim() + ", " + parts[parts.length - 1].trim()
    }
    return address
  }

  toggleOrderDetails(orderId: string): void {
    if (this.expandedOrders.has(orderId)) {
      this.expandedOrders.delete(orderId)
    } else {
      this.expandedOrders.add(orderId)
    }
  }

  isOrderExpanded(orderId: string): boolean {
    return this.expandedOrders.has(orderId)
  }

  getOrderSubtotal(order: Order): number {
    if (order.subtotal) return order.subtotal

    return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  canReorder(order: Order): boolean {
    return order.status === "Completed" || order.status === "Delivered"
  }

  trackByOrderId(index: number, order: Order): string {
    return order.id
  }
}
