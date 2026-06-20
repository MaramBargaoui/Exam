import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderLine } from '../models/order.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderLineService {
  private baseUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getAll(orderId: number): Observable<OrderLine[]> {
    return this.http.get<OrderLine[]>(`${this.baseUrl}/${orderId}/lines`);
  }

  create(orderId: number, line: OrderLine): Observable<OrderLine> {
    return this.http.post<OrderLine>(`${this.baseUrl}/${orderId}/lines`, line);
  }

  delete(orderId: number, lineId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${orderId}/lines/${lineId}`);
  }
}
