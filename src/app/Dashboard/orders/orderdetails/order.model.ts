export interface Order {
    id: string;
    date: Date;
    status: string;
    paymentMethod: string;
    tax: number;
    total: number;
    customer: {
      name: string;
      email: string;
      phone: string;
    };
    items: {
      name: string;
      quantity: number;
      price: number;
    }[];
  }
  