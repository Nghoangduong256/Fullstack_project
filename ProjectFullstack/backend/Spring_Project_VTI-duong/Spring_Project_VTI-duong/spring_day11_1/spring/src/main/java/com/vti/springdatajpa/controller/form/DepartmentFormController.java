//package com.vti.springdatajpa.controller.form;
//
//import com.vti.springdatajpa.entity.DepartmentEntity;
//import com.vti.springdatajpa.form.CreateDepartmentForm;
//import com.vti.springdatajpa.form.UpdateDepartmentForm;
//import com.vti.springdatajpa.service.DepartmentService;
//import jakarta.validation.Valid;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping(value = "api/v1/departments/form")
//@Validated
//public class DepartmentFormController {
//
//    // Call service
//    @Autowired
//    private DepartmentService departmentService;
//
//    @Autowired
//    private ModelMapper modelMapper;
//
//    @PostMapping
//    public void createDepartment(@RequestBody @Valid CreateDepartmentForm form) {
//
//        // convert form to entity
//        DepartmentEntity department = modelMapper.map(form, DepartmentEntity.class);
//
//        // departmentService.createDepartment(department);
//
//        departmentService.createDepartmentIncludeAccount(form);
//    }
//
//    @PutMapping(value = "/{id}")
//    public void updateDepartment(@PathVariable(name = "id") int id,
//                                @RequestBody @Valid  UpdateDepartmentForm form) {
//        form.setId(id);
//
//        // convert form to entity
//        DepartmentEntity department = modelMapper.map(form, DepartmentEntity.class);
//
//        departmentService.updateDepartment(department);
//
//    }
//
//    @DeleteMapping(value = "/{id}")
//    public void deleteDepartment(@PathVariable(name = "id") int id) {
//        departmentService.deleteDepartment(id);
//
//    }
//}
