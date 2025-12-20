package com.vti.springdatajpa.controller;

import com.vti.springdatajpa.dto.PositionDto;
import com.vti.springdatajpa.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/v1/position")
@CrossOrigin("*")
public class PositionController {

    @Autowired
    private PositionService positionService;

    //Get all position
    @GetMapping
    public ResponseEntity<?> getAllPosition () {
        return new ResponseEntity<>(positionService.getAllPosition(), HttpStatus.OK);
    }

    //Get position by id
    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getPositionByid (@PathVariable(name = "id") int id){
        return new ResponseEntity<>(positionService.getPositionById(id), HttpStatus.OK);
    }

    //Get position by name
    @GetMapping(value = {"/name/{name}"})
    public ResponseEntity<?> getPositionByName (@PathVariable(name = "name") String name) {
        return new ResponseEntity<>(positionService.getPositionByName(name), HttpStatus.OK);
    }

    //Create position
    @PostMapping
    public ResponseEntity<?> createPosition (@RequestBody PositionDto positionDto){
        PositionDto created = positionService.createPosition(positionDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    //Update position
    @PutMapping(value = "/{id}")
    public ResponseEntity<?> updatePosition (@PathVariable(value = "id") int id,
                                             @RequestBody PositionDto positionDto){
        positionService.updatePosition(id, positionDto);
        return new ResponseEntity<>("Update position success", HttpStatus.OK);
    }

    //Delete position
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deletePosition (@PathVariable(value = "id") int id){
        positionService.deletePositionByid(id);
        return new ResponseEntity<>("Delete position success", HttpStatus.OK);
    }

}
