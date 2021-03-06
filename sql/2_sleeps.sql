USE tomomin_dev;
DROP TABLE IF EXISTS sleeps;
CREATE TABLE `sleeps` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` bigint(20) NOT NULL COMMENT 'ユーザーID',
  `sleeped_at` timestamp NULL COMMENT '就寝時刻',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
)