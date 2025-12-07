package com.vti.springdatajpa.specification;

import com.vti.springdatajpa.entity.AccountEntity;
import org.springframework.data.jpa.domain.Specification;

public class AccountSpecification {

    public static Specification<AccountEntity> buildWhere(String search) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(root.get("username"), "%" + search + "%");
    }
}
