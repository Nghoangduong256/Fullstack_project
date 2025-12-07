package com.vti.springdatajpa.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "Position")
public class PositionEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false)
    @Enumerated(EnumType.STRING)
    private PositionName name;



    public PositionEntity() {

    }


}
