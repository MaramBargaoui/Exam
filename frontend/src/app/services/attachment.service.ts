import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attachment } from '../models/order.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AttachmentService {
  private baseUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getAll(orderId: number): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(`${this.baseUrl}/${orderId}/attachemets`);
  }

  create(orderId: number, attachment: Attachment): Observable<Attachment> {
    return this.http.post<Attachment>(`${this.baseUrl}/${orderId}/attachemets`, attachment);
  }

  delete(orderId: number, attachmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${orderId}/attachemets/${attachmentId}`);
  }
}
