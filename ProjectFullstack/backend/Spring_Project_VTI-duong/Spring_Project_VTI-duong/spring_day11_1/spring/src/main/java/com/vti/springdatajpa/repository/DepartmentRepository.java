package com.vti.springdatajpa.repository;

import com.vti.springdatajpa.dto.DepartmentDto;
import com.vti.springdatajpa.entity.DepartmentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DepartmentRepository  extends JpaRepository<DepartmentEntity, Integer>{
    @Query(value = "select * from Department where name like %:name%", nativeQuery = true)
    List<DepartmentEntity> findByName (@Param("name") String name);
}
