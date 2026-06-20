import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  toastMessage = '';

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  get pendingCount(): number {
    return this.orders.filter(o => o.status === 'PENDING').length;
  }

  get confirmedCount(): number {
    return this.orders.filter(o => o.status === 'CONFIRMED').length;
  }

  getStatusClass(status: string | undefined): string {
    return 'badge-' + (status ?? 'pending').toLowerCase();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getAll().subscribe({
      next: data => {
        this.orders = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showToast('Failed to load orders. Is the backend running?');
      }
    });
  }

  addOrder(): void {
    this.router.navigate(['/orders/new']);
  }

  editOrder(id: number): void {
    this.router.navigate([`/orders/${id}`]);
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.delete(id).subscribe({
        next: () => {
          this.showToast('Order deleted successfully');
          this.loadOrders();
        },
        error: () => this.showToast('Failed to delete order')
      });
    }
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => this.toastMessage = '', 3000);
  }
}
