---------------------------------------------------------
-- DROP + CREATE DATABASE
---------------------------------------------------------
/*
IF DB_ID('NewwaveSystem') IS NOT NULL
    DROP DATABASE NewwaveSystem;

CREATE DATABASE NewwaveSystem;
USE NewwaveSystem;
*/

---------------------------------------------------------
-- DROP TABLES (SQL Server syntax)
---------------------------------------------------------
IF OBJECT_ID('dbo.Account', 'U') IS NOT NULL DROP TABLE dbo.Account;
IF OBJECT_ID('dbo.Position', 'U') IS NOT NULL DROP TABLE dbo.Position;
IF OBJECT_ID('dbo.Department', 'U') IS NOT NULL DROP TABLE dbo.Department;

---------------------------------------------------------
-- CREATE TABLE Department
---------------------------------------------------------
CREATE TABLE Department (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    name            NVARCHAR(50) NOT NULL UNIQUE,
    totalMember     INT,
    type            NVARCHAR(10) NOT NULL CHECK (type IN ('DEV', 'TEST')),
    created_date    DATETIME DEFAULT GETDATE()
);


---------------------------------------------------------
-- CREATE TABLE Position
---------------------------------------------------------
CREATE TABLE Position (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    name            NVARCHAR(20) NOT NULL
        CHECK (name IN ('DEV','TEST','SCRUM_MASTER','PM'))
);


---------------------------------------------------------
-- CREATE TABLE Account
---------------------------------------------------------
CREATE TABLE Account (
    id              INT IDENTITY(1,1) PRIMARY KEY,
    username        VARCHAR(50) NOT NULL UNIQUE,
    password        VARCHAR(500),
    full_name       NVARCHAR(255) NOT NULL,
    email           NVARCHAR(50) NOT NULL,
    created_date    DATETIME DEFAULT GETDATE(),
    department_id   INT NULL,
    position_id     INT NULL,
    role            NVARCHAR(20) CHECK (role IN ('ROLE_ADMIN','ROLE_USER')),

    CONSTRAINT FK_Account_Department FOREIGN KEY (department_id)
        REFERENCES Department(id) ON DELETE SET NULL,

    CONSTRAINT FK_Account_Position FOREIGN KEY (position_id)
        REFERENCES Position(id) ON DELETE SET NULL
);


---------------------------------------------------------
-- INSERT DATA: Department
---------------------------------------------------------
INSERT INTO Department(name, totalMember, type) VALUES
(N'Marketing',    10, 'DEV'),
(N'Sale',         8,  'TEST'),
(N'Bảo vệ',       4,  'DEV'),
(N'Nhân sự',      6,  'DEV'),
(N'Kỹ thuật',     15, 'DEV'),
(N'Tài chính',    5,  'TEST'),
(N'Phó giám đốc', 3,  'DEV'),
(N'Giám đốc',     2,  'DEV'),
(N'Thư kí',       2,  'TEST'),
(N'Bán hàng',     12, 'DEV');


---------------------------------------------------------
-- INSERT DATA: Position
---------------------------------------------------------
INSERT INTO Position(name) VALUES
('DEV'),
('TEST'),
('SCRUM_MASTER'),
('PM');


---------------------------------------------------------
-- INSERT DATA: Account (with bcrypt password)
-- Password: 123456
---------------------------------------------------------
INSERT INTO Account(username, password, full_name, email, department_id, position_id, role)
VALUES
('dangblack',    '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',
 N'Nguyen Hai Dang',  'dang@gmail.com',  5, 1, 'ROLE_ADMIN'),

('quanganh',     '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',
 N'Nguyen Quang Anh', 'anh@gmail.com',   1, 3, 'ROLE_USER'),

('vanchien',     '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',
 N'Tran Van Chien',   'chien@gmail.com', 1, 1, 'ROLE_USER'),

('cocoduongqua', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',
 N'Bach To Trinh',    'co@gmail.com',    1, 2, 'ROLE_USER'),

('doccocaubai',  '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',
 N'Ho Viet Vuong',    'doc@gmail.com',   2, 1, 'ROLE_USER'),

('khabanh',      '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',
 N'Phan Kha Bang',    'kha@gmail.com',   2, 2, 'ROLE_USER'),

('huanhoahong',  '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',
 N'Tran Van Huan',    'huan@gmail.com',  2, 1, 'ROLE_USER'),

('tungnui',      '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',
 N'Nguyen Tung Nui',  'nui@gmail.com',   8, 3, 'ROLE_USER'),

('duongghuu',    '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',
 N'Phan Duong Huu',   'huu@gmail.com',   9, 1, 'ROLE_USER'),

('vtiacademy',   '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi',
 N'Tran Alex',        'academy@gmail.com',10,4,'ROLE_ADMIN');

