package com.vti.springdatajpa.controller;


import com.vti.springdatajpa.dto.AccountDto;
import com.vti.springdatajpa.dto.DepartmentDto;
import com.vti.springdatajpa.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "api/v1/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    //get all department
    @GetMapping
    public ResponseEntity<?> getAllDepartment() {
        return new ResponseEntity<>(departmentService.getAllDepertment(), HttpStatus.OK);
    }

    //pagination
    @GetMapping("/page")
    public Page<DepartmentDto> getDepartmentsByPage(
            @RequestParam (name = "page", defaultValue = "0") int page,
            @RequestParam (name = "limit", defaultValue = "10") int limit) {
        return departmentService.getDepartmentsByPage(page, limit);
    };

    //get department by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getDepartmentById(@PathVariable(name = "id") int id) {
        return new ResponseEntity<>(departmentService.getDepartmentById(id), HttpStatus.OK);
    }

    //get department by name
    @GetMapping("/name/{name}")
    public ResponseEntity<?> getDepartmentByName(@PathVariable(name = "name") String name){
        return new ResponseEntity<>(departmentService.getDepartmentByName(name), HttpStatus.OK);
    }

    //create department
    @PostMapping
    public ResponseEntity<?> createDepartment(@RequestBody DepartmentDto departmentDto) {
        DepartmentDto created = departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    //update department
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDepartment(@RequestBody DepartmentDto departmentDto,
                                              @PathVariable(name = "id") int id) {
        departmentService.updateDepartment(departmentDto, id);
        return new ResponseEntity<>("Update department success", HttpStatus.OK);
    }

    //delete department
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDepartment(@PathVariable(name = "id") int id) {
        departmentService.deleteDepartment(id);
        return new ResponseEntity<>("Delete account success", HttpStatus.OK);
    }
}
