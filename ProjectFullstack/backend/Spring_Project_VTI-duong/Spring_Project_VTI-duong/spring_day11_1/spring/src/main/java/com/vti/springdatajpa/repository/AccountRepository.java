package com.vti.springdatajpa.repository;

import com.vti.springdatajpa.dto.AccountDto;
import com.vti.springdatajpa.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<AccountEntity, Integer>
        , JpaSpecificationExecutor<AccountEntity> {

    @Query(value = "SELECT a.id, a.username, a.full_name, a.department_id, a.position_id, a.email, a.created_date, a.role"
            + " FROM Account a"
            , nativeQuery = true)
    List<Object[]> findAllAccount();

    @Query(value = "a.id, a.username, a.full_name, a.department_id, a.position_id, a.email, a.created_date, a.role"
            + " FROM Account a"
            + " where a.id = :id"
            , nativeQuery = true)
    Object findByAccountId(@Param("id") int id);

    @Query(value = "SELECT a.id, a.username, a.full_name, a.department_id, a.position_id, a.email, a.created_date, a.role"
            + " FROM Account a"
            + " where a.username like %:name% or a.full_name like %:name%"
            , nativeQuery = true)
    List<Object[]> findByAccountName(@Param("name") String name);

//    AccountEntity findByUserName(String username);

    Optional<AccountEntity> findByUserName(String username);
}
