import { Component  , Input} from '@angular/core';
import { Order } from './order.model';

@Component({
  selector: 'app-orderdetails',
  standalone: false ,
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent {
  @Input() selectedOrder!: Order; // Assuming it's passed from parent

  getOrderStatusBadgeColor(status: string): string {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
