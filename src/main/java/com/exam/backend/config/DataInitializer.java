package com.exam.backend.config;

import com.exam.backend.entity.Attachment;
import com.exam.backend.entity.Order;
import com.exam.backend.entity.OrderLine;
import com.exam.backend.repository.AttachmentRepository;
import com.exam.backend.repository.OrderLineRepository;
import com.exam.backend.repository.OrderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final OrderRepository orderRepository;
    private final OrderLineRepository orderLineRepository;
    private final AttachmentRepository attachmentRepository;

    public DataInitializer(OrderRepository orderRepository,
                           OrderLineRepository orderLineRepository,
                           AttachmentRepository attachmentRepository) {
        this.orderRepository = orderRepository;
        this.orderLineRepository = orderLineRepository;
        this.attachmentRepository = attachmentRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (orderLineRepository.count() > 0) {
            return;
        }

        attachmentRepository.deleteAll();
        orderLineRepository.deleteAll();
        orderRepository.deleteAll();

        Order order1 = orderRepository.save(new Order(LocalDateTime.of(2026, 6, 18, 9, 30), "PENDING"));
        Order order2 = orderRepository.save(new Order(LocalDateTime.of(2026, 6, 19, 14, 15), "CONFIRMED"));

        saveLine(order1, "Laptop Dell XPS", 1, 1299.99);
        saveLine(order1, "Wireless Mouse", 2, 29.50);
        saveLine(order1, "USB-C Hub", 1, 45.00);

        saveLine(order2, "Office Chair", 3, 189.99);
        saveLine(order2, "Desk Lamp", 2, 34.75);

        saveAttachment(order1, "pdf", "http://files.example.com/order1-invoice.pdf");
        saveAttachment(order1, "image", "http://files.example.com/order1-receipt.png");
        saveAttachment(order2, "word", "http://files.example.com/order2-contract.docx");
        saveAttachment(order2, "pdf", "http://files.example.com/order2-delivery.pdf");
    }

    private void saveLine(Order order, String designation, int quantity, double price) {
        OrderLine line = new OrderLine(designation, quantity, price);
        line.setOrder(order);
        orderLineRepository.save(line);
    }

    private void saveAttachment(Order order, String typeFile, String urlFile) {
        Attachment attachment = new Attachment(typeFile, urlFile);
        attachment.setOrder(order);
        attachmentRepository.save(attachment);
    }
}
