package com.vti.springdatajpa.service.ServiceImpl;

import com.vti.springdatajpa.dto.AccountDto;
import com.vti.springdatajpa.entity.AccountEntity;
import com.vti.springdatajpa.entity.DepartmentEntity;
import com.vti.springdatajpa.entity.PositionEntity;
import com.vti.springdatajpa.entity.Role;
import com.vti.springdatajpa.form.CreateAccountForm;
import com.vti.springdatajpa.repository.AccountRepository;
import com.vti.springdatajpa.repository.DepartmentRepository;
import com.vti.springdatajpa.repository.PositionRepository;
import com.vti.springdatajpa.service.AccountService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class AccountServiceImpl implements AccountService, UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    public AccountServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<AccountDto> getAllAccount() {
        List<Object[]> ls = accountRepository.findAllAccount();
        List<AccountDto> accountDtos = new ArrayList<>();
        for (Object[] objects : ls) {
            AccountDto dto = new AccountDto();
            dto.setId((Integer) objects[0]);
            dto.setUserName((String) objects[1]);
            dto.setFullName((String) objects[2]);
            dto.setDepartmentId((Integer) objects[3]);
            dto.setPositionId((Integer) objects[4]);
            dto.setEmail((String) objects[5]);
            dto.setCreateDate((Date) objects[6]);
            dto.setRole((String) objects[7]);
            accountDtos.add(dto);
        }
        return accountDtos;
    }

    @Override
    public Page<AccountDto> getAccountsByPage(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);

        Page<AccountEntity> entityPage = accountRepository.findAll(pageable);

        return entityPage.map(entity -> mapper.map(entity, AccountDto.class));
    }

    @Override
    public AccountDto getAccountByID(int id) {
        Object[] object = (Object[]) accountRepository.findByAccountId(id);
        AccountDto accountDto = new AccountDto();
        accountDto.setId((Integer) object[0]);
        accountDto.setUserName((String) object[1]);
        accountDto.setFullName((String) object[2]);
        accountDto.setDepartmentId((Integer) object[3]);
        accountDto.setPositionId((Integer) object[4]);
        accountDto.setEmail((String) object[5]);
        accountDto.setCreateDate((Date) object[6]);
        accountDto.setRole((String) object[7]);
        return accountDto;
    }

//    @Override
//    public List<AccountDto> getAccountByName(String name) {
//        List<Object[]> ls = accountRepository.findByAccountName(name);
//        List<AccountDto> accountDtoList = new ArrayList<>();
//        for (Object[] object : ls){
//            AccountDto accountDto = new AccountDto();
//            accountDto.setId((Integer) object[0]);
//            accountDto.setUserName((String) object[1]);
//            accountDto.setFullName((String) object[2]);
//            accountDto.setDepartmentId((Integer) object[3]);
//            accountDto.setPositionId((Integer) object[4]);
//            accountDto.setEmail((String) object[5]);
//            accountDto.setCreateDate((Date) object[6]);
//            accountDto.setRole((String) object[7]);
//            accountDtoList.add(accountDto);
//        }
//        return accountDtoList;
//    }

    @Override
    public AccountDto createAccount(CreateAccountForm createAccountForm) {
        Optional<DepartmentEntity> departmentEntity = departmentRepository.findById(createAccountForm.getDepartmentId());
        if (departmentEntity.isEmpty()) {
            throw new RuntimeException("DepartmentId is null");
        }

        PositionEntity positionEntity = positionRepository.findById(createAccountForm.getPositionId())
                .orElseThrow(() -> new RuntimeException("PositionId is null"));


        AccountEntity newAccountEntity = new AccountEntity();

        newAccountEntity.setUserName(createAccountForm.getUserName());
        newAccountEntity.setFullName(createAccountForm.getFullName());
        newAccountEntity.setDepartmentId(departmentEntity.get().getId());
        newAccountEntity.setPositionId(positionEntity.getId());
        newAccountEntity.setEmail(createAccountForm.getEmail());
        newAccountEntity.setPassword(createAccountForm.getPassword());
        accountRepository.save(newAccountEntity);

        AccountDto accountDto = mapper.map(newAccountEntity, AccountDto.class);
        return accountDto;
    }

    @Override
    public void updateAccount(CreateAccountForm createAccountForm, int id) {
        // Validate
        AccountEntity account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        //Thiết lập những trường cần update
        if (createAccountForm.getEmail() != null && !createAccountForm.getEmail().isEmpty()) {
            account.setEmail(createAccountForm.getEmail());
        }

        if (createAccountForm.getUserName() != null && !createAccountForm.getUserName().isEmpty()) {
            account.setUserName(createAccountForm.getUserName());
        }

        if (createAccountForm.getFullName() != null && !createAccountForm.getFullName().isEmpty()) {
            account.setFullName(createAccountForm.getFullName());
        }

        if (createAccountForm.getPassword() != null && !createAccountForm.getFullName().isEmpty()) {
            account.setPassword(createAccountForm.getPassword());
        }

        if (!(createAccountForm.getDepartmentId() == 0)) {
            DepartmentEntity departmentEntity = departmentRepository.findById(createAccountForm.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            account.setDepartmentId(createAccountForm.getDepartmentId());
        }

        if (!(createAccountForm.getPositionId() == 0)) {
            PositionEntity positionEntity = positionRepository.findById(createAccountForm.getPositionId())
                    .orElseThrow(() -> new RuntimeException("Position not found"));
            account.setPositionId(createAccountForm.getPositionId());
        }

        accountRepository.save(account);
    }

    @Override
    public void deleteAccountById(int id) {
        if (!accountRepository.existsById(id)) {
            throw new RuntimeException("Account not found");
        }

        accountRepository.deleteById(id);
    }

    @Override
    public AccountEntity register(String username, String rawPassword, String email, String fullName, int departmentId, int positionId) {
        AccountEntity account = new AccountEntity();
        account.setUserName(username);
        account.setPassword(passwordEncoder.encode(rawPassword));
        account.setEmail(email);
        account.setFullName(fullName);
        account.setDepartmentId(departmentId);
        account.setPositionId(positionId);
        return accountRepository.save(account);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        // load user
//        AccountEntity account = accountRepository.findByUserName(username);
//        if (username == null) {
//            throw new UsernameNotFoundException(username);
//        }
//        return new User(account.getUserName(), account.getPassword(),
//                Collections.emptyList()); // sử dụng role thì set value của authorities:USER, ADMIN
//    }
}
