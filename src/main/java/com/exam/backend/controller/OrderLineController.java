package com.exam.backend.controller;

import com.exam.backend.entity.OrderLine;
import com.exam.backend.repository.OrderLineRepository;
import com.exam.backend.repository.OrderRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders/{orderId}/lines")
@Tag(name = "Order Lines")
public class OrderLineController {

    private final OrderLineRepository orderLineRepository;
    private final OrderRepository orderRepository;

    public OrderLineController(OrderLineRepository orderLineRepository, OrderRepository orderRepository) {
        this.orderLineRepository = orderLineRepository;
        this.orderRepository = orderRepository;
    }

    @PostMapping
    public ResponseEntity<OrderLine> createOrderLine(@PathVariable Integer orderId,
                                                     @Valid @RequestBody OrderLine orderLine) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    orderLine.setId(null);
                    orderLine.setOrder(order);
                    return ResponseEntity.ok(orderLineRepository.save(orderLine));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<OrderLine>> getAllOrderLines(@PathVariable Integer orderId) {
        if (!orderRepository.existsById(orderId)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orderLineRepository.findByOrder_Id(orderId));
    }

    @GetMapping("/{lineId}")
    public ResponseEntity<OrderLine> getOrderLineById(@PathVariable Integer orderId,
                                                      @PathVariable Integer lineId) {
        if (!orderRepository.existsById(orderId)) {
            return ResponseEntity.notFound().build();
        }
        return orderLineRepository.findByIdAndOrder_Id(lineId, orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{orderLineId}")
    public ResponseEntity<Void> deleteOrderLine(@PathVariable Integer orderId,
                                                @PathVariable Integer orderLineId) {
        if (!orderRepository.existsById(orderId)) {
            return ResponseEntity.notFound().build();
        }
        return orderLineRepository.findByIdAndOrder_Id(orderLineId, orderId)
                .map(orderLine -> {
                    orderLineRepository.delete(orderLine);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
