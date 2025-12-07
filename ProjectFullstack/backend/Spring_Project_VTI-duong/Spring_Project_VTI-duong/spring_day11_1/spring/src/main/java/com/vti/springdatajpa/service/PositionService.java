package com.vti.springdatajpa.service;

import com.vti.springdatajpa.dto.PositionDto;
import com.vti.springdatajpa.entity.PositionEntity;
import com.vti.springdatajpa.entity.PositionName;

import java.util.List;

public interface PositionService {
    public PositionEntity getPositionById(int id) ;

    public List<PositionEntity> getAllPosition();

    public List<PositionEntity> getPositionByName(String name);

    public PositionDto createPosition(PositionDto positionDto);

    public void updatePosition(int id, PositionDto positionDto);

    public void deletePositionByid(int id);
//
//    public void deletePositionByName(PositionDto positionDto);
}
