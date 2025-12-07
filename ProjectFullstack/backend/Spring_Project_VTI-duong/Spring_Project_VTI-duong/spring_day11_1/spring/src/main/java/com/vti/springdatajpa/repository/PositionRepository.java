package com.vti.springdatajpa.repository;

import com.vti.springdatajpa.entity.DepartmentEntity;
import com.vti.springdatajpa.entity.PositionEntity;
import com.vti.springdatajpa.entity.PositionName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PositionRepository extends JpaRepository<PositionEntity, Integer> {

    @Query(value = "select * from Position where name like %:name%", nativeQuery = true)
    List<PositionEntity> findByName (@Param("name") String name);

}
