package com.exam.backend.repository;

import com.exam.backend.entity.OrderLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderLineRepository extends JpaRepository<OrderLine, Integer> {

    List<OrderLine> findByOrder_Id(Integer orderId);

    Optional<OrderLine> findByIdAndOrder_Id(Integer id, Integer orderId);
}
