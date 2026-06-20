import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { OrderLineService } from '../../services/order-line.service';
import { AttachmentService } from '../../services/attachment.service';
import { Order, OrderLine, Attachment } from '../../models/order.model';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: number | null = null;
  order: Order = { dateOrder: '', status: 'PENDING' };
  isNew = true;
  loading = false;

  orderLines: OrderLine[] = [];
  newLine: OrderLine = { designation: '', quantity: 1, price: 0 };

  attachments: Attachment[] = [];
  newAttachment: Attachment = { typeFile: '', urlFile: '' };

  toastMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private orderLineService: OrderLineService,
    private attachmentService: AttachmentService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.orderId = Number(idParam);
      this.isNew = false;
      this.loading = true;
      this.loadOrder();
      this.loadOrderLines();
      this.loadAttachments();
    } else {
      this.order.dateOrder = this.toDateTimeLocalValue(new Date());
    }
  }

  get orderTotal(): number {
    return this.orderLines.reduce((sum, line) => sum + line.quantity * line.price, 0);
  }

  getStatusClass(status: string | undefined): string {
    return 'badge-' + (status ?? 'pending').toLowerCase();
  }

  getFileIcon(type: string): string {
    switch (type.toLowerCase()) {
      case 'pdf': return '📕';
      case 'image': return '🖼️';
      case 'word': return '📝';
      default: return '📄';
    }
  }

  private toDateTimeLocalValue(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  private toApiDateTime(value: string): string {
    return value.length === 16 ? `${value}:00` : value;
  }

  loadOrder(): void {
    if (this.orderId) {
      this.orderService.getById(this.orderId).subscribe({
        next: data => {
          this.order = data;
          this.order.dateOrder = data.dateOrder?.substring(0, 16) ?? '';
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.showError('Order not found');
        }
      });
    }
  }

  loadOrderLines(): void {
    if (this.orderId) {
      this.orderLineService.getAll(this.orderId).subscribe(data => this.orderLines = data);
    }
  }

  loadAttachments(): void {
    if (this.orderId) {
      this.attachmentService.getAll(this.orderId).subscribe(data => this.attachments = data);
    }
  }

  saveOrder(): void {
    const payload: Order = {
      ...this.order,
      dateOrder: this.toApiDateTime(this.order.dateOrder)
    };

    if (this.isNew) {
      this.orderService.create(payload).subscribe({
        next: order => {
          this.orderId = order.id!;
          this.isNew = false;
          this.showToast('Order created successfully');
          this.router.navigate(['/orders', this.orderId]);
        },
        error: () => this.showError('Failed to create order')
      });
    } else if (this.orderId) {
      this.orderService.update(this.orderId, payload).subscribe({
        next: () => this.showToast('Order updated successfully'),
        error: () => this.showError('Failed to update order')
      });
    }
  }

  addOrderLine(): void {
    if (this.orderId && this.newLine.designation) {
      this.orderLineService.create(this.orderId, this.newLine).subscribe({
        next: () => {
          this.newLine = { designation: '', quantity: 1, price: 0 };
          this.loadOrderLines();
          this.showToast('Order line added');
        },
        error: () => this.showError('Failed to add order line')
      });
    }
  }

  deleteOrderLine(lineId: number): void {
    if (this.orderId && confirm('Delete this order line?')) {
      this.orderLineService.delete(this.orderId, lineId).subscribe({
        next: () => {
          this.loadOrderLines();
          this.showToast('Order line deleted');
        },
        error: () => this.showError('Failed to delete order line')
      });
    }
  }

  addAttachment(): void {
    if (this.orderId && this.newAttachment.typeFile && this.newAttachment.urlFile) {
      this.attachmentService.create(this.orderId, this.newAttachment).subscribe({
        next: () => {
          this.newAttachment = { typeFile: '', urlFile: '' };
          this.loadAttachments();
          this.showToast('Attachment added');
        },
        error: () => this.showError('Failed to add attachment')
      });
    }
  }

  deleteAttachment(attachmentId: number): void {
    if (this.orderId && confirm('Delete this attachment?')) {
      this.attachmentService.delete(this.orderId, attachmentId).subscribe({
        next: () => {
          this.loadAttachments();
          this.showToast('Attachment deleted');
        },
        error: () => this.showError('Failed to delete attachment')
      });
    }
  }

  back(): void {
    this.router.navigate(['/']);
  }

  private showToast(message: string): void {
    this.errorMessage = '';
    this.toastMessage = message;
    setTimeout(() => this.toastMessage = '', 3000);
  }

  private showError(message: string): void {
    this.toastMessage = '';
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 4000);
  }
}
