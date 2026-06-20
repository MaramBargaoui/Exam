import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { OrderLinesService as GeneratedOrderLinesService } from '../api/services/order-lines.service';
import { OrderLine } from '../models/order.model';

/** Facade over Swagger-generated OrderLinesService — regenerate via `npm run sync:api` */
@Injectable({ providedIn: 'root' })
export class OrderLineService {
  constructor(private api: GeneratedOrderLinesService) {}

  getAll(orderId: number): Observable<OrderLine[]> {
    return from(this.api.getAllOrderLines({ orderId }));
  }

  create(orderId: number, line: OrderLine): Observable<OrderLine> {
    return from(this.api.createOrderLine({ orderId, body: line }));
  }

  delete(orderId: number, lineId: number): Observable<void> {
    return from(this.api.deleteOrderLine({ orderId, orderLineId: lineId }));
  }
}
