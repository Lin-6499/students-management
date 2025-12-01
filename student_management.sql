/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3306
 Source Schema         : student_management

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 26/11/2025 12:50:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for classes
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes`  (
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `counselor_id` int(11) NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  INDEX `fk_classes_counselor`(`counselor_id`) USING BTREE,
  CONSTRAINT `fk_classes_counselor` FOREIGN KEY (`counselor_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classes
-- ----------------------------
INSERT INTO `classes` VALUES ('软件2301', 2001);
INSERT INTO `classes` VALUES ('软件2302', 2002);
INSERT INTO `classes` VALUES ('计升本2403', 2003);

-- ----------------------------
-- Table structure for courses
-- ----------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `credits` decimal(3, 1) NOT NULL DEFAULT 0.0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_courses_code`(`code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3008 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of courses
-- ----------------------------
INSERT INTO `courses` VALUES (3001, '程序设计基础', 'CS101', 3.0);
INSERT INTO `courses` VALUES (3002, '数据结构', 'CS102', 3.0);
INSERT INTO `courses` VALUES (3003, '高等数学', 'MATH201', 4.0);
INSERT INTO `courses` VALUES (3004, 'JAVA程序设计', 'CS103', 3.0);
INSERT INTO `courses` VALUES (3005, '计算机网络', 'CS105', 3.0);
INSERT INTO `courses` VALUES (3006, '大学英语', 'EN205', 4.0);

