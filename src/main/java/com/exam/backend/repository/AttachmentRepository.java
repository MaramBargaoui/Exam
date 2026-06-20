package com.exam.backend.repository;

import com.exam.backend.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachment, Integer> {

    List<Attachment> findByOrder_Id(Integer orderId);

    Optional<Attachment> findByIdAndOrder_Id(Integer id, Integer orderId);
}
