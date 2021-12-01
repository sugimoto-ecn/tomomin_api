USE tomomin_dev;
DROP TABLE IF EXISTS wakeups;
CREATE TABLE wakeups (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` bigint(20) NOT NULL COMMENT 'ユーザーID',
  `wakeup_at` timestamp NULL COMMENT '起床時刻',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
)