-- ----------------------------
-- Table structure for difficulty_apps
-- ----------------------------
DROP TABLE IF EXISTS `difficulty_apps`;
CREATE TABLE `difficulty_apps`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `family_income` decimal(10, 2) NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `status` enum('pending','approved','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'pending',
  `reviewer_id` int(11) NULL DEFAULT NULL,
  `reviewed_at` datetime(0) NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_difficulty_reviewer`(`reviewer_id`) USING BTREE,
  INDEX `idx_difficulty_student_status`(`student_id`, `status`) USING BTREE,
  CONSTRAINT `fk_difficulty_reviewer` FOREIGN KEY (`reviewer_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_difficulty_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for grades
-- ----------------------------
DROP TABLE IF EXISTS `grades`;
CREATE TABLE `grades`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `course_id` int(11) NOT NULL,
  `score` decimal(5, 2) NULL DEFAULT NULL,
  `semester` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_grades_unique`(`student_id`, `course_id`, `semester`) USING BTREE,
  INDEX `fk_grades_course`(`course_id`) USING BTREE,
  INDEX `idx_grades_student_semester`(`student_id`, `semester`) USING BTREE,
  INDEX `idx_grades_student_course`(`student_id`, `course_id`) USING BTREE,
  CONSTRAINT `fk_grades_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_grades_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of grades
-- ----------------------------
INSERT INTO `grades` VALUES (1, 'S202401004', 3002, 73.50, '2024-Fall');
INSERT INTO `grades` VALUES (2, 'S202401004', 3001, 62.00, '2024-Fall');
INSERT INTO `grades` VALUES (3, '120244303051', 3001, 60.00, '2024-Fall');

-- ----------------------------
-- Table structure for records
-- ----------------------------
DROP TABLE IF EXISTS `records`;
CREATE TABLE `records`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` enum('attendance','reward','penalty','comprehensive','employment') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `date` date NOT NULL,
  `operator_id` int(11) NOT NULL,
  `company` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `salary` decimal(10, 2) NULL DEFAULT NULL,
  `moral_score` decimal(4, 1) NULL DEFAULT 0.0,
  `intellectual_score` decimal(4, 1) NULL DEFAULT 0.0,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_records_operator`(`operator_id`) USING BTREE,
  INDEX `idx_records_student_type`(`student_id`, `type`) USING BTREE,
  CONSTRAINT `fk_records_operator` FOREIGN KEY (`operator_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_records_student_id` FOREIGN KEY (`student_id`) REFERENCES `students` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of records
-- ----------------------------
INSERT INTO `records` VALUES (4, 'S202401005', 'employment', '已签约', '与字节跳动签约，研发工程师', '2025-03-20', 2002, '字节跳动', 18000.00, 0.0, 0.0, '2025-11-16 14:50:50', '2025-11-24 19:12:20');
INSERT INTO `records` VALUES (5, 'S202401004', 'penalty', '违纪', '晚归未请假', '2024-10-21', 2002, NULL, NULL, 0.0, 0.0, '2025-11-16 14:50:50', '2025-11-24 19:12:20');

-- ----------------------------
-- Table structure for schedule
-- ----------------------------
DROP TABLE IF EXISTS `schedule`;
CREATE TABLE `schedule`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `class_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `day_of_week` tinyint(4) NOT NULL,
  `period_start` tinyint(4) NOT NULL,
  `period_end` tinyint(4) NOT NULL,
  `week_start` tinyint(4) NOT NULL,
  `week_end` tinyint(4) NOT NULL,
  `location` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `semester` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_schedule_course`(`course_id`) USING BTREE,
  INDEX `idx_schedule_class_week`(`class_name`, `week_start`, `week_end`, `day_of_week`) USING BTREE,
  INDEX `idx_schedule_class_semester`(`class_name`, `semester`, `day_of_week`) USING BTREE,
  INDEX `fk_schedule_teacher`(`teacher_id`) USING BTREE,
  CONSTRAINT `fk_schedule_class` FOREIGN KEY (`class_name`) REFERENCES `classes` (`name`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_schedule_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_schedule_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of schedule
-- ----------------------------
INSERT INTO `schedule` VALUES (1, 3001, 2001, '计升本2403', 1, 1, 2, 1, 16, 'B315', '2024-2025-1');
INSERT INTO `schedule` VALUES (2, 3002, 2002, '计升本2403', 1, 3, 4, 1, 16, 'B315', '2024-2025-1');
INSERT INTO `schedule` VALUES (3, 3003, 2003, '计升本2403', 1, 5, 6, 2, 16, 'C101', '2024-2025-1');
INSERT INTO `schedule` VALUES (4, 3004, 2004, '计升本2403', 2, 3, 4, 1, 16, 'B214', '2024-2025-1');
INSERT INTO `schedule` VALUES (5, 3005, 2005, '计升本2403', 2, 3, 4, 1, 16, 'B314', '2024-2025-1');
INSERT INTO `schedule` VALUES (6, 3006, 2006, '计升本2403', 3, 1, 2, 1, 16, 'A101', '2024-2025-1');

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students`  (
  `user_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `class_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `department` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `professional` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `enrollment_year` year NOT NULL,
  `earned_credits` decimal(4, 1) NULL DEFAULT 0.0,
  `is_difficult` tinyint(1) NULL DEFAULT 0,
  `is_top_up` tinyint(1) NULL DEFAULT 0,
  `schooling_length` tinyint(3) UNSIGNED NULL DEFAULT NULL COMMENT '学制(年)',
  `training_level` enum('专科','本科','硕士研究生','博士研究生','专升本') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '培养层次',
  `academic_status` enum('在籍','休学','退学','毕业') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '在籍' COMMENT '学籍状态',
  `current_status` enum('在读','实习','就业','升学') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '在读' COMMENT '当前状态',
  `is_at_school` tinyint(1) NULL DEFAULT 1 COMMENT '是否在校 (1:是, 0:否)',
  `registration_status` enum('已报到','未报到','保留入学资格') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '已报到' COMMENT '报道状态',
  PRIMARY KEY (`user_id`) USING BTREE,
  INDEX `idx_students_class`(`class_name`) USING BTREE,
  CONSTRAINT `fk_students_class` FOREIGN KEY (`class_name`) REFERENCES `classes` (`name`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_students_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES ('120244303051', '计升本2403', '应用技术', '计算机科学与技术', 2024, 3.0, 0, 1, 2, '专升本', '在籍', '在读', 1, '已报到');
INSERT INTO `students` VALUES ('S202401004', '软件2302', '软件工程', '软件工程', 2023, 6.0, 0, 0, NULL, NULL, '在籍', '在读', 1, '已报到');
INSERT INTO `students` VALUES ('S202401005', '软件2302', '软件工程', '软件工程', 2023, 0.0, 0, 0, NULL, NULL, '在籍', '在读', 1, '已报到');

-- ----------------------------
-- Table structure for teachers
-- ----------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers`  (
  `user_id` int(11) NOT NULL,
  `department` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '所属院系',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '职称 (例如: 教授, 副教授, 讲师)',
  PRIMARY KEY (`user_id`) USING BTREE,
  CONSTRAINT `fk_teachers_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teachers
-- ----------------------------
INSERT INTO `teachers` VALUES (2001, '应用技术学院', '讲师');
INSERT INTO `teachers` VALUES (2002, '应用技术学院', '讲师');
INSERT INTO `teachers` VALUES (2003, '应用技术学院', '讲师');
INSERT INTO `teachers` VALUES (2004, '应用技术学院', '讲师');
INSERT INTO `teachers` VALUES (2005, '应用技术学院', '讲师');
INSERT INTO `teachers` VALUES (2006, '应用技术学院', '讲师');
INSERT INTO `teachers` VALUES (2007, '应用技术学院', '讲师');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `real_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `role_type` enum('student','counselor','staff','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gender` enum('男','女','未知') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '未知',
  `age` tinyint(3) UNSIGNED NULL DEFAULT NULL,
  `id_card_type` enum('居民身份证','香港特别行政区护照','澳门特别行政区护照','台湾大陆来往通行证') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `id_card_no` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `political_status` enum('中共党员','共青团员','群众','民进党','国民党') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `birth_date` date NULL DEFAULT NULL,
  `nation` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_id`(`user_id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4002 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1001, '120244303051', 'zhaoyu', '$2b$12$lL8jiWmnpIKsB9db5PIsluy2lKPhLrBi3a63zTp1hnIuh80ObALDG', '赵煜', '15141312101', '/avatar/zhaoyu.png', 'student', '男', 23, '台湾大陆来往通行证', '21132233', '国民党', '2025-11-21', '大和民族', '间谍');
INSERT INTO `user` VALUES (1004, 'S202401004', 'stu_zhaoliu', '$2a$10$abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef', '赵六', '13800000004', NULL, 'student', '未知', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (1005, 'S202401005', 'stu_tianqi', '$2a$10$abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef', '田七', '13800000005', NULL, 'student', '未知', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (2001, 'C2023001', 'csl_chen', '$2a$10$abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef', '陈老师', '13900000001', NULL, 'counselor', '未知', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (2002, 'C2023002', 'csl_liu', '$2a$10$abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef', '刘老师', '13900000002', NULL, 'counselor', '未知', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (2003, 'C2023003', 'csl_he', '$2b$12$uYYKq96ttrPSs4nFnuhF3uGmtT/KKQWmdiXFlHCDHjzNvN0FwlVey\r\n', '何老师', '15645868545', NULL, 'counselor', '未知', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (2004, 'C2023004', 'csl_lin', '$12$lL8jiWmnpIKsB9db5PIsluy2lKPhLrBi3a63zTp1hnIuh80ObALDG', '林老师', '12358585296', NULL, 'counselor', '未知', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (2005, 'C2023005', 'csl_wang', '$12$lL8jiWmnpIKsB9db5PIsluy2lKPhLrBi3a63zTp1hnIuh80ObALDG', '王老师', '13567456858', NULL, 'counselor', '未知', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (2006, 'C2023006', 'csl_li', '$10$abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef', '李轶然', '16285456985', NULL, 'counselor', '未知', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (2007, 'C2023007', 'csl_zhang', '$10$abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef', '张德辛', '14478958585', NULL, 'counselor', '未知', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (4001, 'ADM001', 'admin_sun', '$2a$10$abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef', '孙管理员', '13600000001', NULL, 'admin', '未知', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
