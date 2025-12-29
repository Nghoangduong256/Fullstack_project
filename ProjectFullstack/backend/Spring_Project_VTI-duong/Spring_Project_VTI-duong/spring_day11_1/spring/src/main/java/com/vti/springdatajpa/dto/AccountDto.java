package com.vti.springdatajpa.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
//import com.vti.springdatajpa.entity.DepartmentEntity;
//import com.vti.springdatajpa.entity.PositionEntity;
import com.vti.springdatajpa.entity.AccountEntity;
import com.vti.springdatajpa.entity.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.swing.text.Position;
import java.util.Date;

@Data
@RequiredArgsConstructor
public class AccountDto {

    private int id;

    private String userName;

    private String fullName;

    private int departmentId;

    private int positionId;

    private String email;

    private Date createDate;

    private String role;


}
