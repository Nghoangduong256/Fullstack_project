package com.vti.springdatajpa.controller;

import com.vti.springdatajpa.dto.AccountDto;
import com.vti.springdatajpa.entity.AccountEntity;
import com.vti.springdatajpa.form.CreateAccountForm;
import com.vti.springdatajpa.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "api/v1/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    //get all
    @GetMapping
    public ResponseEntity<?> getAllAccount() {
        return new ResponseEntity<>(accountService.getAllAccount(), HttpStatus.OK);
    }

    //pagination
    @GetMapping("/page")
    public Page<AccountDto> getAccountsByPage(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "limit", defaultValue = "10") int limit) {
        return accountService.getAccountsByPage(page, limit);
    }

    //get by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getAccountById(@PathVariable(name = "id") int id) {
        return new ResponseEntity<>(accountService.getAccountByID(id), HttpStatus.OK);
    }

//    //get by name
//    @GetMapping("/name/{name}")
//    public ResponseEntity<?> getAccountByName(@PathVariable(name = "name") String name) {
//        return new ResponseEntity<>(accountService.getAccountByName(name), HttpStatus.OK);
//    }

    //create account
    @PostMapping
    public AccountDto createAccount(@RequestBody CreateAccountForm createAccountForm) {
        return accountService.createAccount(createAccountForm);
    }

    //update account
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable(name = "id") int id, @RequestBody CreateAccountForm createAccountForm) {
        accountService.updateAccount(createAccountForm, id);
        return new ResponseEntity<>("Update account success", HttpStatus.OK);
    }

    //Delete account
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable(name = "id") int id) {
        accountService.deleteAccountById(id);
        return new ResponseEntity<>("Delete account success", HttpStatus.OK);
    }
}
