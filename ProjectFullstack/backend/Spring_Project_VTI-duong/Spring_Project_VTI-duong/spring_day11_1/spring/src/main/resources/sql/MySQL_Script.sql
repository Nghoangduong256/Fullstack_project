-- Drop the database if it already exists
DROP DATABASE IF EXISTS SpringSystem;
-- Create database
CREATE DATABASE IF NOT EXISTS SpringSystem;
USE SpringSystem;

-- Create table Department
DROP TABLE IF EXISTS 	`Department`;
CREATE TABLE IF NOT EXISTS `Department` (
	id 						INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`name` 					NVARCHAR(50) NOT NULL UNIQUE KEY,
	totalMember				INT,
    `type`					ENUM('DEV', 'TEST') 
);

-- Create table Position
DROP TABLE IF EXISTS 	`Position`;
CREATE TABLE IF NOT EXISTS `Position` (
	id 						INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`name` 					ENUM('DEV', 'TEST', 'SCRUM_MASTER', 'PM') NOT NULL
);

-- create table: Account
DROP TABLE IF EXISTS `Account`;
CREATE TABLE `Account`(
	id						INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username				VARCHAR(50) NOT NULL UNIQUE KEY,
	`password` 				VARCHAR(500) NOT NULL,
    full_name				NVARCHAR(255) NOT NULL,
    email					NVARCHAR(50) NOT NULL,
	created_date			DATETIME DEFAULT NOW(),
    department_id 			INT UNSIGNED,
    FOREIGN KEY(department_id) REFERENCES Department(id) ON DELETE SET NULL,
    position_id 			INT UNSIGNED,
    FOREIGN KEY(position_id) REFERENCES `Position`(id) ON DELETE SET NULL,
    role					ENUM('ADMIN', 'USER') 
);



-- =============================================
-- INSERT DATA 
-- =============================================
-- Add data Department
INSERT INTO Department(`name`, totalMember, `type`) VALUES
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

-- Add data Position
INSERT INTO `Position`(`name`) VALUES
('DEV'),
('TEST'),
('SCRUM_MASTER'),
('PM');

-- Add data Account
-- Password: 123456
INSERT INTO Account(username, `password`, full_name, email, department_id, position_id, role) VALUES
('dangblack',   '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nguyen Hai Dang',  'dang@gmail.com',  5, 1, 'ADMIN'),
('quanganh',    '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nguyen Quang Anh', 'anh@gmail.com',   1, 3, 'USER'),
('vanchien',    '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Tran Van Chien',   'chien@gmail.com', 1, 1, 'USER'),
('cocoduongqua','$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Bach To Trinh',    'co@gmail.com',    1, 2, 'USER'),
('doccocaubai', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Ho Viet Vuong',    'doc@gmail.com',   2, 1, 'USER'),
('khabanh',     '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Phan Kha Bang',    'kha@gmail.com',   2, 2, 'USER'),
('huanhoahong', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Tran Van Huan',    'huan@gmail.com',  2, 1, 'USER'),
('tungnui',     '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Nguyen Tung Nui',  'nui@gmail.com',   8, 3, 'USER'),
('duongghuu',   '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Phan Duong Huu',   'huu@gmail.com',   9, 1, 'USER'),
('vtiacademy',  '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'Tran Alex',        'academy@gmail.com',10,4,'ADMIN');

