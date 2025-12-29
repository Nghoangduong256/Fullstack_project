package com.vti.springdatajpa.entity;

import com.vti.springdatajpa.dto.AccountDto;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.swing.text.Position;
import java.util.Date;

@Data
@Table(name = "Account")
@Entity
public class AccountEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "email", length = 50, nullable = false, unique = true)
    private String email;

    @Column(name = "username", length = 50, nullable = false, unique = true)
    private String userName;

    @Column(name = "full_name", length = 50, nullable = false)
    private String fullName;

    @Column(name = "department_id", nullable = false)
    private int departmentId;

    @Column(name = "position_id", nullable = false)
    private int positionId;

    @Column(name = "created_date")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    @Column(name = "password", length = 500)
    private String password;

    @Column(name = "role")
    private String role = "ROLE_USER";

}
