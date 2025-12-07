package com.vti.springdatajpa.service.ServiceImpl;

import com.vti.springdatajpa.dto.DepartmentDto;
import com.vti.springdatajpa.entity.DepartmentEntity;
import com.vti.springdatajpa.entity.PositionName;
import com.vti.springdatajpa.repository.DepartmentRepository;
import com.vti.springdatajpa.service.DepartmentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<DepartmentEntity> getAllDepertment() {
        return departmentRepository.findAll();
    }

    @Override
    public Page<DepartmentDto> getDepartmentsByPage(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);

        Page<DepartmentEntity> departmentEntities = departmentRepository.findAll(pageable);

        return departmentEntities.map(entity -> modelMapper.map(entity, DepartmentDto.class));
    }

    @Override
    public DepartmentEntity getDepartmentById(int id) {
        return departmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Department not found"));
    }

    @Override
    public List<DepartmentEntity> getDepartmentByName(String name) {
        return departmentRepository.findByName(name);
    }

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        DepartmentEntity departmentEntity = modelMapper.map(departmentDto, DepartmentEntity.class);
        DepartmentEntity saved = departmentRepository.save(departmentEntity);
        return modelMapper.map(saved, DepartmentDto.class);
    }

    @Override
    public void updateDepartment(DepartmentDto departmentDto, int id) {
        //validate
        DepartmentEntity departmentEntity = departmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Department not found")) ;

        // Thiết lập trường cần update
        departmentEntity.setName(departmentDto.getName());
        departmentEntity.setTotalMember(departmentDto.getTotalMember());

        DepartmentEntity updated = departmentRepository.save(departmentEntity);
        modelMapper.map(updated, DepartmentDto.class);
    }

    @Override
    public void deleteDepartment(int id) {
        //validate
        if (!departmentRepository.existsById(id)){
            throw new RuntimeException("Department not found");
        }

        departmentRepository.deleteById(id);
    }
}
