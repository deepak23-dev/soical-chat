ALTER TABLE `post_table` DROP FOREIGN KEY `post_table_user_id_users_table_id_fk`;
--> statement-breakpoint
ALTER TABLE `post_table` ADD CONSTRAINT `post_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE cascade ON UPDATE no action;