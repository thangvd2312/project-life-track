/*
 Navicat Premium Dump SQL

 Source Server         : db-life-track
 Source Server Type    : MySQL
 Source Server Version : 80044 (8.0.44)
 Source Host           : localhost:3306
 Source Schema         : app_db

 Target Server Type    : MySQL
 Target Server Version : 80044 (8.0.44)
 File Encoding         : 65001

 Date: 06/11/2025 14:31:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Admins
-- ----------------------------
DROP TABLE IF EXISTS `Admins`;
CREATE TABLE `Admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `institution_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `role` enum('admin','superadmin') DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`),
  KEY `institution_id` (`institution_id`),
  CONSTRAINT `Admins_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `Institutions` (`institution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for Allergies
-- ----------------------------
DROP TABLE IF EXISTS `Allergies`;
CREATE TABLE `Allergies` (
  `allergy_id` int NOT NULL AUTO_INCREMENT,
  `allergy_name` varchar(255) NOT NULL,
  PRIMARY KEY (`allergy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for BiomarkerLogs
-- ----------------------------
DROP TABLE IF EXISTS `BiomarkerLogs`;
CREATE TABLE `BiomarkerLogs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `biomarker_type` enum('blood_pressure','blood_sugar','weight','ecg','sleep','meal') NOT NULL,
  `data` json DEFAULT NULL,
  `measured_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `BiomarkerLogs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for Diseases
-- ----------------------------
DROP TABLE IF EXISTS `Diseases`;
CREATE TABLE `Diseases` (
  `disease_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`disease_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for FoodPreferences
-- ----------------------------
DROP TABLE IF EXISTS `FoodPreferences`;
CREATE TABLE `FoodPreferences` (
  `preference_id` int NOT NULL AUTO_INCREMENT,
  `preference_name` varchar(255) NOT NULL,
  PRIMARY KEY (`preference_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for Groups
-- ----------------------------
DROP TABLE IF EXISTS `Groups`;
CREATE TABLE `Groups` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `institution_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`group_id`),
  KEY `institution_id` (`institution_id`),
  CONSTRAINT `Groups_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `Institutions` (`institution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for Institutions
-- ----------------------------
DROP TABLE IF EXISTS `Institutions`;
CREATE TABLE `Institutions` (
  `institution_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `partnership_start_date` date DEFAULT NULL,
  `partnership_end_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`institution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for LibraryContents
-- ----------------------------
DROP TABLE IF EXISTS `LibraryContents`;
CREATE TABLE `LibraryContents` (
  `content_id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `institution_id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `file_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`content_id`),
  KEY `admin_id` (`admin_id`),
  KEY `institution_id` (`institution_id`),
  CONSTRAINT `LibraryContents_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `Admins` (`admin_id`),
  CONSTRAINT `LibraryContents_ibfk_2` FOREIGN KEY (`institution_id`) REFERENCES `Institutions` (`institution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for MedicationLogs
-- ----------------------------
DROP TABLE IF EXISTS `MedicationLogs`;
CREATE TABLE `MedicationLogs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int NOT NULL,
  `user_id` int NOT NULL,
  `taken_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `plan_id` (`plan_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `MedicationLogs_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `MedicationPlan` (`plan_id`),
  CONSTRAINT `MedicationLogs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for MedicationPlan
-- ----------------------------
DROP TABLE IF EXISTS `MedicationPlan`;
CREATE TABLE `MedicationPlan` (
  `plan_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `medication_name` varchar(255) DEFAULT NULL,
  `routine_info` text,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`plan_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `MedicationPlan_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for Reports
-- ----------------------------
DROP TABLE IF EXISTS `Reports`;
CREATE TABLE `Reports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `scope` enum('user','group','institution') NOT NULL,
  `target_id` int NOT NULL,
  `institution_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`),
  KEY `institution_id` (`institution_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `Reports_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `Institutions` (`institution_id`),
  CONSTRAINT `Reports_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `Admins` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for UserAllergies
-- ----------------------------
DROP TABLE IF EXISTS `UserAllergies`;
CREATE TABLE `UserAllergies` (
  `user_id` int NOT NULL,
  `allergy_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`allergy_id`),
  KEY `allergy_id` (`allergy_id`),
  CONSTRAINT `UserAllergies_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `UserAllergies_ibfk_2` FOREIGN KEY (`allergy_id`) REFERENCES `Allergies` (`allergy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for UserCareManagers
-- ----------------------------
DROP TABLE IF EXISTS `UserCareManagers`;
CREATE TABLE `UserCareManagers` (
  `user_id` int NOT NULL,
  `admin_id` int NOT NULL,
  `role` enum('doctor','nurse','nutritionist','coach') NOT NULL DEFAULT 'doctor',
  `assigned_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`admin_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `UserCareManagers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `UserCareManagers_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `Admins` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for UserDiseases
-- ----------------------------
DROP TABLE IF EXISTS `UserDiseases`;
CREATE TABLE `UserDiseases` (
  `user_id` int NOT NULL,
  `disease_id` int NOT NULL,
  `diagnosed_at` date DEFAULT NULL,
  `status` enum('active','recovered') DEFAULT 'active',
  PRIMARY KEY (`user_id`,`disease_id`),
  KEY `disease_id` (`disease_id`),
  CONSTRAINT `UserDiseases_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `UserDiseases_ibfk_2` FOREIGN KEY (`disease_id`) REFERENCES `Diseases` (`disease_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for UserFoodPreferences
-- ----------------------------
DROP TABLE IF EXISTS `UserFoodPreferences`;
CREATE TABLE `UserFoodPreferences` (
  `user_id` int NOT NULL,
  `preference_id` int NOT NULL,
  `type` enum('like','dislike') DEFAULT NULL,
  PRIMARY KEY (`user_id`,`preference_id`),
  KEY `preference_id` (`preference_id`),
  CONSTRAINT `UserFoodPreferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `UserFoodPreferences_ibfk_2` FOREIGN KEY (`preference_id`) REFERENCES `FoodPreferences` (`preference_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for UserGroups
-- ----------------------------
DROP TABLE IF EXISTS `UserGroups`;
CREATE TABLE `UserGroups` (
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  `joined_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `UserGroups_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `UserGroups_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `institution_id` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `provider` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `institution_id` (`institution_id`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `Institutions` (`institution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
