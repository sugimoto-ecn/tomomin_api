USE tomomin_dev;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) DEFAULT NULL COMMENT 'ユーザー名',
  `email` varchar(255) UNIQUE NOT NULL COMMENT 'メールアドレス',
  `password` varchar(255) NOT NULL COMMENT 'パスワード',
  `product_verified` tinyint(1) DEFAULT 0,
  `product` varchar(8) DEFAULT NULL COMMENT 'パスワード',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '作成日時',
  `message` varchar(255) DEFAULT NULL COMMENT 'メッセージ文',
  
  PRIMARY KEY (`id`)
) 