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

 Date: 07/11/2025 17:25:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admins
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `institution_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`),
  KEY `institution_id` (`institution_id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institutions` (`institution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for allergies
-- ----------------------------
DROP TABLE IF EXISTS `allergies`;
CREATE TABLE `allergies` (
  `allergy_id` int NOT NULL AUTO_INCREMENT,
  `allergy_name` varchar(255) NOT NULL,
  PRIMARY KEY (`allergy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for biomarker_logs
-- ----------------------------
DROP TABLE IF EXISTS `biomarker_logs`;
CREATE TABLE `biomarker_logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `data` json DEFAULT NULL,
  `measured_at` timestamp NOT NULL,
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `biomarker_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for care_cards
-- ----------------------------
DROP TABLE IF EXISTS `care_cards`;
CREATE TABLE `care_cards` (
  `card_id` int NOT NULL AUTO_INCREMENT,
  `institution_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `period` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`card_id`),
  KEY `institution_id` (`institution_id`),
  CONSTRAINT `care_cards_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institutions` (`institution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for care_logs
-- ----------------------------
DROP TABLE IF EXISTS `care_logs`;
CREATE TABLE `care_logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `admin_id` int NOT NULL,
  `card_id` int DEFAULT NULL,
  `action_type` varchar(255) DEFAULT NULL,
  `content` text,
  `logged_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`),
  KEY `admin_id` (`admin_id`),
  KEY `card_id` (`card_id`),
  CONSTRAINT `care_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `care_logs_ibfk_2` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`),
  CONSTRAINT `care_logs_ibfk_3` FOREIGN KEY (`card_id`) REFERENCES `care_cards` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for diseases
-- ----------------------------
DROP TABLE IF EXISTS `diseases`;
CREATE TABLE `diseases` (
  `disease_id` int NOT NULL AUTO_INCREMENT,
  `disease_name` varchar(255) NOT NULL,
  PRIMARY KEY (`disease_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for food_preferences
-- ----------------------------
DROP TABLE IF EXISTS `food_preferences`;
CREATE TABLE `food_preferences` (
  `preference_id` int NOT NULL AUTO_INCREMENT,
  `preference_name` varchar(255) NOT NULL,
  PRIMARY KEY (`preference_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `group_id` int NOT NULL AUTO_INCREMENT,
  `institution_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`group_id`),
  KEY `institution_id` (`institution_id`),
  CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institutions` (`institution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for institutions
-- ----------------------------
DROP TABLE IF EXISTS `institutions`;
CREATE TABLE `institutions` (
  `institution_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `logo_image_url` varchar(255) DEFAULT NULL,
  `partnership_start_date` date DEFAULT NULL,
  `partnership_end_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`institution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for library_contents
-- ----------------------------
DROP TABLE IF EXISTS `library_contents`;
CREATE TABLE `library_contents` (
  `content_id` int NOT NULL AUTO_INCREMENT,
  `institution_id` int NOT NULL,
  `uploader_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`content_id`),
  KEY `institution_id` (`institution_id`),
  KEY `uploader_id` (`uploader_id`),
  CONSTRAINT `library_contents_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institutions` (`institution_id`),
  CONSTRAINT `library_contents_ibfk_2` FOREIGN KEY (`uploader_id`) REFERENCES `admins` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for medication_log
-- ----------------------------
DROP TABLE IF EXISTS `medication_log`;
CREATE TABLE `medication_log` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int NOT NULL,
  `user_id` int NOT NULL,
  `taken_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `plan_id` (`plan_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `medication_log_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `medication_plan` (`plan_id`),
  CONSTRAINT `medication_log_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for medication_logs
-- ----------------------------
DROP TABLE IF EXISTS `medication_logs`;
CREATE TABLE `medication_logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `medication_name` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `logged_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `medication_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for medication_plan
-- ----------------------------
DROP TABLE IF EXISTS `medication_plan`;
CREATE TABLE `medication_plan` (
  `plan_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `medication_name` varchar(255) DEFAULT NULL,
  `routine_info` text,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`plan_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `medication_plan_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for reports_monitoring
-- ----------------------------
DROP TABLE IF EXISTS `reports_monitoring`;
CREATE TABLE `reports_monitoring` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `institution_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`),
  KEY `institution_id` (`institution_id`),
  CONSTRAINT `reports_monitoring_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institutions` (`institution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for reports_user_app
-- ----------------------------
DROP TABLE IF EXISTS `reports_user_app`;
CREATE TABLE `reports_user_app` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `downloadable_until` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reports_user_app_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for risks
-- ----------------------------
DROP TABLE IF EXISTS `risks`;
CREATE TABLE `risks` (
  `risk_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `details` json DEFAULT NULL,
  `detected_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`risk_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `risks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_allergies
-- ----------------------------
DROP TABLE IF EXISTS `user_allergies`;
CREATE TABLE `user_allergies` (
  `user_id` int NOT NULL,
  `allergy_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`allergy_id`),
  KEY `allergy_id` (`allergy_id`),
  CONSTRAINT `user_allergies_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_allergies_ibfk_2` FOREIGN KEY (`allergy_id`) REFERENCES `allergies` (`allergy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_care_cards
-- ----------------------------
DROP TABLE IF EXISTS `user_care_cards`;
CREATE TABLE `user_care_cards` (
  `user_id` int NOT NULL,
  `card_id` int NOT NULL,
  `assigned_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`card_id`),
  KEY `card_id` (`card_id`),
  CONSTRAINT `user_care_cards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_care_cards_ibfk_2` FOREIGN KEY (`card_id`) REFERENCES `care_cards` (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_food_preferences
-- ----------------------------
DROP TABLE IF EXISTS `user_food_preferences`;
CREATE TABLE `user_food_preferences` (
  `user_id` int NOT NULL,
  `preference_id` int NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`preference_id`),
  KEY `preference_id` (`preference_id`),
  CONSTRAINT `user_food_preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_food_preferences_ibfk_2` FOREIGN KEY (`preference_id`) REFERENCES `food_preferences` (`preference_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_groups
-- ----------------------------
DROP TABLE IF EXISTS `user_groups`;
CREATE TABLE `user_groups` (
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `user_groups_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_groups_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_health_info
-- ----------------------------
DROP TABLE IF EXISTS `user_health_info`;
CREATE TABLE `user_health_info` (
  `user_id` int NOT NULL,
  `disease_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`disease_id`),
  KEY `disease_id` (`disease_id`),
  CONSTRAINT `user_health_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_health_info_ibfk_2` FOREIGN KEY (`disease_id`) REFERENCES `diseases` (`disease_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `institution_id` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `provider` varchar(50) DEFAULT NULL,
  `provider_user_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `institution_id` (`institution_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`institution_id`) REFERENCES `institutions` (`institution_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
