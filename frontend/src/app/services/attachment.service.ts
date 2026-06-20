import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AttachmentsService as GeneratedAttachmentsService } from '../api/services/attachments.service';
import { Attachment } from '../models/order.model';

/** Facade over Swagger-generated AttachmentsService — regenerate via `npm run sync:api` */
@Injectable({ providedIn: 'root' })
export class AttachmentService {
  constructor(private api: GeneratedAttachmentsService) {}

  getAll(orderId: number): Observable<Attachment[]> {
    return from(this.api.getAllAttachments({ orderId }));
  }

  create(orderId: number, attachment: Attachment): Observable<Attachment> {
    return from(this.api.createAttachment({ orderId, body: attachment }));
  }

  delete(orderId: number, attachmentId: number): Observable<void> {
    return from(this.api.deleteAttachment({ orderId, attachemetsid: attachmentId }));
  }
}
