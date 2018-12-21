/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100134
 Source Host           : localhost:3306
 Source Schema         : nodejs_handle_api

 Target Server Type    : MySQL
 Target Server Version : 100134
 File Encoding         : 65001

 Date: 22/12/2018 00:27:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `service` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `customers_list_id` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of customers
-- ----------------------------
INSERT INTO `customers` VALUES (47, 'df8akwv38m', '0352306562', 'Nguyễn Trung Hiếu', 'hieunguyen@gmail.com', 'Tắm trắng da', '{\"id\":[\"jfuo5l190\",\"6bsoi7s40\",\"wrunpuhmi\"]}', '2018-12-21 12:45:37', '2018-12-21 12:45:37');
INSERT INTO `customers` VALUES (48, '0sn6q9722i', '0352306563', 'Nguyễn Phước Lợi', 'loinguyen@gmail.com', 'Trị da mụn', '{\"id\":[\"jfuo5l190\",\"6bsoi7s40\",\"wrunpuhmi\"]}', '2018-12-21 12:45:37', '2018-12-21 12:45:37');
INSERT INTO `customers` VALUES (49, 'mow3fxaj1u', '0352306564', 'Hoàng Nghĩa', 'hoangnghia@gmail.com', 'Trị Thâm nách', '{\"id\":[\"jfuo5l190\",\"6bsoi7s40\",\"wrunpuhmi\"]}', '2018-12-21 12:45:37', '2018-12-21 12:45:37');

-- ----------------------------
-- Table structure for customers_list
-- ----------------------------
DROP TABLE IF EXISTS `customers_list`;
CREATE TABLE `customers_list`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of customers_list
-- ----------------------------
INSERT INTO `customers_list` VALUES (42, 'jfuo5l190', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 12:45:37', '2018-12-21 12:45:37');
INSERT INTO `customers_list` VALUES (43, 's6zigjr5c', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 12:58:16', '2018-12-21 12:58:16');
INSERT INTO `customers_list` VALUES (44, 'j9yx1fyrz', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 12:59:08', '2018-12-21 12:59:08');
INSERT INTO `customers_list` VALUES (45, '8layo20sq', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 12:59:25', '2018-12-21 12:59:25');
INSERT INTO `customers_list` VALUES (46, 'eldwkonpy', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 12:59:33', '2018-12-21 12:59:33');
INSERT INTO `customers_list` VALUES (47, 'b9ot2e6x0', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 13:01:37', '2018-12-21 13:01:37');
INSERT INTO `customers_list` VALUES (48, '2mmmwmglr', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 13:01:54', '2018-12-21 13:01:54');
INSERT INTO `customers_list` VALUES (49, '1c8z3p9u8', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 13:02:05', '2018-12-21 13:02:05');
INSERT INTO `customers_list` VALUES (50, 'q793h681i', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 13:02:18', '2018-12-21 13:02:18');
INSERT INTO `customers_list` VALUES (51, 't3huqxrbr', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 13:04:46', '2018-12-21 13:04:46');
INSERT INTO `customers_list` VALUES (52, 'ajzeb6i6g', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 13:06:19', '2018-12-21 13:06:19');
INSERT INTO `customers_list` VALUES (53, 'okdq190fq', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 13:14:09', '2018-12-21 13:14:09');
INSERT INTO `customers_list` VALUES (54, 'dgig0i798', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 13:15:52', '2018-12-21 13:15:52');
INSERT INTO `customers_list` VALUES (55, '6bsoi7s40', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 13:17:29', '2018-12-21 13:17:29');
INSERT INTO `customers_list` VALUES (56, 'wrunpuhmi', 'My first List', '{\"customers\":[{\"phone\":\"0352306562\",\"name\":\"Nguyễn Trung Hiếu\",\"email\":\"hieunguyen@gmail.com\",\"service\":\"Tắm trắng da\"},{\"phone\":\"0352306563\",\"name\":\"Nguyễn Phước Lợi\",\"email\":\"loinguyen@gmail.com\",\"service\":\"Trị da mụn\"},{\"phone\":\"0352306564\",\"name\":\"Hoàng Nghĩa\",\"email\":\"hoangnghia@gmail.com\",\"service\":\"Trị Thâm nách\"}]}', '2018-12-21 13:17:50', '2018-12-21 13:17:50');

-- ----------------------------
-- Table structure for tokens
-- ----------------------------
DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens`  (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `token_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `expires` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tokens
-- ----------------------------
INSERT INTO `tokens` VALUES (32, 'ccwgy5hxqboi6l69nj2d', 'qgcaqnr2i0', '2018-12-17 22:03:05');
INSERT INTO `tokens` VALUES (33, '1ld1edr5p2lwbtnpp6vc', 'qgcaqnr2i0', '2018-12-17 22:29:28');
INSERT INTO `tokens` VALUES (41, 'bu4v0aj50sh0rnonzrai', 'qgcaqnr2i0', '2018-12-18 01:58:30');
INSERT INTO `tokens` VALUES (43, '1ugmctytf00aqm3e3vv9', 'qgcaqnr2i0', '2018-12-18 20:01:38');
INSERT INTO `tokens` VALUES (45, 'omwzq0jze6rr4uqc9mm0', 'qgcaqnr2i0', '2018-12-18 23:54:52');
INSERT INTO `tokens` VALUES (47, '3xy9wh8ztpvoivam6qdh', 'qgcaqnr2i0', '2018-12-19 21:04:05');
INSERT INTO `tokens` VALUES (48, 'g6gkrmltnqqjw4fqo2l4', 'qgcaqnr2i0', '2018-12-19 23:27:04');
INSERT INTO `tokens` VALUES (50, '8ykkvvrx7b60aysu8psn', 'qgcaqnr2i0', '2018-12-21 00:26:47');
INSERT INTO `tokens` VALUES (51, 'l9me9ryyxpeq6tt37prd', 'qgcaqnr2i0', '2018-12-21 00:53:51');
INSERT INTO `tokens` VALUES (53, 'o8p0m641ouqdokoqtoor', 'qgcaqnr2i0', '2018-12-21 03:59:17');
INSERT INTO `tokens` VALUES (55, 'b7fbnq4lgl088iivxqaf', 'qgcaqnr2i0', '2018-12-21 21:14:45');
INSERT INTO `tokens` VALUES (56, 'fcisplgquj2imp06sjne', 'qgcaqnr2i0', '2018-12-22 01:23:15');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `hashed_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (37, 'qgcaqnr2i0', 'mailmail@gmail.com', 'hieusmall', '1234567890', 'e615482a8b6f7a5bc590bffa4304cb23e6b080fd80e9907b3a55dd69167cd4f9', '123qwe', NULL, '2018-12-17 14:03:05', NULL);

SET FOREIGN_KEY_CHECKS = 1;
