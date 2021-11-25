USE tomomin_dev;
DROP TABLE IF EXISTS `schedules`;
CREATE TABLE `schedules` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` bigint(20) NOT NULL COMMENT 'ユーザーID',
  `wakeup` varchar(15) NOT NULL COMMENT '就寝時刻',
  `sleep` varchar(15) NOT NULL COMMENT '起床時刻',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
)