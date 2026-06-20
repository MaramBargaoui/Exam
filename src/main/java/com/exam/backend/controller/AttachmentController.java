package com.exam.backend.controller;

import com.exam.backend.entity.Attachment;
import com.exam.backend.repository.AttachmentRepository;
import com.exam.backend.repository.OrderRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders/{orderId}/attachemets")
@Tag(name = "Attachments")
public class AttachmentController {

    private final AttachmentRepository attachmentRepository;
    private final OrderRepository orderRepository;

    public AttachmentController(AttachmentRepository attachmentRepository, OrderRepository orderRepository) {
        this.attachmentRepository = attachmentRepository;
        this.orderRepository = orderRepository;
    }

    @PostMapping
    public ResponseEntity<Attachment> createAttachment(@PathVariable Integer orderId,
                                                       @Valid @RequestBody Attachment attachment) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    attachment.setId(null);
                    attachment.setOrder(order);
                    return ResponseEntity.ok(attachmentRepository.save(attachment));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Attachment>> getAllAttachments(@PathVariable Integer orderId) {
        if (!orderRepository.existsById(orderId)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(attachmentRepository.findByOrder_Id(orderId));
    }

    @GetMapping("/{attachemetsid}")
    public ResponseEntity<Attachment> getAttachmentById(@PathVariable Integer orderId,
                                                        @PathVariable Integer attachemetsid) {
        if (!orderRepository.existsById(orderId)) {
            return ResponseEntity.notFound().build();
        }
        return attachmentRepository.findByIdAndOrder_Id(attachemetsid, orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{attachemetsid}")
    public ResponseEntity<Void> deleteAttachment(@PathVariable Integer orderId,
                                                 @PathVariable Integer attachemetsid) {
        if (!orderRepository.existsById(orderId)) {
            return ResponseEntity.notFound().build();
        }
        return attachmentRepository.findByIdAndOrder_Id(attachemetsid, orderId)
                .map(attachment -> {
                    attachmentRepository.delete(attachment);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
