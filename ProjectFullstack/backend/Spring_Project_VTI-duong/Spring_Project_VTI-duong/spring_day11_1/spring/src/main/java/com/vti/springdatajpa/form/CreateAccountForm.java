package com.vti.springdatajpa.form;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Data
public class CreateAccountForm {

    private String email;

    private String userName;

    private String fullName;

    private String password;

    private int departmentId;

    private int positionId;

    private String role ;

//    public enum Role {
//        USER("USER"), ADMIN("ADMIN");
//
//        private String value;
//
//        private Role(String value) {
//            this.value = value;
//        }
//
//        public String getValue() {
//            return value;
//        }
//    }

}
