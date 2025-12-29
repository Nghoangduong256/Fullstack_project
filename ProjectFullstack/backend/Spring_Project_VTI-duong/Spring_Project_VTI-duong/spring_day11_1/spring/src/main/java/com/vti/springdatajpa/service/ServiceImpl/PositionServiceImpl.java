package com.vti.springdatajpa.service.ServiceImpl;

//import com.vti.springdatajpa.entity.PositionEntity;
import com.vti.springdatajpa.dto.PositionDto;
import com.vti.springdatajpa.entity.PositionEntity;
import com.vti.springdatajpa.entity.PositionName;
import com.vti.springdatajpa.repository.PositionRepository;
import com.vti.springdatajpa.service.PositionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionServiceImpl implements PositionService {

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public PositionEntity getPositionById(int id) {
        return  positionRepository.findById(id).orElseThrow(() -> new RuntimeException("Position not found"));
    }

    @Override
    public List<PositionEntity> getAllPosition() {
        return positionRepository.findAll();
    }

    @Override
    public List<PositionEntity> getPositionByName(String name) {
        return positionRepository.findByName(name);
    }

    @Override
    public PositionDto createPosition(PositionDto positionDto) {
        // Chuyển String -> Enum
        PositionName enumName;
        try {
            enumName = PositionName.valueOf(positionDto.getName().toUpperCase());
        } catch (IllegalArgumentException exception){
            throw new RuntimeException("Invalid position name: " + positionDto.getName());
        }

        // Tạo entity mới đồng thời tạo ENUM mới
        PositionEntity positionEntity = new PositionEntity();
        positionEntity.setName(enumName);
        positionRepository.save(positionEntity);

        // trả về DTO
        PositionDto result = new PositionDto();
        result.setName(positionEntity.getName().name());
        return result;
    }

    @Override
    public void updatePosition(int id, PositionDto positionDto) {
        PositionEntity positionEntity = positionRepository.findById(id).orElseThrow(() -> new RuntimeException("Position not found"));
        positionEntity.setName(PositionName.valueOf(positionDto.getName()));
        positionRepository.save(positionEntity);
    }

    @Override
    public void deletePositionByid(int id) {
        if(!positionRepository.existsById(id)){
            throw new RuntimeException("Position not found");
        }

        positionRepository.deleteById(id);
    }



}
