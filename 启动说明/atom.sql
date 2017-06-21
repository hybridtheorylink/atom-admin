/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : atom

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-06-13 17:48:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sys_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `code` varchar(32) NOT NULL,
  `createtime` datetime DEFAULT NULL,
  `modifytime` datetime DEFAULT NULL,
  `remark` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `createtime` datetime DEFAULT NULL,
  `modifytime` datetime DEFAULT NULL,
  `remark` varchar(128) DEFAULT NULL,
  `permission` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_syslog
-- ----------------------------
DROP TABLE IF EXISTS `sys_syslog`;
CREATE TABLE `sys_syslog` (
  `id` varchar(64) NOT NULL,
  `ip` varchar(128) DEFAULT NULL,
  `starttime` datetime NOT NULL,
  `endtime` datetime NOT NULL,
  `cookie` varchar(256) DEFAULT NULL,
  `token` varchar(64) DEFAULT NULL,
  `method` varchar(16) DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  `action` varchar(64) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `useragent` varchar(64) DEFAULT NULL,
  `optid` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `content` varchar(256) DEFAULT NULL,
  `response` text,
  `trcode` varchar(64) DEFAULT NULL,
  `error_code` varchar(16) DEFAULT NULL,
  `trdate` datetime DEFAULT NULL,
  `remark` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL,
  `createtime` datetime DEFAULT NULL,
  `modifytime` datetime DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `login_name` varbinary(64) NOT NULL,
  `password` varbinary(64) NOT NULL,
  `user_name` varbinary(32) DEFAULT NULL,
  `phone` varbinary(32) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `login_ip` varchar(128) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `error_count` int(11) DEFAULT NULL,
  `is_admin` int(11) DEFAULT NULL,
  `remark` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `INDEX_USER_PHONE` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sys_userrole
-- ----------------------------
DROP TABLE IF EXISTS `sys_userrole`;
CREATE TABLE `sys_userrole` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `createtime` datetime DEFAULT NULL,
  `modifytime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
