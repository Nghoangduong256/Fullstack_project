package com.vti.springdatajpa.service;

import com.vti.springdatajpa.dto.AccountDto;
import com.vti.springdatajpa.entity.AccountEntity;
import com.vti.springdatajpa.form.CreateAccountForm;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AccountService {
    public List<AccountDto> getAllAccount();

    public Page<AccountDto> getAccountsByPage(int page, int limit);

    public AccountDto getAccountByID(int id);

//    public List<AccountDto> getAccountByName(String name);

    public AccountDto createAccount(CreateAccountForm createAccountForm);

    public void updateAccount(CreateAccountForm createAccountForm, int id);

    public void deleteAccountById(int id);

    public AccountEntity register( String username, String rawPassword, String email, String fullName, int departmentID, int positionId);
}
