import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { OrdersService as GeneratedOrdersService } from '../api/services/orders.service';
import { Order } from '../models/order.model';

/** Facade over Swagger-generated OrdersService — regenerate via `npm run sync:api` */
@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private api: GeneratedOrdersService) {}

  getAll(): Observable<Order[]> {
    return from(this.api.getAllOrders());
  }

  getById(id: number): Observable<Order> {
    return from(this.api.getOrderById({ orderId: id }));
  }

  create(order: Order): Observable<Order> {
    return from(this.api.createOrder({ body: order }));
  }

  update(id: number, order: Order): Observable<Order> {
    return from(this.api.updateOrder({ orderId: id, body: order }));
  }

  delete(id: number): Observable<void> {
    return from(this.api.deleteOrder({ orderId: id }));
  }
}
