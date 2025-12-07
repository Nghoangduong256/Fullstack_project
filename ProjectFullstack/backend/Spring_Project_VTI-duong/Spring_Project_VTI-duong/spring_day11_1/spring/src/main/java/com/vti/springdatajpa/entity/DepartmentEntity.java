package com.vti.springdatajpa.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "Department")
public class DepartmentEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", length = 30, nullable = false)
    private String name;

    @Column(name = "totalMember")
    private int totalMember;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private Type type;
//    @OneToMany(mappedBy = "department")
//    private List<AccountEntity> accounts;

    @Column(name = "created_date")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    public DepartmentEntity() {

    }

    // taọ enum type
    public enum Type {
        DEV("Dev"), TEST("Test");

        private String value;

        private Type(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }


}
