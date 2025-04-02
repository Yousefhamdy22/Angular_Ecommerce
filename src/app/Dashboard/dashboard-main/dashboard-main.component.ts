import { Component  , OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-main',
  standalone: false,
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.css'
})
export class DashboardMainComponent implements OnInit {
  // Essential Data
  metrics = [
    { icon: 'shopping_cart', label: 'Total Orders', value: '1,245', change: '+12%' },
    { icon: 'attach_money', label: 'Revenue', value: '$28,450', change: '+8%' },
    { icon: 'people', label: 'New Customers', value: '86', change: '+5%' },
    { icon: 'star', label: 'Conversion', value: '3.2%', change: '-0.5%' }
  ];

 
  // Optional Data
  recentOrders = [
    { id: 1, customer: 'John Doe', total: '$150.00', status: 'Shipped', date: new Date() },
    { id: 2, customer: 'Jane Smith', total: '$200.00', status: 'Pending', date: new Date() },
    { id: 3, customer: 'Bob Johnson', total: '$300.00', status: 'Delivered', date: new Date() }
  ];

  orders = [
    {
      id: 1,
      date: '2024-04-02',
      productImg: 'https://via.placeholder.com/50', 
      customer: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890'
    },
    {
      id: 2,
      date: '2024-04-01',
      productImg: 'https://via.placeholder.com/50',
      customer: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+0987654321'
    },
    {
      id: 3,
      date: '2024-03-30',
      productImg: 'https://via.placeholder.com/50',
      customer: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      phone: '+1122334455'
    }
  ];
  
  ngOnInit() {
    // Initialize real-time updates if needed
  }
}


